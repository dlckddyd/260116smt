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
    const req = https.request(url, options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                try { resolve(JSON.parse(data)); } catch(e) { reject(e); }
            } else {
                // API 에러 응답도 파싱 시도
                try {
                    const parsed = JSON.parse(data);
                    // 데이터랩 같은 경우 에러 메시지가 body에 있음
                    console.warn(`API Error (${url}):`, parsed);
                    // 실패하더라도 치명적이지 않으면 null 반환 처리 (Promise reject 대신)
                    resolve(null); 
                } catch(e) {
                    resolve(null);
                }
            }
        });
    });
    req.on('error', (e) => {
        console.error(`Network Error (${url}):`, e);
        resolve(null); // 네트워크 에러 시 null 반환하여 전체 로직이 죽지 않게 함
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

    // Process Results
    if (!adData || !adData.keywordList) {
        throw new Error("검색광고 API 호출 실패");
    }

    const result = {
        mainKeyword: adData.keywordList[0],
        relatedKeywords: adData.keywordList.slice(1, 21), // Top 20 related
        content: {
            blogTotal: blogData ? blogData.total : 0,
            cafeTotal: cafeData ? cafeData.total : 0,
        },
        trend: datalabData && datalabData.results && datalabData.results[0] ? datalabData.results[0].data : [],
        _source: 'combined_api'
    };

    console.log('[API] All Data Fetched Successfully');
    res.json(result);

  } catch (error) {
    console.error("[API] Error:", error.message);
    // Fallback: If Ad API fails, return error. Others are optional.
    res.status(500).json({ error: "데이터 조회 중 오류가 발생했습니다.", details: error.message });
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