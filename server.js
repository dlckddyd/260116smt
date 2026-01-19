import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import crypto from 'crypto';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Cloudtype 등의 배포 환경에서는 process.env.PORT가 자동으로 주입됩니다.
const PORT = process.env.PORT || 3000;

console.log('-----------------------------------');
console.log(`Starting Node.js Server...`);
console.log(`Environment PORT: ${process.env.PORT}`);
console.log(`Resolved PORT: ${PORT}`);
console.log(`Current Directory: ${__dirname}`);
console.log('-----------------------------------');

const distPath = path.join(__dirname, 'dist');

// 미들웨어 설정
app.use(express.json());

// 정적 파일 제공 (빌드된 리액트 파일)
if (fs.existsSync(distPath)) {
  console.log(`Serving static files from: ${distPath}`);
  app.use(express.static(distPath));
} else {
  console.error('CRITICAL WARNING: "dist" folder not found. Make sure "npm run build" was executed.');
}

// Health Check (클라우드타입 Health Check용)
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// 네이버 광고 API 설정
const CUSTOMER_ID = "4242810";
const ACCESS_LICENSE = "0100000000ef2a06633505a32a514eb5f877611ae3de9aa6466541db60a96fcbf1f10f0dea";
const SECRET_KEY = "AQAAAADvKgZjNQWjKlFOtfh3YRrjzeibNDztRquJCFhpADm79A==";

// API: 네이버 키워드 검색
app.get('/api/naver-keywords', async (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ error: '키워드가 필요합니다.' });
  }

  try {
    const timestamp = Date.now().toString();
    const method = "GET";
    const uri = "/keywordstool";
    const message = `${timestamp}.${method}.${uri}`;
    
    const signature = crypto.createHmac('sha256', SECRET_KEY)
      .update(message)
      .digest('base64');

    const cleanKeyword = keyword.replace(/\s+/g, '');
    
    const options = {
      hostname: 'api.naver.com',
      path: `${uri}?hintKeywords=${encodeURIComponent(cleanKeyword)}&showDetail=1`,
      method: 'GET',
      headers: {
        'X-Timestamp': timestamp,
        'X-API-KEY': ACCESS_LICENSE,
        'X-Customer': CUSTOMER_ID,
        'X-Signature': signature,
        'Content-Type': 'application/json'
      }
    };

    const doRequest = () => new Promise((resolve, reject) => {
      const apiReq = https.request(options, (apiRes) => {
        let data = '';
        apiRes.on('data', (chunk) => data += chunk);
        apiRes.on('end', () => resolve({ statusCode: apiRes.statusCode, body: data }));
      });
      apiReq.on('error', (e) => reject(e));
      apiReq.end();
    });

    const response = await doRequest();
    
    // 네이버 API 응답 처리
    if (response.statusCode !== 200) {
       console.error(`Naver API Error: ${response.statusCode}`);
       return res.status(response.statusCode).json({ error: 'API Error', details: response.body });
    }

    const data = JSON.parse(response.body);
    
    // 검색 결과가 없거나 적을 경우 기본값 반환
    if (!data.keywordList || data.keywordList.length === 0) {
       return res.json({
           keywordList: [{
               relKeyword: cleanKeyword,
               monthlyPcQc: 0,
               monthlyMobileQc: 0,
               monthlyAvePcClkCnt: 0,
               monthlyAveMobileClkCnt: 0,
               compIdx: "낮음"
           }]
        });
    }

    res.json(data);

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// SPA 라우팅 처리 (모든 요청을 index.html로)
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send('Server Error: index.html not found. Build failed?');
  }
});

// 서버 시작 (0.0.0.0 바인딩 중요)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});