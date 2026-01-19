import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import crypto from 'crypto';
import fs from 'fs'; // 파일 시스템 모듈 추가

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 디버깅을 위한 로그 출력
console.log('Starting server...');
console.log('Current directory:', __dirname);
const distPath = path.join(__dirname, 'dist');
console.log('Dist directory path:', distPath);
console.log('Dist directory exists:', fs.existsSync(distPath));

// 미들웨어 설정
app.use(express.json());

// 정적 파일 제공 (dist 폴더가 있을 때만)
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
} else {
  console.error('CRITICAL ERROR: "dist" folder not found. Build might have failed.');
}

// Health Check (클라우드타입 등 배포 환경용)
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// 네이버 광고 API 키 설정
const CUSTOMER_ID = "4242810";
const ACCESS_LICENSE = "0100000000ef2a06633505a32a514eb5f877611ae3de9aa6466541db60a96fcbf1f10f0dea";
const SECRET_KEY = "AQAAAADvKgZjNQWjKlFOtfh3YRrjzeibNDztRquJCFhpADm79A==";

// API 라우트: 네이버 키워드 검색
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
    
    // Node.js native https 모듈 사용 (Header 대소문자 유지)
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

    if (response.statusCode !== 200) {
       console.error(`Naver API Error: ${response.statusCode} ${response.body}`);
       return res.status(response.statusCode).json({ 
           error: 'Naver API Error', 
           details: response.body 
       });
    }

    const data = JSON.parse(response.body);
    
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

// 모든 기타 요청 처리
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // 빌드 실패 시 보여줄 에러 페이지
    res.status(500).send(`
      <h1>Server Error: Build Artifacts Missing</h1>
      <p>The 'dist/index.html' file was not found.</p>
      <p>This usually means 'npm run build' failed or didn't run.</p>
      <p>Current directory: ${__dirname}</p>
    `);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});