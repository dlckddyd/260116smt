import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// [중요] Cloudtype 설정(스크린샷)에 맞춰 포트를 3000으로 변경합니다.
const PORT = process.env.PORT || 3000; 

const distPath = path.join(__dirname, 'dist');

// =================================================================
// [API Key Configuration]
// 네이버 검색광고 API (정확한 조회수용) 및 오픈 API (Fallback용)
// =================================================================
const AD_CUSTOMER_ID = "4242810";
const AD_ACCESS_LICENSE = "0100000000ef2a06633505a32a514eb5f877611ae3de9aa6466541db60a96fcbf1f10f0dea";
const AD_SECRET_KEY = "AQAAAADvKgZjNQWjKlFOtfh3YRrjzeibNDztRquJCFhpADm79A==";

const OPEN_CLIENT_ID = "vQAN_RNU8A7kvy4N_aZI";
const OPEN_CLIENT_SECRET = "0efwCNoAP7";

// Middleware
app.use(express.json());

// Request Logging Middleware (디버깅용 로그)
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
                try {
                    const parsed = JSON.parse(data);
                    reject({ statusCode: res.statusCode, message: parsed.message || data });
                } catch(e) {
                    reject({ statusCode: res.statusCode, message: data });
                }
            }
        });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

// =================================================================
// [API Endpoint] 키워드 검색량 조회
// =================================================================
app.get('/api/keywords', async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) {
    return res.status(400).json({ error: '키워드를 입력해주세요.' });
  }

  // Remove spaces for API query consistency
  const cleanKeyword = keyword.toString().replace(/\s+/g, '');
  const timestamp = Date.now().toString();

  console.log(`[API] Processing Keyword: ${keyword} (clean: ${cleanKeyword})`);

  try {
    // -----------------------------------------------------------
    // 1. 네이버 검색광고 API 시도 (정확한 월간 조회수)
    // -----------------------------------------------------------
    const signature = crypto.createHmac('sha256', AD_SECRET_KEY)
        .update(`${timestamp}.GET./keywordstool`)
        .digest('base64');
    
    console.log('[API] Calling Naver Ad API...');
    const adData = await doRequest(`https://api.naver.com/keywordstool?hintKeywords=${encodeURIComponent(cleanKeyword)}&showDetail=1`, {
        method: 'GET',
        headers: {
            'X-Timestamp': timestamp,
            'X-API-KEY': AD_ACCESS_LICENSE,
            'X-Customer': AD_CUSTOMER_ID,
            'X-Signature': signature
        }
    });

    console.log('[API] Ad API Success');
    res.json({ ...adData, _source: 'ad_api' });

  } catch (adError) {
    console.error("[API] Ad API Failed, switching to fallback:", adError.message);

    try {
        // -----------------------------------------------------------
        // 2. Fallback: 네이버 오픈 API (블로그 검색 결과수로 추정)
        // -----------------------------------------------------------
        console.log('[API] Calling Naver Open API (Blog Search)...');
        const blogData = await doRequest(`https://openapi.naver.com/v1/search/blog.json?query=${encodeURIComponent(cleanKeyword)}&display=1&sort=sim`, {
            method: 'GET',
            headers: {
                'X-Naver-Client-Id': OPEN_CLIENT_ID,
                'X-Naver-Client-Secret': OPEN_CLIENT_SECRET
            }
        });
        
        const total = blogData.total || 0;
        
        // 블로그 문서 수를 기반으로 한 조회수 추정 (Heuristic)
        const fallbackData = {
            keywordList: [{
                relKeyword: cleanKeyword,
                monthlyPcQc: Math.floor(total * 0.5),
                monthlyMobileQc: Math.floor(total * 1.5),
                compIdx: total > 50000 ? "높음" : "중간"
            }],
            _source: 'open_api',
            meta: { blogTotal: total }
        };
        
        console.log('[API] Open API Success (Fallback data)');
        res.json(fallbackData);

    } catch (openError) {
        console.error("[API] All APIs Failed:", openError.message);
        res.status(500).json({ error: "데이터를 가져오는데 실패했습니다.", details: openError.message });
    }
  }
});

// =================================================================
// [System] Health Check & Static Serving
// =================================================================

// Cloudtype Health Check
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Serve Static Files
if (fs.existsSync(distPath)) {
  console.log(`[System] Serving static files from ${distPath}`);
  app.use(express.static(distPath, {
    maxAge: '1d',
    setHeaders: (res, path) => {
      // 인덱스 파일은 캐시하지 않음 (즉시 반영)
      if (path.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  }));
} else {
  console.error("CRITICAL ERROR: 'dist' folder not found. Build likely failed.");
}

// SPA Routing (모든 경로를 index.html로)
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send('Deployment Error: App build files not found. Please check build logs.');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`===========================================`);
  console.log(`   Server running on port ${PORT}`);
  console.log(`   API Endpoint: /api/keywords`);
  console.log(`===========================================`);
});