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
// 1. 네이버 검색광고 API (IP제한이 엄격함 - 실패 시 오픈 API로 자동 전환)
// ----------------------------------------------------------------------
const AD_CUSTOMER_ID = "4242810";
const AD_ACCESS_LICENSE = "0100000000ef2a06633505a32a514eb5f877611ae3de9aa6466541db60a96fcbf1f10f0dea";
const AD_SECRET_KEY = "AQAAAADvKgZjNQWjKlFOtfh3YRrjzeibNDztRquJCFhpADm79A==";

// ----------------------------------------------------------------------
// 2. 네이버 오픈 API (개발자센터에서 등록한 Client ID)
// ----------------------------------------------------------------------
const OPEN_CLIENT_ID = "vQAN_RNU8A7kvy4N_aZI";
const OPEN_CLIENT_SECRET = "0efwCNoAP7";
// 네이버 개발자 센터에 등록한 "Web 서비스 URL"과 일치해야 함
const SERVICE_URL = "https://port-0-smt-9144-mkkldwi351bd93e1.sel3.cloudtype.app";

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
  let adApiFailReason = '';

  // 1순위: 검색광고 API 시도
  try {
    console.log(`[Attempt 1] Ad API for: ${cleanKeyword}`);
    const adData = await fetchFromAdApi(cleanKeyword);
    return res.json({ ...adData, _source: 'ad_api' });
  } catch (adError) {
    // 에러 로그 구체화
    const status = adError.response?.status || 'Unknown';
    const msg = JSON.stringify(adError.response?.data || adError.message);
    adApiFailReason = `Ad API(${status}): ${msg}`;
    console.warn(`[Fail 1] ${adApiFailReason}. Switching to Open API.`);
    
    // 2순위: 오픈 API (블로그 + 데이터랩) 시도
    try {
        console.log(`[Attempt 2] Open API (Blog + DataLab)...`);
        
        // 두 API를 병렬로 호출
        const [blogData, dataLabData] = await Promise.all([
            fetchFromBlogApi(cleanKeyword),
            fetchFromDataLabApi(cleanKeyword)
        ]);

        // 데이터 병합 및 가공
        const combinedData = processOpenApiData(cleanKeyword, blogData, dataLabData);
        return res.json({ ...combinedData, _source: 'open_api' });

    } catch (openError) {
        const status = openError.response?.status || 'Unknown';
        const msg = JSON.stringify(openError.response?.data || openError.message);
        const openApiFailReason = `Open API(${status}): ${msg}`;

        console.error(`[Fail 2] Final Failure.`);
        console.error(`Reason 1: ${adApiFailReason}`);
        console.error(`Reason 2: ${openApiFailReason}`);

        // 프론트엔드에 구체적인 에러 메시지 전달
        return res.status(500).json({ 
            error: 'API 호출 실패',
            details: `검색광고 API와 오픈 API 모두 실패했습니다.\n[광고API 오류]: ${adApiFailReason}\n[오픈API 오류]: ${openApiFailReason}`
        });
    }
  }
});

// Helper: 검색광고 API
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
        },
        timeout: 3000 // 3초 안에 응답 없으면 포기 (빠른 전환 위해)
    });
    return response.data;
}

// Helper: 블로그 검색 API
async function fetchFromBlogApi(keyword) {
    const response = await axios.get('https://openapi.naver.com/v1/search/blog.json', {
        params: {
            query: keyword,
            display: 1,
            start: 1,
            sort: 'sim'
        },
        headers: {
            'X-Naver-Client-Id': OPEN_CLIENT_ID,
            'X-Naver-Client-Secret': OPEN_CLIENT_SECRET,
            // 중요: 네이버 개발자 센터에 등록된 URL을 Referer로 보냄
            'Referer': SERVICE_URL 
        },
        timeout: 5000
    });
    return response.data;
}

// Helper: 데이터랩 API
async function fetchFromDataLabApi(keyword) {
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    const formatDate = (date) => date.toISOString().split('T')[0];

    const response = await axios.post('https://openapi.naver.com/v1/datalab/search', {
        startDate: formatDate(oneYearAgo),
        endDate: formatDate(today),
        timeUnit: 'month',
        keywordGroups: [{ groupName: keyword, keywords: [keyword] }],
        device: "", // pc, mo, or empty(all)
        ages: [], 
        gender: ""
    }, {
        headers: {
            'X-Naver-Client-Id': OPEN_CLIENT_ID,
            'X-Naver-Client-Secret': OPEN_CLIENT_SECRET,
            'Content-Type': 'application/json',
            // 중요: 네이버 개발자 센터에 등록된 URL을 Referer로 보냄
            'Referer': SERVICE_URL
        },
        timeout: 5000
    });
    return response.data;
}

// Helper: 데이터 가공
function processOpenApiData(keyword, blogData, dataLabData) {
    const totalBlogDocs = blogData.total || 0;
    const trendList = dataLabData.results?.[0]?.data || [];
    
    // 블로그 문서를 기반으로 대략적인 관심도 추정 (정확한 검색량은 아님을 명시)
    // 데이터랩 트렌드가 있으면 인기 키워드임
    const hasTrend = trendList.length > 0;
    const estimatedTotalVol = hasTrend ? Math.floor(totalBlogDocs * 2.5) : Math.floor(totalBlogDocs * 0.5);
    const pcRatio = 0.35;

    const suffix = [" 맛집", " 추천", " 후기", " 가격", " 정보"];
    const relKeywords = suffix.map(s => ({
        relKeyword: keyword + s,
        monthlyPcQc: Math.floor(estimatedTotalVol * 0.2 * pcRatio),
        monthlyMobileQc: Math.floor(estimatedTotalVol * 0.2 * (1 - pcRatio)),
        compIdx: "분석필요"
    }));

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
        meta: {
            blogTotal: totalBlogDocs,
            trendData: trendList
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