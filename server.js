import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import crypto from 'crypto';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

console.log('-----------------------------------');
console.log(`Starting Node.js Server...`);
console.log(`Resolved PORT: ${PORT}`);
console.log('-----------------------------------');

const distPath = path.join(__dirname, 'dist');

app.use(express.json());

if (fs.existsSync(distPath)) {
  console.log(`Serving static files from: ${distPath}`);
  app.use(express.static(distPath));
} else {
  console.error('CRITICAL WARNING: "dist" folder not found.');
}

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// ----------------------------------------------------------------------
// 1. 네이버 검색광고 API (정확한 검색량 조회용)
// ----------------------------------------------------------------------
const AD_CUSTOMER_ID = "4242810";
const AD_ACCESS_LICENSE = "0100000000ef2a06633505a32a514eb5f877611ae3de9aa6466541db60a96fcbf1f10f0dea";
const AD_SECRET_KEY = "AQAAAADvKgZjNQWjKlFOtfh3YRrjzeibNDztRquJCFhpADm79A==";

// ----------------------------------------------------------------------
// 2. 네이버 오픈 API (블로그 검색용 - Fallback)
// ----------------------------------------------------------------------
const OPEN_CLIENT_ID = "vQAN_RNU8A7kvy4N_aZI";
const OPEN_CLIENT_SECRET = "0efwCNoAP7";

// 통합 API 핸들러
app.get('/api/naver-keywords', async (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ error: '키워드가 필요합니다.' });
  }

  const cleanKeyword = keyword.replace(/\s+/g, '');

  try {
    console.log(`[API Attempt 1] Trying Ad API for: ${cleanKeyword}`);
    
    // 1차 시도: 검색광고 API
    const adData = await fetchFromAdApi(cleanKeyword);
    console.log('[API Success] Ad API returned data.');
    return res.json(adData);

  } catch (adError) {
    console.warn(`[API Fail 1] Ad API failed. Status: ${adError.statusCode}. Message: ${adError.message}`);
    
    // 401 Unauthorized 등 실패 시 Fallback 시도
    console.log(`[API Attempt 2] Switching to Open API (Fallback)...`);

    try {
        // 2차 시도: 오픈 API
        const openData = await fetchFromOpenApi(cleanKeyword);
        console.log('[API Success] Open API returned data.');
        
        // 프론트엔드에 Fallback 데이터임을 알릴 수 있음 (선택사항)
        return res.json({ ...openData, _source: 'fallback' });

    } catch (openError) {
        console.error(`[API Fail 2] Open API also failed: ${openError.message}`);
        
        // 에러 메시지를 구체적으로 반환
        const adMsg = adError.statusCode === 401 ? 'IP Unauthorized' : adError.message;
        const openMsg = openError.statusCode === 401 ? 'Invalid Client ID/Secret' : openError.message;

        return res.status(500).json({ 
            error: 'API Error', 
            details: `Ad API(${adMsg}) -> Open API(${openMsg})` 
        });
    }
  }
});

// Helper: 검색광고 API 호출 함수
function fetchFromAdApi(keyword) {
    return new Promise((resolve, reject) => {
        const timestamp = Date.now().toString();
        const method = "GET";
        const uri = "/keywordstool";
        const message = `${timestamp}.${method}.${uri}`;
        
        const signature = crypto.createHmac('sha256', AD_SECRET_KEY)
            .update(message)
            .digest('base64');

        const options = {
            hostname: 'api.naver.com',
            path: `${uri}?hintKeywords=${encodeURIComponent(keyword)}&showDetail=1`,
            method: 'GET',
            headers: {
                'X-Timestamp': timestamp,
                'X-API-KEY': AD_ACCESS_LICENSE,
                'X-Customer': AD_CUSTOMER_ID,
                'X-Signature': signature,
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const parsed = JSON.parse(data);
                        if (!parsed.keywordList) parsed.keywordList = [];
                        resolve(parsed);
                    } catch (e) {
                        reject({ statusCode: 500, message: 'Invalid JSON from Ad API' });
                    }
                } else {
                    // 네이버가 에러 메시지를 보내는지 확인
                    const msg = data ? data.toString() : `Status ${res.statusCode}`;
                    reject({ statusCode: res.statusCode, message: msg });
                }
            });
        });
        
        req.on('error', e => reject({ statusCode: 500, message: e.message }));
        req.end();
    });
}

// Helper: 오픈 API 호출 함수 (Fallback)
function fetchFromOpenApi(keyword) {
    return new Promise((resolve, reject) => {
        const apiPath = `/v1/search/blog.json?query=${encodeURIComponent(keyword)}&display=1&sort=sim`;
        const options = {
            hostname: 'openapi.naver.com',
            path: apiPath,
            method: 'GET',
            headers: {
                'X-Naver-Client-Id': OPEN_CLIENT_ID,
                'X-Naver-Client-Secret': OPEN_CLIENT_SECRET
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const parsed = JSON.parse(data);
                        const totalContent = parsed.total || 0;
                        
                        // 추정치 계산
                        const estimatedSearchVolume = totalContent * 3; 
                        const pcRatio = 0.35;

                        const result = {
                            keywordList: [{
                                relKeyword: keyword,
                                monthlyPcQc: Math.floor(estimatedSearchVolume * pcRatio),
                                monthlyMobileQc: Math.floor(estimatedSearchVolume * (1 - pcRatio)),
                                monthlyAvePcClkCnt: 0,
                                monthlyAveMobileClkCnt: 0,
                                compIdx: totalContent > 50000 ? "높음" : totalContent > 10000 ? "중간" : "낮음"
                            }]
                        };

                        const suffix = [" 추천", " 후기", " 가격", " 예약", " 전문"];
                        for(let i=0; i<5; i++) {
                            const subVol = Math.floor(estimatedSearchVolume * (0.8 - i*0.1));
                            result.keywordList.push({
                                relKeyword: keyword + suffix[i],
                                monthlyPcQc: Math.floor(subVol * pcRatio),
                                monthlyMobileQc: Math.floor(subVol * (1 - pcRatio)),
                                compIdx: "중간"
                            });
                        }
                        resolve(result);
                    } catch (e) {
                        reject({ statusCode: 500, message: 'Invalid JSON from Open API' });
                    }
                } else {
                    const msg = data ? data.toString() : `Status ${res.statusCode}`;
                    reject({ statusCode: res.statusCode, message: msg });
                }
            });
        });

        req.on('error', e => reject({ statusCode: 500, message: e.message }));
        req.end();
    });
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
  console.log(`Server is running on port ${PORT}`);
});