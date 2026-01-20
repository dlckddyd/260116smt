import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import crypto from 'crypto';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const distPath = path.join(__dirname, 'dist');
app.use(express.json());

// ----------------------------------------------------------------------
// 1. 네이버 검색광고 API (정확한 월간 조회수)
// ----------------------------------------------------------------------
const AD_CUSTOMER_ID = "4242810";
const AD_ACCESS_LICENSE = "0100000000ef2a06633505a32a514eb5f877611ae3de9aa6466541db60a96fcbf1f10f0dea";
const AD_SECRET_KEY = "AQAAAADvKgZjNQWjKlFOtfh3YRrjzeibNDztRquJCFhpADm79A==";

// ----------------------------------------------------------------------
// 2. 네이버 오픈 API (블로그 검색 + 데이터랩)
// ----------------------------------------------------------------------
const OPEN_CLIENT_ID = "vQAN_RNU8A7kvy4N_aZI";
const OPEN_CLIENT_SECRET = "0efwCNoAP7";

app.get('/healthz', (req, res) => res.status(200).send('OK'));

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// 통합 API 핸들러
app.get('/api/naver-keywords', async (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ error: '키워드가 필요합니다.' });
  }

  const cleanKeyword = keyword.trim().replace(/\s+/g, '');

  // 1순위: 검색광고 API 시도
  try {
    console.log(`[Attempt 1] Ad API for: ${cleanKeyword}`);
    const adData = await fetchFromAdApi(cleanKeyword);
    return res.json({ ...adData, _source: 'ad_api' });
  } catch (adError) {
    console.warn(`[Fail 1] Ad API failed. Reason: ${adError.message}. Switching to Open API.`);
    
    // 2순위: 오픈 API (블로그 + 데이터랩) 시도
    try {
        console.log(`[Attempt 2] Open API (Blog + DataLab)...`);
        
        // 두 API를 병렬로 호출하여 속도 개선
        const [blogData, dataLabData] = await Promise.all([
            fetchFromBlogApi(cleanKeyword),
            fetchFromDataLabApi(cleanKeyword)
        ]);

        // 데이터 병합 및 가공
        const combinedData = processOpenApiData(cleanKeyword, blogData, dataLabData);
        return res.json({ ...combinedData, _source: 'open_api' });

    } catch (openError) {
        console.error(`[Fail 2] Open API failed:`, openError);
        return res.status(500).json({ 
            error: '네이버 API 호출에 실패했습니다.',
            details: '검색광고 API와 오픈 API 모두 응답하지 않습니다. 잠시 후 다시 시도해주세요.'
        });
    }
  }
});

// Helper: 검색광고 API (서명 생성 및 호출)
async function fetchFromAdApi(keyword) {
    const timestamp = Date.now().toString();
    const method = "GET";
    const uri = "/keywordstool";
    const message = `${timestamp}.${method}.${uri}`;
    const signature = crypto.createHmac('sha256', AD_SECRET_KEY).update(message).digest('base64');

    const response = await axios.get(`https://api.naver.com${uri}`, {
        params: {
            hintKeywords: keyword,
            showDetail: 1
        },
        headers: {
            'X-Timestamp': timestamp,
            'X-API-KEY': AD_ACCESS_LICENSE,
            'X-Customer': AD_CUSTOMER_ID,
            'X-Signature': signature
        }
    });

    return response.data;
}

// Helper: 블로그 검색 API (문서량 조회)
async function fetchFromBlogApi(keyword) {
    // sim(정확도순)으로 1개만 가져와서 total 값을 확인
    const response = await axios.get('https://openapi.naver.com/v1/search/blog.json', {
        params: {
            query: keyword,
            display: 1,
            start: 1,
            sort: 'sim'
        },
        headers: {
            'X-Naver-Client-Id': OPEN_CLIENT_ID,
            'X-Naver-Client-Secret': OPEN_CLIENT_SECRET
        }
    });
    return response.data; // { total: number, ... }
}

// Helper: 데이터랩 API (검색어 트렌드 조회)
async function fetchFromDataLabApi(keyword) {
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const formatDate = (date) => date.toISOString().split('T')[0];

    const response = await axios.post('https://openapi.naver.com/v1/datalab/search', {
        startDate: formatDate(oneYearAgo),
        endDate: formatDate(today),
        timeUnit: 'month',
        keywordGroups: [
            {
                groupName: keyword,
                keywords: [keyword]
            }
        ]
    }, {
        headers: {
            'X-Naver-Client-Id': OPEN_CLIENT_ID,
            'X-Naver-Client-Secret': OPEN_CLIENT_SECRET,
            'Content-Type': 'application/json'
        }
    });
    
    return response.data; // { results: [ { data: [ { period, ratio }, ... ] } ] }
}

// Helper: 오픈 API 데이터 가공 (Fallback용)
function processOpenApiData(keyword, blogData, dataLabData) {
    const totalBlogDocs = blogData.total || 0;
    
    // 데이터랩 트렌드 데이터 추출 (비율 데이터 0~100)
    const trendList = dataLabData.results?.[0]?.data || [];
    
    // 검색량 추정 (블로그 발행량 기반 휴리스틱, 실제 검색량이 아님을 UI에 표시해야 함)
    // 보통 인기 키워드는 블로그 발행량의 3~10배 정도의 검색량이 발생함. 보수적으로 3배 적용.
    // 하지만 검색량이 아예 없는 경우도 있으므로 trendList가 비어있으면 0으로 처리.
    const hasTrend = trendList.length > 0;
    const estimatedTotalVol = hasTrend ? Math.floor(totalBlogDocs * 2.5) : 0;
    const pcRatio = 0.3; // 일반적인 평균 PC 검색 비율

    // 관련 키워드 생성 (접미사 조합 - 오픈 API는 연관키워드를 안 주므로)
    const suffix = [" 맛집", " 추천", " 후기", " 가격", " 정보"];
    const relKeywords = suffix.map(s => ({
        relKeyword: keyword + s,
        monthlyPcQc: Math.floor(estimatedTotalVol * 0.2 * pcRatio),
        monthlyMobileQc: Math.floor(estimatedTotalVol * 0.2 * (1 - pcRatio)),
        compIdx: "분석필요"
    }));

    // 메인 키워드 데이터 구조 맞추기 (Ad API 형식과 호환되게)
    return {
        keywordList: [
            {
                relKeyword: keyword,
                monthlyPcQc: Math.floor(estimatedTotalVol * pcRatio),
                monthlyMobileQc: Math.floor(estimatedTotalVol * (1 - pcRatio)),
                monthlyAvePcClkCnt: 0,
                monthlyAveMobileClkCnt: 0,
                compIdx: totalBlogDocs > 50000 ? "높음" : totalBlogDocs > 10000 ? "중간" : "낮음"
            },
            ...relKeywords
        ],
        // 추가 메타데이터 (프론트엔드에서 활용)
        meta: {
            blogTotal: totalBlogDocs,
            trendData: trendList // [{ period: '2023-01-01', ratio: 10.5 }, ...]
        }
    };
}

app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send('Server Error: index.html not found.');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});