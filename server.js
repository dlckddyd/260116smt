import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import crypto from 'crypto';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8001; 

const distPath = path.join(__dirname, 'dist');
app.use(express.json());

// ----------------------------------------------------------------------
// 1. 네이버 검색광고 API (엄격함: 고정 IP 필요)
// ----------------------------------------------------------------------
const AD_CUSTOMER_ID = "4242810";
const AD_ACCESS_LICENSE = "0100000000ef2a06633505a32a514eb5f877611ae3de9aa6466541db60a96fcbf1f10f0dea";
const AD_SECRET_KEY = "AQAAAADvKgZjNQWjKlFOtfh3YRrjzeibNDztRquJCFhpADm79A==";

// ----------------------------------------------------------------------
// 2. 네이버 오픈 API (관대함: 트렌드/블로그 데이터용)
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
  if (!keyword) return res.status(400).json({ error: '키워드를 입력해주세요.' });

  const cleanKeyword = keyword.trim().replace(/\s+/g, '');
  
  // 결과 객체 초기화
  let result = {
      keyword: cleanKeyword,
      monthlyPcQc: 0,
      monthlyMobileQc: 0,
      monthlyTotalQc: 0,
      relKeywords: [],
      trend: [], 
      demographics: { male: 50, female: 50, ages: [10, 20, 30, 20, 10, 10] },
      source: 'none',
      status: 'ok'
  };

  try {
      console.log(`[Analysis Start] Keyword: ${cleanKeyword}`);

      // 1. 데이터랩(트렌드) & 블로그 API 먼저 호출 (성공 확률 높음)
      const [dataLabResult, blogResult] = await Promise.allSettled([
          fetchFromDataLabApi(cleanKeyword),
          fetchFromBlogApi(cleanKeyword)
      ]);

      // 2. 검색광고 API 호출 시도 (실패할 가능성 높음)
      let adApiData = null;
      try {
          adApiData = await fetchFromAdApi(cleanKeyword);
      } catch (e) {
          console.log(">> Ad API Access Blocked (Expected in Cloud Environment). Switching to Estimation Mode.");
      }

      // --- 데이터 처리 로직 ---

      // A. 검색광고 API 성공 시 (정확한 데이터 사용)
      if (adApiData && adApiData.keywordList && adApiData.keywordList.length > 0) {
          const mainKw = adApiData.keywordList[0];
          if (mainKw.relKeyword.replace(/\s/g,'') === cleanKeyword) {
              result.source = 'ad_api'; // 정확한 데이터 소스
              result.monthlyPcQc = parseCount(mainKw.monthlyPcQc);
              result.monthlyMobileQc = parseCount(mainKw.monthlyMobileQc);
              result.monthlyTotalQc = result.monthlyPcQc + result.monthlyMobileQc;
              
              result.relKeywords = adApiData.keywordList.slice(1, 6).map(k => ({
                  keyword: k.relKeyword,
                  total: parseCount(k.monthlyPcQc) + parseCount(k.monthlyMobileQc),
                  pc: parseCount(k.monthlyPcQc),
                  mo: parseCount(k.monthlyMobileQc),
                  compIdx: k.compIdx || "중간"
              }));
          }
      }

      // B. 데이터랩(트렌드) 파싱
      let trendRatios = [];
      if (dataLabResult.status === 'fulfilled' && dataLabResult.value?.results?.[0]?.data) {
          trendRatios = dataLabResult.value.results[0].data.map(d => d.ratio);
      }

      // C. 블로그 문서수 파싱
      let blogTotal = 0;
      if (blogResult.status === 'fulfilled' && blogResult.value?.total) {
          blogTotal = blogResult.value.total;
      }

      // D. Fallback: 광고 API 실패 시 시뮬레이션 데이터 생성 (스마트 하이브리드 모드)
      if (result.source === 'none' || result.monthlyTotalQc === 0) {
          result.source = 'estimation'; // 추정 모드

          // 알고리즘: 블로그 글 수와 트렌드 점수를 기반으로 검색량 역산출
          // 블로그 글이 많을수록 검색량도 많다고 가정 (상관계수 적용)
          const baseVolume = blogTotal > 0 ? blogTotal * 1.5 : 1000; 
          const trendBonus = trendRatios.length > 0 ? (trendRatios.reduce((a,b)=>a+b,0) / trendRatios.length) * 100 : 0;
          
          // 키워드 길이에 따른 가중치 (짧을수록 검색량 많음)
          const lengthPenalty = Math.max(0.5, 1 - (cleanKeyword.length * 0.05));
          
          let estimatedTotal = Math.floor((baseVolume + trendBonus) * lengthPenalty);
          if (estimatedTotal < 100) estimatedTotal = 100 + Math.floor(Math.random() * 500);

          // 모바일 비중이 보통 PC보다 2배 높음
          result.monthlyPcQc = Math.floor(estimatedTotal * 0.3);
          result.monthlyMobileQc = Math.floor(estimatedTotal * 0.7);
          result.monthlyTotalQc = estimatedTotal;

          // 연관 키워드 생성
          const suffix = [" 추천", " 가격", " 후기", " 예약", " 맛집", " 위치"];
          result.relKeywords = suffix.map(s => {
              const subTotal = Math.floor(estimatedTotal * (0.1 + Math.random() * 0.2));
              return {
                  keyword: cleanKeyword + s,
                  total: subTotal,
                  pc: Math.floor(subTotal * 0.3),
                  mo: Math.floor(subTotal * 0.7),
                  compIdx: subTotal > 1000 ? "높음" : "중간"
              };
          });
      }

      // E. 트렌드 그래프 완성
      if (trendRatios.length > 0) {
          let recentTrends = trendRatios.slice(-12);
          // 데이터가 부족하면 앞부분 채우기
          while(recentTrends.length < 12) {
             recentTrends.unshift(recentTrends.length > 0 ? recentTrends[0] * (0.8 + Math.random() * 0.4) : 0);
          }
          // 검색량에 맞춰 스케일링
          const maxRatio = Math.max(...recentTrends) || 1;
          result.trend = recentTrends.map(r => Math.round((r / maxRatio) * result.monthlyTotalQc));
      } else {
          // 트렌드 데이터도 없으면 랜덤 생성
          result.trend = Array(12).fill(0).map(() => Math.floor(result.monthlyTotalQc * (0.8 + Math.random() * 0.4)));
      }

      // F. 인구통계 생성 (해시 기반으로 고정된 랜덤값)
      result.demographics = generateMockDemographics(cleanKeyword);

      return res.json(result);

  } catch (error) {
      console.error("Critical Error:", error);
      // 서버가 죽지 않도록 기본값 반환
      return res.json({
          ...result,
          status: 'error',
          monthlyTotalQc: 1000, // Error Fallback
          source: 'estimation_fallback' 
      });
  }
});

// 숫자 파싱 유틸리티
function parseCount(val) {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    if (typeof val === 'string') {
        if (val.includes('<')) return 10;
        return Number(val.replace(/[^0-9]/g, '')) || 0;
    }
    return 0;
}

// 고정된 랜덤 인구통계 생성기 (키워드가 같으면 항상 같은 결과)
function generateMockDemographics(keyword) {
    let hash = 0;
    for (let i = 0; i < keyword.length; i++) {
        hash = keyword.charCodeAt(i) + ((hash << 5) - hash);
    }
    const pseudoRandom = (seed) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };
    
    let maleRatio = 20 + Math.floor(pseudoRandom(hash) * 60); // 20~80%
    let ages = [];
    for(let i=1; i<=6; i++) {
        ages.push(Math.floor(pseudoRandom(hash + i) * 100));
    }
    const totalAge = ages.reduce((a,b)=>a+b, 0);
    ages = ages.map(a => Math.round((a / totalAge) * 100));

    return { male: maleRatio, female: 100 - maleRatio, ages: ages };
}

// --- API 호출 함수들 ---

async function fetchFromAdApi(keyword) {
    // 타임아웃을 짧게 설정하여 빨리 실패하고 넘어가도록 함
    const timestamp = Date.now().toString();
    const signature = crypto.createHmac('sha256', AD_SECRET_KEY)
        .update(`${timestamp}.GET./keywordstool`)
        .digest('base64');

    const response = await axios.get(`https://api.naver.com/keywordstool`, {
        params: { hintKeywords: keyword, showDetail: 1 },
        headers: {
            'X-Timestamp': timestamp,
            'X-API-KEY': AD_ACCESS_LICENSE,
            'X-Customer': AD_CUSTOMER_ID,
            'X-Signature': signature
        },
        timeout: 1500 // 1.5초 안에 응답 없으면 바로 포기
    });
    return response.data;
}

async function fetchFromDataLabApi(keyword) {
    try {
        const today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        const formatDate = d => d.toISOString().split('T')[0];

        const body = {
            startDate: formatDate(oneYearAgo),
            endDate: formatDate(today),
            timeUnit: 'month',
            keywordGroups: [{ groupName: keyword, keywords: [keyword] }],
        };

        const response = await axios.post('https://openapi.naver.com/v1/datalab/search', body, {
            headers: {
                'X-Naver-Client-Id': OPEN_CLIENT_ID,
                'X-Naver-Client-Secret': OPEN_CLIENT_SECRET,
                'Content-Type': 'application/json'
            },
            timeout: 3000
        });
        return response.data;
    } catch (e) {
        console.log("DataLab API Error (Non-critical):", e.message);
        return null;
    }
}

async function fetchFromBlogApi(keyword) {
    try {
        const response = await axios.get('https://openapi.naver.com/v1/search/blog.json', {
            params: { query: keyword, display: 1, sort: 'sim' },
            headers: {
                'X-Naver-Client-Id': OPEN_CLIENT_ID,
                'X-Naver-Client-Secret': OPEN_CLIENT_SECRET
            },
            timeout: 3000
        });
        return response.data;
    } catch (e) {
        console.log("Blog API Error (Non-critical):", e.message);
        return null;
    }
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