import crypto from 'crypto';
import https from 'https';

// 네이버 광고 API 키 설정
const CUSTOMER_ID = "4242810";
const ACCESS_LICENSE = "0100000000ef2a06633505a32a514eb5f877611ae3de9aa6466541db60a96fcbf1f10f0dea";
const SECRET_KEY = "AQAAAADvKgZjNQWjKlFOtfh3YRrjzeibNDztRquJCFhpADm79A==";

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const keyword = event.queryStringParameters?.keyword;
    if (!keyword) {
      return { 
        statusCode: 400, 
        headers, 
        body: JSON.stringify({ error: '키워드가 필요합니다.' }) 
      };
    }

    const timestamp = Date.now().toString();
    const method = "GET";
    const uri = "/keywordstool";
    const message = `${timestamp}.${method}.${uri}`;
    
    const signature = crypto.createHmac('sha256', SECRET_KEY)
      .update(message)
      .digest('base64');

    // 공백 제거 (네이버 API 권장사항)
    const cleanKeyword = keyword.replace(/\s+/g, '');
    
    // Node.js native https 모듈 사용 (Header Casing 보존을 위해)
    const doRequest = () => new Promise((resolve, reject) => {
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

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
      });

      req.on('error', (e) => reject(e));
      req.end();
    });

    const response = await doRequest();

    if (response.statusCode !== 200) {
       console.error(`Naver API Error: ${response.statusCode} ${response.body}`);
       return {
         statusCode: response.statusCode,
         headers,
         body: JSON.stringify({ 
           error: 'Naver API Error', 
           details: response.body,
           status: response.statusCode
         })
       };
    }

    const data = JSON.parse(response.body);
    
    // 데이터 검증 및 기본값 처리
    if (!data.keywordList || data.keywordList.length === 0) {
      // 키워드는 유효하지만 데이터가 없는 경우 (검색량이 너무 적거나 신규 키워드)
       return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
           keywordList: [{
               relKeyword: cleanKeyword,
               monthlyPcQc: 0,
               monthlyMobileQc: 0,
               monthlyAvePcClkCnt: 0,
               monthlyAveMobileClkCnt: 0,
               compIdx: "낮음"
           }]
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error("Server Function Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal Server Error', 
        details: error.message 
      })
    };
  }
};