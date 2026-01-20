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
// 1. 네이버 검색광고 API (고정 IP 필요)
// ----------------------------------------------------------------------
const AD_CUSTOMER_ID = "4242810";
const AD_ACCESS_LICENSE = "0100000000ef2a06633505a32a514eb5f877611ae3de9aa6466541db60a96fcbf1f10f0dea";
const AD_SECRET_KEY = "AQAAAADvKgZjNQWjKlFOtfh3YRrjzeibNDztRquJCFhpADm79A==";

// ----------------------------------------------------------------------
// 2. 네이버 오픈 API (IP 제한 없음 - 데이터 추정용)
// ----------------------------------------------------------------------
const OPEN_CLIENT_ID = "vQAN_RNU8A7kvy4N_aZI";
const OPEN_CLIENT_SECRET = "0efwCNoAP7";

app.get('/healthz', (req, res) => res.status(200).send('OK'));

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// 서버 시작 시 현재 공인 IP 확인 (디버깅용)
async function checkPublicIP() {
    try {
        const res = await axios.get('https://api.ipify.org?format=json');
        console.log("------------------------------------------------");
        console.log(`Current Server Public IP: ${res.data.ip}`);
        console.log("이 IP를 네이버 광고시스템 API 설정에 등록해야 합니다.");
        console.log("------------------------------------------------");
    } catch (e) {
        console.log("Failed to check public IP");
    }
}
checkPublicIP();

// 통합 API 핸들러
app.get('/api/naver-keywords', async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) return res.status(400).json({ error: '키워드를 입력해주세요.' });

  const cleanKeyword = keyword.trim().replace(/\s+/g, '');
  
  // 기본 결과 객체 (UI 깨짐 방지용 기본값)
  let result = {
      keyword: cleanKeyword,
      monthlyPcQc: 0,
      monthlyMobileQc: 0,
      monthlyTotalQc: 0,
      relKeywords: [],
      trend: [], // 12개월 추이
      demographics: { male: 50, female: 50, ages: [10, 20, 30, 20, 10, 10] },
      source: 'none',
      status: 'ok'
  };

  try {
      console.log(`Analyzing Keyword: ${cleanKeyword}`);

      // 1. 병렬 호출: 광고 API(우선순위) + 데이터랩/블로그(보조/대체)
      // 광고 API는 IP 차단 가능성이 높지만, 성공하면 가장 정확하므로 무조건 시도합니다.
      const [adResult, dataLabResult, blogResult] = await Promise.allSettled([
          fetchFromAdApi(cleanKeyword),
          fetchFromDataLabApi(cleanKeyword),
          fetchFromBlogApi(cleanKeyword)
      ]);

      let adApiSuccess = false;

      // --- A. 검색광고 API 성공 시 (정확한 데이터) ---
      if (adResult.status === 'fulfilled' && adResult.value && adResult.value.keywordList && adResult.value.keywordList.length > 0) {
          const mainKw = adResult.value.keywordList[0];
          // 검색어가 정확히 일치하는지 확인 (유사 키워드가 올 수 있음)
          if (mainKw.relKeyword.replace(/\s/g,'') === cleanKeyword) {
              result.source = 'ad_api'; // 출처: 광고 API
              result.monthlyPcQc = parseCount(mainKw.monthlyPcQc);
              result.monthlyMobileQc = parseCount(mainKw.monthlyMobileQc);
              result.monthlyTotalQc = result.monthlyPcQc + result.monthlyMobileQc;
              
              // 연관검색어 (실제 데이터)
              result.relKeywords = adResult.value.keywordList.slice(1, 6).map(k => ({
                  keyword: k.relKeyword,
                  total: parseCount(k.monthlyPcQc) + parseCount(k.monthlyMobileQc),
                  pc: parseCount(k.monthlyPcQc),
                  mo: parseCount(k.monthlyMobileQc),
                  compIdx: k.compIdx || "중간"
              }));
              adApiSuccess = true;
          }
      }

      // --- B. 데이터랩(트렌드) 데이터 파싱 ---
      let trendRatios = [];
      if (dataLabResult.status === 'fulfilled' && dataLabResult.value?.results?.[0]?.data) {
          // data: [{period: '2023-01-01', ratio: 12.5}, ...]
          trendRatios = dataLabResult.value.results[0].data.map(d => d.ratio);
      }

      // --- C. 블로그 문서수 (추정 로직용) ---
      let blogTotal = 0;
      if (blogResult.status === 'fulfilled' && blogResult.value?.total) {
          blogTotal = blogResult.value.total;
      }

      // --- D. 실패 시 Fallback 로직 (추정 데이터 생성) ---
      // IP 차단으로 광고 API가 실패했거나, 검색량이 0으로 잡히는 경우 -> 오픈 API로 추정
      if (!adApiSuccess || result.monthlyTotalQc === 0) {
          console.log(">> Ad API blocked or empty. Switching to Estimation Mode.");
          result.source = 'estimation'; // 출처: 추정

          // [로직] 블로그 문서수와 트렌드 유무로 검색량 역산 추정
          // 트렌드 데이터가 있으면 인기 키워드(x2.5), 없으면(x0.5)
          const multiplier = trendRatios.length > 0 ? 2.5 : 0.5;
          
          // 최소값 보정 (블로그가 0이어도 검색은 있을 수 있음)
          let estimatedTotal = Math.max(Math.floor(blogTotal * multiplier), trendRatios.length > 0 ? 500 : 0);
          
          // 모바일 비중이 높은 요즘 추세 반영 (PC 35 : Mobile 65)
          result.monthlyPcQc = Math.floor(estimatedTotal * 0.35);
          result.monthlyMobileQc = Math.floor(estimatedTotal * 0.65);
          result.monthlyTotalQc = estimatedTotal;

          // 연관 검색어 가짜 생성 (접미사 활용)
          const suffix = [" 맛집", " 추천", " 가격", " 예약", " 후기"];
          result.relKeywords = suffix.map(s => ({
              keyword: cleanKeyword + s,
              total: Math.floor(estimatedTotal * 0.3),
              pc: Math.floor(estimatedTotal * 0.3 * 0.35),
              mo: Math.floor(estimatedTotal * 0.3 * 0.65),
              compIdx: "분석필요"
          }));
      }

      // --- E. 트렌드 그래프 데이터 완성 ---
      // DataLab은 0~100 상대값만 주므로, TotalQc에 맞춰 절대값으로 변환하여 그래프용 배열 생성
      if (trendRatios.length > 0) {
          // 최근 12개월 데이터 슬라이싱
          let recentTrends = trendRatios.slice(-12);
          while(recentTrends.length < 12) {
             // 데이터 부족 시 앞부분 채움
             recentTrends.unshift(recentTrends.length > 0 ? recentTrends[0] * 0.8 : 0);
          }
          
          // 가장 최근 달의 Ratio를 기준으로 전체 볼륨 역산
          const lastRatio = recentTrends[recentTrends.length-1] || 1;
          const unitVal = result.monthlyTotalQc / (lastRatio > 0 ? lastRatio : 1);

          result.trend = recentTrends.map(r => Math.round(r * unitVal));
      } else {
          // 트렌드 정보도 없으면 평탄한 그래프
          result.trend = Array(12).fill(result.monthlyTotalQc);
      }

      // --- F. 인구통계 (성별/나이) 시뮬레이션 ---
      // 광고 API가 차단되면 인구통계 정보가 없습니다. UI를 위해 키워드 기반 난수 생성.
      // (새로고침해도 키워드가 같으면 동일한 그래프가 나옴)
      result.demographics = generateMockDemographics(cleanKeyword);

      return res.json(result);

  } catch (error) {
      console.error("Critical Error:", error);
      return res.status(500).json({ error: "Server Error", details: error.message });
  }
});

// 숫자 파싱 함수 (< 10 같은 문자열 처리)
function parseCount(val) {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    if (typeof val === 'string') {
        if (val.includes('<')) return 10;
        return Number(val.replace(/[^0-9]/g, '')) || 0;
    }
    return 0;
}

// 인구통계 시뮬레이터 (키워드 해시 기반)
function generateMockDemographics(keyword) {
    let hash = 0;
    for (let i = 0; i < keyword.length; i++) {
        hash = keyword.charCodeAt(i) + ((hash << 5) - hash);
    }
    const pseudoRandom = (seed) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };
    
    // 성별 (남성비율 30~70% 랜덤)
    let maleRatio = 30 + Math.floor(pseudoRandom(hash) * 40);
    
    // 연령 (10대~60대 분포)
    let ages = [];
    for(let i=1; i<=6; i++) {
        ages.push(Math.floor(pseudoRandom(hash + i) * 100));
    }
    
    // 합계 100%로 정규화
    const totalAge = ages.reduce((a,b)=>a+b, 0);
    ages = ages.map(a => Math.round((a / totalAge) * 100));

    return { 
        male: maleRatio, 
        female: 100 - maleRatio, 
        ages: ages 
    };
}

// --- API 호출 함수들 ---

async function fetchFromAdApi(keyword) {
    try {
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
            // IP 차단 시 응답이 느릴 수 있으므로 타임아웃을 짧게 설정하여 빨리 오픈 API로 넘김
            timeout: 2000 
        });
        return response.data;
    } catch (e) {
        throw e; // Promise.allSettled에서 처리됨
    }
}

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
        // device, gender, ages 필드는 필수값이 아니므로 생략 (잘못 보내면 400 에러)
    };

    const response = await axios.post('https://openapi.naver.com/v1/datalab/search', body, {
        headers: {
            'X-Naver-Client-Id': OPEN_CLIENT_ID,
            'X-Naver-Client-Secret': OPEN_CLIENT_SECRET,
            'Content-Type': 'application/json'
        },
        timeout: 4000
    });
    return response.data;
}

async function fetchFromBlogApi(keyword) {
    const response = await axios.get('https://openapi.naver.com/v1/search/blog.json', {
        params: { query: keyword, display: 1, sort: 'sim' },
        headers: {
            'X-Naver-Client-Id': OPEN_CLIENT_ID,
            'X-Naver-Client-Secret': OPEN_CLIENT_SECRET
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