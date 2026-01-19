import axios from "axios";
import CryptoJS from "crypto-js";

// 네이버 광고 API 키 설정
const CUSTOMER_ID = "4242810";
const ACCESS_LICENSE = "0100000000ef2a06633505a32a514eb5f877611ae3de9aa6466541db60a96fcbf1f10f0dea";
const SECRET_KEY = "AQAAAADvKgZjNQWjKlFOtfh3YRrjzeibNDztRquJCFhpADm79A==";

export const handler = async function(event, context) {
  // CORS 헤더 설정 (모든 도메인 허용)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // OPTIONS 요청 처리 (Preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
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
    
    // 네이버 API 서명 생성 (HMAC-SHA256)
    const message = `${timestamp}.${method}.${uri}`;
    const signature = CryptoJS.HmacSHA256(message, SECRET_KEY).toString(CryptoJS.enc.Base64);

    // 네이버 광고 API 호출
    const response = await axios.get(`https://api.naver.com${uri}`, {
      params: {
        hintKeywords: keyword,
        showDetail: 1
      },
      headers: {
        "X-Timestamp": timestamp,
        "X-API-KEY": ACCESS_LICENSE,
        "X-Customer": CUSTOMER_ID,
        "X-Signature": signature
      }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.data)
    };

  } catch (error) {
    console.error("Naver API Error Details:", error.response?.data || error.message);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: '데이터를 가져오는데 실패했습니다.', 
        details: error.response?.data || error.message 
      })
    };
  }
};