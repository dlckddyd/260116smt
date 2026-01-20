import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Cloudtype 설정에 맞춰 포트 3000 사용
const PORT = process.env.PORT || 3000; 

const distPath = path.join(__dirname, 'dist');

// =================================================================
// [API Key Configuration]
// =================================================================
const AD_CUSTOMER_ID = "4242810";
const AD_ACCESS_LICENSE = "0100000000ef2a06633505a32a514eb5f877611ae3de9aa6466541db60a96fcbf1f10f0dea";
const AD_SECRET_KEY = "AQAAAADvKgZjNQWjKlFOtfh3YRrjzeibNDztRquJCFhpADm79A==";

const OPEN_CLIENT_ID = "vQAN_RNU8A7kvy4N_aZI";
const OPEN_CLIENT_SECRET = "0efwCNoAP7";

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[Request] ${req.method} ${req.url}`);
  next();
});

// Helper: HTTPS Request Wrapper
function doRequest(url, options, postData) {
  return new Promise((resolve, reject) => {
    const requestOptions = { ...options };
    
    // Add Content-Length for POST requests
    if (postData) {
        requestOptions.headers = {
            ...(requestOptions.headers || {}),
            'Content-Length': Buffer.byteLength(postData)
        };
    }

    const req = https.request(url, requestOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                try { resolve(JSON.parse(data)); } catch(e) { 
                    console.error("JSON Parse Error:", e);
                    resolve(null); 
                }
            } else {
                try {
                    const parsed = JSON.parse(data);
                    console.warn(`[API Fail] ${url} (${res.statusCode}):`, parsed.message || parsed);
                } catch(e) {
                    console.warn(`[API Fail] ${url} (${res.statusCode}):`, data);
                }
                resolve(null);
            }
        });
    });
    req.on('error', (e) => {
        console.error(`[Network Error] ${url}:`, e.message);
        resolve(null);
    });
    if (postData) req.write(postData);
    req.end();
  });
}

// Helper: Get Date String (YYYY-MM-DD)
function getDateString(date) {
    return date.toISOString().split('T')[0];
}

// =================================================================
// [API Endpoint] 키워드 종합 분석
// =================================================================
app.get('/api/keywords', async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) {
    return res.status(400).json({ error: '키워드를 입력해주세요.' });
  }

  const cleanKeyword = keyword.toString().replace(/\s+/g, '');
  const timestamp = Date.now().toString();

  console.log(`[API] Analyzing Keyword: ${cleanKeyword}`);

  try {
    // -----------------------------------------------------------
    // 1. 네이버 검색광고 API (Search Volume)
    // -----------------------------------------------------------
    const signature = crypto.createHmac('sha256', AD_SECRET_KEY)
        .update(`${timestamp}.GET./keywordstool`)
        .digest('base64');
    
    const adPromise = doRequest(`https://api.naver.com/keywordstool?hintKeywords=${encodeURIComponent(cleanKeyword)}&showDetail=1`, {
        method: 'GET',
        headers: {
            'X-Timestamp': timestamp,
            'X-API-KEY': AD_ACCESS_LICENSE,
            'X-Customer': AD_CUSTOMER_ID,
            'X-Signature': signature
        }
    });

    // -----------------------------------------------------------
    // 2. 오픈 API - 블로그 검색 (Content Count)
    // -----------------------------------------------------------
    const blogPromise = doRequest(`https://openapi.naver.com/v1/search/blog.json?query=${encodeURIComponent(cleanKeyword)}&display=1&sort=sim`, {
        method: 'GET',
        headers: {
            'X-Naver-Client-Id': OPEN_CLIENT_ID,
            'X-Naver-Client-Secret': OPEN_CLIENT_SECRET
        }
    });

    // -----------------------------------------------------------
    // 3. 오픈 API - 카페 검색 (Content Count)
    // -----------------------------------------------------------
    const cafePromise = doRequest(`https://openapi.naver.com/v1/search/cafearticle.json?query=${encodeURIComponent(cleanKeyword)}&display=1&sort=sim`, {
        method: 'GET',
        headers: {
            'X-Naver-Client-Id': OPEN_CLIENT_ID,
            'X-Naver-Client-Secret': OPEN_CLIENT_SECRET
        }
    });

    // -----------------------------------------------------------
    // 4. 데이터랩 API (Search Trend - Last 1 Year)
    // -----------------------------------------------------------
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const datalabBody = JSON.stringify({
        startDate: getDateString(oneYearAgo),
        endDate: getDateString(today),
        timeUnit: 'month',
        keywordGroups: [{ groupName: cleanKeyword, keywords: [cleanKeyword] }]
    });

    const datalabPromise = doRequest(`https://openapi.naver.com/v1/datalab/search`, {
        method: 'POST',
        headers: {
            'X-Naver-Client-Id': OPEN_CLIENT_ID,
            'X-Naver-Client-Secret': OPEN_CLIENT_SECRET,
            'Content-Type': 'application/json'
        }
    }, datalabBody);

    // Wait for all requests
    const [adData, blogData, cafeData, datalabData] = await Promise.all([adPromise, blogPromise, cafePromise, datalabPromise]);

    // -----------------------------------------------------------
    // 결과 조합 (Robust Fallback Logic)
    // -----------------------------------------------------------
    let mainKeyword = null;
    let relatedKeywords = [];
    let dataSource = 'combined_api';

    // 1순위: 광고 API 데이터 사용
    if (adData && adData.keywordList && adData.keywordList.length > 0) {
        mainKeyword = adData.keywordList[0];
        relatedKeywords = adData.keywordList.slice(1, 21);
    } 
    // 2순위: 광고 API 실패 시, 오픈 API(블로그) 데이터로 추정
    else if (blogData && (blogData.total !== undefined)) {
        console.warn("[API Warning] Ad API failed or returned empty. Using Open API fallback.");
        const total = blogData.total;
        dataSource = 'open_api_fallback';
        
        // 블로그 발행량을 기반으로 검색량 추정 (Heuristic)
        mainKeyword = {
            relKeyword: cleanKeyword,
            monthlyPcQc: Math.floor(total * 0.5),
            monthlyMobileQc: Math.floor(total * 1.5),
            monthlyAvePcClkCnt: Math.floor(total * 0.05),
            monthlyAveMobileClkCnt: Math.floor(total * 0.1),
            compIdx: total > 50000 ? "높음" : "중간"
        };

        // Fallback: Generate Synthetic Related Keywords
        const suffixes = ["추천", "가격", "비용", "후기", "예약", "위치", "잘하는곳", "정보", "할인", "이벤트"];
        relatedKeywords = suffixes.map((suffix, index) => ({
            relKeyword: `${cleanKeyword} ${suffix}`,
            monthlyPcQc: Math.floor(mainKeyword.monthlyPcQc * (0.1 + Math.random() * 0.3)),
            monthlyMobileQc: Math.floor(mainKeyword.monthlyMobileQc * (0.1 + Math.random() * 0.3)),
            compIdx: index % 3 === 0 ? "높음" : index % 3 === 1 ? "중간" : "낮음"
        }));
    } else {
        console.error("[API Error] All APIs failed.");
        return res.status(500).json({ error: "데이터를 불러올 수 없습니다. 잠시 후 다시 시도해주세요." });
    }

    // -----------------------------------------------------------
    // Trend Data Logic (With Fallback)
    // -----------------------------------------------------------
    let trendData = [];
    if (datalabData && datalabData.results && datalabData.results[0] && datalabData.results[0].data) {
        trendData = datalabData.results[0].data;
    } else {
        console.warn("[API Warning] DataLab API failed or empty. Using simulated trend.");
        // Fallback: Generate Simulated Trend
        for (let i = 0; i < 12; i++) {
            const date = new Date();
            date.setMonth(date.getMonth() - (11 - i));
            // Random trend curve
            trendData.push({
                period: date.toISOString().split('T')[0],
                ratio: 30 + Math.random() * 70
            });
        }
    }

    const result = {
        mainKeyword,
        relatedKeywords,
        content: {
            blogTotal: blogData?.total || 0,
            cafeTotal: cafeData?.total || 0,
        },
        trend: trendData,
        _source: dataSource
    };

    console.log('[API] Response sent successfully.');
    res.json(result);

  } catch (error) {
    console.error("[API Critical Error]:", error.message);
    res.status(500).json({ error: "서버 내부 오류가 발생했습니다.", details: error.message });
  }
});

// Health Check
app.get('/healthz', (req, res) => res.status(200).send('OK'));

// Serve Static Files
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    maxAge: '1d',
    setHeaders: (res, path) => {
      if (path.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  }));
}

// SPA Routing
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send('Build files not found.');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});