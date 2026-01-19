import crypto from 'crypto';

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

    // 네이버 API 필수 헤더 생성 (가이드 준수)
    // 1. 타임스탬프 (밀리초 단위)
    const timestamp = Date.now().toString();
    
    // 2. 서명 생성
    // 서명 대상 문자열: timestamp + "." + method + "." + uri
    const method = "GET";
    const uri = "/keywordstool";
    const message = `${timestamp}.${method}.${uri}`;
    
    // 비밀키를 사용하여 HMAC-SHA256 해시 생성 후 Base64 인코딩
    const signature = crypto.createHmac('sha256', SECRET_KEY)
      .update(message)
      .digest('base64');

    console.log(`[API Call] Keyword: ${keyword}, Timestamp: ${timestamp}`);

    // 3. API 요청 (Node.js 18+ 내장 fetch 사용)
    // 주의: hintKeywords는 반드시 URL 인코딩 되어야 함
    const apiUrl = `https://api.naver.com${uri}?hintKeywords=${encodeURIComponent(keyword.replace(/\s+/g, ''))}&showDetail=1`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        "X-Timestamp": timestamp,
        "X-API-KEY": ACCESS_LICENSE,
        "X-Customer": CUSTOMER_ID,
        "X-Signature": signature,
        "Content-Type": "application/json" // 명시적 헤더 추가
      }
    });

    // 응답 상태 확인
    if (!response.ok) {
       const errorText = await response.text();
       console.error(`[Naver API Error] Status: ${response.status}, Body: ${errorText}`);
       
       // 네이버 에러 메시지를 그대로 전달
       return {
         statusCode: response.status,
         headers,
         body: JSON.stringify({ 
           error: 'Naver API Error', 
           details: errorText,
           status: response.status
         })
       };
    }

    const data = await response.json();
    console.log(`[API Success] Data received. KeywordList length: ${data.keywordList?.length || 0}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error("[Server Function Error]", error);
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