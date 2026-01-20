const functions = require("firebase-functions");
const axios = require("axios");
const CryptoJS = require("crypto-js");

const AD_CUSTOMER_ID = "4242810";
const AD_ACCESS_LICENSE = "0100000000ef2a06633505a32a514eb5f877611ae3de9aa6466541db60a96fcbf1f10f0dea";
const AD_SECRET_KEY = "AQAAAADvKgZjNQWjKlFOtfh3YRrjzeibNDztRquJCFhpADm79A==";

const OPEN_CLIENT_ID = "vQAN_RNU8A7kvy4N_aZI";
const OPEN_CLIENT_SECRET = "0efwCNoAP7";

exports.getNaverKeywords = functions.region('asia-northeast3').https.onCall(async (data, context) => {
  const keyword = data.keyword;
  if (!keyword) {
    throw new functions.https.HttpsError('invalid-argument', '키워드가 필요합니다.');
  }

  try {
    // 1. Try Ad API
    const timestamp = Date.now().toString();
    const signature = CryptoJS.HmacSHA256(`${timestamp}.GET./keywordstool`, AD_SECRET_KEY).toString(CryptoJS.enc.Base64);

    const adResponse = await axios.get(`https://api.naver.com/keywordstool`, {
      params: { hintKeywords: keyword, showDetail: 1 },
      headers: {
        "X-Timestamp": timestamp,
        "X-API-KEY": ACCESS_LICENSE,
        "X-Customer": CUSTOMER_ID,
        "X-Signature": signature
      }
    });

    return { ...adResponse.data, _source: 'ad_api' };

  } catch (adError) {
    console.warn("Ad API Failed, switching to Open API", adError.message);

    try {
      // 2. Try Open API (Blog)
      const blogResponse = await axios.get('https://openapi.naver.com/v1/search/blog.json', {
        params: { query: keyword, display: 1, sort: 'sim' },
        headers: {
            'X-Naver-Client-Id': OPEN_CLIENT_ID,
            'X-Naver-Client-Secret': OPEN_CLIENT_SECRET
        }
      });
      
      const total = blogResponse.data.total || 0;
      // Simple fallback data structure
      return {
        keywordList: [{
           relKeyword: keyword,
           monthlyPcQc: Math.floor(total * 0.8),
           monthlyMobileQc: Math.floor(total * 1.5),
           compIdx: total > 10000 ? '높음' : '중간'
        }],
        _source: 'open_api',
        meta: { blogTotal: total }
      };

    } catch (openError) {
       console.error("All APIs Failed", openError);
       throw new functions.https.HttpsError('internal', '모든 네이버 API 호출에 실패했습니다.', openError.message);
    }
  }
});