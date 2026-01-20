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

// Helper: HTTPS Request Wrapper with Detailed Logging
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
                try { resolve({ success: true, data: JSON.parse(data) }); } 
                catch(e) { 
                    console.error("[JSON Parse Error]", e);
                    resolve({ success: false, error: "JSON Parse Error", raw: data }); 
                }
            } else {
                console.warn(`[API FAILED] URL: ${url}`);
                console.warn(`[API FAILED] Status: ${res.statusCode}`);
                
                try {
                    const parsed = JSON.parse(data);
                    resolve({ success: false, status: res.statusCode, error: parsed.message || parsed, raw: parsed });
                } catch(e) {
                    resolve({ success: false, status: res.statusCode, error: data, raw: data });
                }
            }
        });
    });
    req.on('error', (e) => {
        console.error(`[Network Error] ${url}:`, e.message);
        resolve({ success: false, error: e.message });
    });
    if (postData) req.write(postData);
    req.end();
  });
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
    // 2. 오픈 API - 콘텐츠 발행량 (Parallel Fetch)
    // 데이터랩(DataLab)은 제거하고 확실한 Content Volume 데이터만 수집
    // -----------------------------------------------------------
    const openApiHeaders = {
        'X-Naver-Client-Id': OPEN_CLIENT_ID,
        'X-Naver-Client-Secret': OPEN_CLIENT_SECRET
    };

    const targets = [
        { key: 'blog', url: `https://openapi.naver.com/v1/search/blog.json?query=${encodeURIComponent(cleanKeyword)}&display=1&sort=sim` },
        { key: 'cafe', url: `https://openapi.naver.com/v1/search/cafearticle.json?query=${encodeURIComponent(cleanKeyword)}&display=1&sort=sim` },
        { key: 'news', url: `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(cleanKeyword)}&display=1&sort=sim` },
        { key: 'shop', url: `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(cleanKeyword)}&display=1&sort=sim` },
        { key: 'kin', url: `https://openapi.naver.com/v1/search/kin.json?query=${encodeURIComponent(cleanKeyword)}&display=1&sort=sim` },
        { key: 'web', url: `https://openapi.naver.com/v1/search/webkr.json?query=${encodeURIComponent(cleanKeyword)}&display=1&sort=sim` },
        { key: 'image', url: `https://openapi.naver.com/v1/search/image.json?query=${encodeURIComponent(cleanKeyword)}&display=1&sort=sim` }
    ];

    const openApiPromises = targets.map(target => 
        doRequest(target.url, { method: 'GET', headers: openApiHeaders })
            .then(res => ({ key: target.key, ...res }))
    );

    // Wait for everything
    const [adRes, ...openApiResults] = await Promise.all([
        adPromise, 
        ...openApiPromises
    ]);

    // -----------------------------------------------------------
    // Result Assembly
    // -----------------------------------------------------------
    const contentData = {};
    openApiResults.forEach(r => {
        // total 값이 있으면 사용, 없으면 0
        contentData[r.key] = r.success && r.data ? (r.data.total || 0) : 0;
    });

    let mainKeyword = null;
    let relatedKeywords = [];
    let dataSource = 'combined_api';
    let debugInfo = {
        adApiStatus: adRes.success ? 'OK' : adRes.status || 'Error',
        openApiErrors: openApiResults.filter(r => !r.success).map(r => r.key)
    };

    // 1순위: 광고 API 데이터 사용
    if (adRes.success && adRes.data && adRes.data.keywordList && adRes.data.keywordList.length > 0) {
        mainKeyword = adRes.data.keywordList[0];
        relatedKeywords = adRes.data.keywordList.slice(1, 21);
    } 
    // 2순위: 광고 API 실패 시, 오픈 API(블로그) 데이터로 추정
    else if (contentData.blog > 0) {
        console.warn("[API Warning] Ad API failed. Using Open API fallback.");
        const total = contentData.blog;
        dataSource = 'open_api_fallback';
        
        mainKeyword = {
            relKeyword: cleanKeyword,
            monthlyPcQc: Math.floor(total * 0.5),
            monthlyMobileQc: Math.floor(total * 1.5),
            monthlyAvePcClkCnt: Math.floor(total * 0.05),
            monthlyAveMobileClkCnt: Math.floor(total * 0.1),
            compIdx: total > 50000 ? "높음" : "중간"
        };
        // Generate simulated related keywords
        const suffixes = ["추천", "가격", "비용", "후기", "예약", "위치", "잘하는곳", "정보", "할인", "이벤트"];
        relatedKeywords = suffixes.map((suffix, index) => ({
            relKeyword: `${cleanKeyword} ${suffix}`,
            monthlyPcQc: Math.floor(mainKeyword.monthlyPcQc * (0.1 + Math.random() * 0.3)),
            monthlyMobileQc: Math.floor(mainKeyword.monthlyMobileQc * (0.1 + Math.random() * 0.3)),
            compIdx: index % 3 === 0 ? "높음" : index % 3 === 1 ? "중간" : "낮음"
        }));
    } else {
        console.error("[API Error] All APIs failed.");
        return res.status(500).json({ error: "데이터 조회 실패", debug: debugInfo });
    }

    const result = {
        mainKeyword,
        relatedKeywords,
        content: contentData, // Contains blog, cafe, news, shop, kin, web, image
        _source: dataSource,
        _debug: debugInfo
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