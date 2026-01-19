const functions = require("firebase-functions");
const axios = require("axios");
const CryptoJS = require("crypto-js");

// 네이버 광고 API 키 설정
const CUSTOMER_ID = "4242810";
const ACCESS_LICENSE = "0100000000ef2a06633505a32a514eb5f877611ae3de9aa6466541db60a96fcbf1f10f0dea";
const SECRET_KEY = "AQAAAADvKgZjNQWjKlFOtfh3YRrjzeibNDztRquJCFhpADm79A==";

exports.getNaverKeywords = functions.region('asia-northeast3').https.onCall(async (data, context) => {
  const keyword = data.keyword;
  
  if (!keyword) {
    throw new functions.https.HttpsError('invalid-argument', '키워드가 필요합니다.');
  }

  try {
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

    return response.data;

  } catch (error) {
    console.error("Naver API Error", error);
    // 에러 발생 시 상세 정보 반환 (디버깅용)
    const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
    throw new functions.https.HttpsError('internal', '네이버 API 호출 실패', errorMsg);
  }
});