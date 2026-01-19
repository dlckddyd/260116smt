import { createHmac } from 'node:crypto';

// 네이버 광고 API 키 설정
const CUSTOMER_ID = "4242810";
const ACCESS_LICENSE = "0100000000ef2a06633505a32a514eb5f877611ae3de9aa6466541db60a96fcbf1f10f0dea";
const SECRET_KEY = "AQAAAADvKgZjNQWjKlFOtfh3YRrjzeibNDztRquJCFhpADm79A==";

export const handler = async (event) => {
  // CORS 헤더 설정
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Preflight 요청 처리
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
    
    // 1. 네이버 API 서명 생성 (Node.js 내장 crypto 사용 - 라이브러리 의존성 제거)
    const message = `${timestamp}.${method}.${uri}`;
    const signature = createHmac('sha256', SECRET_KEY)
      .update(message)
      .digest('base64');

    // 2. API 요청 (Node.js 내장 fetch 사용)
    const apiUrl = `https://api.naver.com${uri}?hintKeywords=${encodeURIComponent(keyword)}&showDetail=1`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        "X-Timestamp": timestamp,
        "X-API-KEY": ACCESS_LICENSE,
        "X-Customer": CUSTOMER_ID,
        "X-Signature": signature
      }
    });

    if (!response.ok) {
       const errorText = await response.text();
       console.error(`Naver API Error: ${response.status} ${errorText}`);
       throw new Error(`Naver API responded with status ${response.status}`);
    }

    const data = await response.json();

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
        error: '데이터를 가져오는 중 서버 오류가 발생했습니다.', 
        details: error.message 
      })
    };
  }
};