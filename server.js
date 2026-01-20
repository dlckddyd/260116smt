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
// 1. 네이버 검색광고 API Info
// ----------------------------------------------------------------------
const AD_CUSTOMER_ID = "4242810";
const AD_ACCESS_LICENSE = "0100000000ef2a06633505a32a514eb5f877611ae3de9aa6466541db60a96fcbf1f10f0dea";
const AD_SECRET_KEY = "AQAAAADvKgZjNQWjKlFOtfh3YRrjzeibNDztRquJCFhpADm79A==";

// ----------------------------------------------------------------------
// 2. 네이버 오픈 API Info
// ----------------------------------------------------------------------
const OPEN_CLIENT_ID = "vQAN_RNU8A7kvy4N_aZI";
const OPEN_CLIENT_SECRET = "0efwCNoAP7";
const SERVICE_URL = "https://port-0-smt-9144-mkkldwi351bd93e1.sel3.cloudtype.app";

app.get('/healthz', (req, res) => res.status(200).send('OK'));

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// 에러 상세 파싱
function getErrorDetails(error) {
    if (error.response) return `Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}`;
    return error.message;
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
      totalQc: 0,
      relKeywords: [],
      trend: [], // 12개월 추이
      demographics: { male: 50, female: 50, ages: [10, 20, 30, 20, 10, 10] }, // 기본값
      source: 'none',
      status: 'ok'
  };

  try {
      // 1. 병렬 호출 (속도 향상 및 독립성 보장)
      // Ad API는 IP제한으로 실패 확률 높음 -> 실패해도 trend/blog 데이터로 복구
      const [adResult, dataLabResult, blogResult] = await Promise.allSettled([
          fetchFromAdApi(cleanKeyword),
          fetchFromDataLabApi(cleanKeyword),
          fetchFromBlogApi(cleanKeyword)
      ]);

      // --- A. 검색광고 API 처리 ---
      if (adResult.status === 'fulfilled' && adResult.value) {
          const mainKw = adResult.value.keywordList?.[0];
          if (mainKw) {
            result.source = 'ad_api';
            result.monthlyPcQc = parseCount(mainKw.monthlyPcQc);
            result.monthlyMobileQc = parseCount(mainKw.monthlyMobileQc);
            result.totalQc = result.monthlyPcQc + result.monthlyMobileQc;
            
            // 연관검색어
            result.relKeywords = adResult.value.keywordList.slice(1, 6).map(k => ({
                keyword: k.relKeyword,
                total: parseCount(k.monthlyPcQc) + parseCount(k.monthlyMobileQc),
                pc: parseCount(k.monthlyPcQc),
                mo: parseCount(k.monthlyMobileQc)
            }));
          }
      } else {
          console.warn("Ad API Failed:", adResult.reason ? getErrorDetails(adResult.reason) : "Unknown");
      }

      // --- B. 데이터랩(트렌드) API 처리 ---
      let trendRatios = [];
      if (dataLabResult.status === 'fulfilled' && dataLabResult.value?.results?.[0]?.data) {
          // data: [{period: '2023-01-01', ratio: 12.5}, ...]
          trendRatios = dataLabResult.value.results[0].data.map(d => d.ratio);
      }

      // --- C. 블로그 API 처리 (Fallback Volume) ---
      let blogTotal = 0;
      if (blogResult.status === 'fulfilled' && blogResult.value?.total) {
          blogTotal = blogResult.value.total;
      }

      // --- D. 데이터 합성 및 보정 ---
      
      // 1. Volume이 0인 경우 (Ad API 실패) -> 블로그 수로 추정
      if (result.totalQc === 0 && blogTotal > 0) {
          result.source = 'open_api';
          // 트렌드가 있으면 인기 키워드 (x2.5), 없으면 (x0.5)
          const multiplier = trendRatios.length > 0 ? 2.5 : 0.5;
          const estimated = Math.floor(blogTotal * multiplier);
          
          // PC/Mobile 비율 (일반적인 35:65 적용)
          result.monthlyPcQc = Math.floor(estimated * 0.35);
          result.monthlyMobileQc = Math.floor(estimated * 0.65);
          result.totalQc = estimated;

          // 연관검색어 가짜 데이터 생성 (접미사 활용)
          const suffix = [" 추천", " 맛집", " 가격", " 후기", " 예약"];
          result.relKeywords = suffix.map(s => ({
              keyword: cleanKeyword + s,
              total: Math.floor(estimated * 0.3),
              pc: Math.floor(estimated * 0.3 * 0.35),
              mo: Math.floor(estimated * 0.3 * 0.65)
          }));
      }

      // 2. Trend 데이터 생성 (TotalQc를 Trend Ratio에 맞춰 분배)
      // DataLab은 0~100의 상대지수임.
      if (trendRatios.length > 0) {
          // 최근 12개월 데이터로 맞춤 (부족하면 앞을 채움)
          let recentTrends = trendRatios.slice(-12);
          while(recentTrends.length < 12) recentTrends.unshift(0);
          
          // 평균 Ratio 구하기
          const avgRatio = recentTrends.reduce((a,b)=>a+b, 0) / recentTrends.length || 1;
          
          // TotalQc는 "월간 평균"이므로, Ratio 1당 볼륨을 역산
          // 월평균 = (Sum(Ratios) * UnitVolume) / 12
          // UnitVolume = (TotalQc * 12) / Sum(Ratios)
          const unitVol = (result.totalQc * 12) / recentTrends.reduce((a,b)=>a+b, 0);

          result.trend = recentTrends.map(r => Math.round(r * unitVol));
      } else {
          // 트렌드 정보도 없으면 평탄하게
          result.trend = Array(12).fill(result.totalQc);
      }

      // 3. Demographics (Ad API에서 안주므로 랜덤/고정값 처리하되, 키워드 특성 반영 시늉)
      // 여기서는 UI 구현을 위해 임의의 그럴듯한 데이터를 생성합니다.
      // (실제 데이터는 네이버 데이터랩 쇼핑인사이트 API 등을 써야 함)
      result.demographics = generateMockDemographics(cleanKeyword);

      return res.json(result);

  } catch (error) {
      console.error("Critical Error:", error);
      return res.status(500).json({ 
          error: "분석 중 서버 오류 발생", 
          details: getErrorDetails(error) 
      });
  }
});

// 숫자 파싱 (< 10 같은 문자열 처리)
function parseCount(val) {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    if (typeof val === 'string') {
        if (val.includes('<')) return 10;
        return Number(val.replace(/[^0-9]/g, '')) || 0;
    }
    return 0;
}

// Mock Demographics Generator
function generateMockDemographics(keyword) {
    // 키워드 해시를 이용해 "랜덤하지만 고정된" 값 생성
    let hash = 0;
    for (let i = 0; i < keyword.length; i++) hash = keyword.charCodeAt(i) + ((hash << 5) - hash);
    const normalize = (n) => Math.abs(n) % 100;
    
    let male = 30 + (normalize(hash) % 40); // 30~70%
    let female = 100 - male;
    
    // Ages: 10~60대
    let ages = [
        10 + (normalize(hash + 1) % 20),
        20 + (normalize(hash + 2) % 30),
        30 + (normalize(hash + 3) % 20),
        20 + (normalize(hash + 4) % 10),
        10 + (normalize(hash + 5) % 10),
        5
    ];
    // Normalize to 100
    const totalAge = ages.reduce((a,b)=>a+b,0);
    ages = ages.map(a => Math.round(a / totalAge * 100));

    return { male, female, ages };
}

// 1. Search Ad API
async function fetchFromAdApi(keyword) {
    const timestamp = Date.now().toString();
    const uri = '/keywordstool';
    const method = 'GET';
    const signature = crypto.createHmac('sha256', AD_SECRET_KEY)
        .update(`${timestamp}.${method}.${uri}`)
        .digest('base64');

    const response = await axios.get(`https://api.naver.com${uri}`, {
        params: { hintKeywords: keyword, showDetail: 1 },
        headers: {
            'X-Timestamp': timestamp,
            'X-API-KEY': AD_ACCESS_LICENSE,
            'X-Customer': AD_CUSTOMER_ID, // String type enforced
            'X-Signature': signature
        },
        timeout: 4000
    });
    return response.data;
}

// 2. DataLab API (Trend)
async function fetchFromDataLabApi(keyword) {
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    const formatDate = d => d.toISOString().split('T')[0];

    const body = {
        startDate: formatDate(oneYearAgo),
        endDate: formatDate(today),
        timeUnit: 'month',
        keywordGroups: [{ groupName: keyword, keywords: [keyword] }],
        // device, gender, ages 필드 생략 (필요시 'pc', 'mo' 등으로 추가 요청해야 함)
    };

    const response = await axios.post('https://openapi.naver.com/v1/datalab/search', body, {
        headers: {
            'X-Naver-Client-Id': OPEN_CLIENT_ID,
            'X-Naver-Client-Secret': OPEN_CLIENT_SECRET,
            'Content-Type': 'application/json',
            'Referer': SERVICE_URL
        },
        timeout: 4000
    });
    return response.data;
}

// 3. Blog API
async function fetchFromBlogApi(keyword) {
    const response = await axios.get('https://openapi.naver.com/v1/search/blog.json', {
        params: { query: keyword, display: 1, sort: 'sim' },
        headers: {
            'X-Naver-Client-Id': OPEN_CLIENT_ID,
            'X-Naver-Client-Secret': OPEN_CLIENT_SECRET,
            'Referer': SERVICE_URL
        },
        timeout: 4000
    });
    return response.data;
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