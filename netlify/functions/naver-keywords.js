import crypto from 'crypto';
import https from 'https';

const AD_CUSTOMER_ID = "4242810";
const AD_ACCESS_LICENSE = "0100000000ef2a06633505a32a514eb5f877611ae3de9aa6466541db60a96fcbf1f10f0dea";
const AD_SECRET_KEY = "AQAAAADvKgZjNQWjKlFOtfh3YRrjzeibNDztRquJCFhpADm79A==";

const OPEN_CLIENT_ID = "vQAN_RNU8A7kvy4N_aZI";
const OPEN_CLIENT_SECRET = "0efwCNoAP7";

// Simple fetch wrapper to avoid axios dependency issues in some lambda environments
function doRequest(url, options, postData) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                try { resolve(JSON.parse(data)); } catch(e) { reject(e); }
            } else {
                reject({ statusCode: res.statusCode, message: data });
            }
        });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  const keyword = event.queryStringParameters?.keyword;
  if (!keyword) return { statusCode: 400, headers, body: JSON.stringify({ error: '키워드 누락' }) };

  const cleanKeyword = keyword.replace(/\s+/g, '');

  // 1. Try Ad API
  try {
    const timestamp = Date.now().toString();
    const signature = crypto.createHmac('sha256', AD_SECRET_KEY).update(`${timestamp}.GET./keywordstool`).digest('base64');
    
    const adData = await doRequest(`https://api.naver.com/keywordstool?hintKeywords=${encodeURIComponent(cleanKeyword)}&showDetail=1`, {
        method: 'GET',
        headers: {
            'X-Timestamp': timestamp,
            'X-API-KEY': AD_ACCESS_LICENSE,
            'X-Customer': AD_CUSTOMER_ID,
            'X-Signature': signature
        }
    });
    return { statusCode: 200, headers, body: JSON.stringify({ ...adData, _source: 'ad_api' }) };

  } catch (adError) {
    console.log("Ad API Fail:", adError);
    
    // 2. Try Open API (Blog)
    try {
        const blogData = await doRequest(`https://openapi.naver.com/v1/search/blog.json?query=${encodeURIComponent(cleanKeyword)}&display=1&sort=sim`, {
            method: 'GET',
            headers: {
                'X-Naver-Client-Id': OPEN_CLIENT_ID,
                'X-Naver-Client-Secret': OPEN_CLIENT_SECRET
            }
        });
        
        const total = blogData.total || 0;
        const fallbackData = {
            keywordList: [{
                relKeyword: cleanKeyword,
                monthlyPcQc: Math.floor(total * 0.8),
                monthlyMobileQc: Math.floor(total * 1.2),
                compIdx: total > 50000 ? "높음" : "중간"
            }],
            _source: 'open_api',
            meta: { blogTotal: total }
        };
        
        return { statusCode: 200, headers, body: JSON.stringify(fallbackData) };
        
    } catch (openError) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'API 호출 실패',
                details: `1차(광고API): ${adError.statusCode || 'Err'}, 2차(오픈API): ${openError.statusCode || 'Err'}`
            })
        };
    }
  }
};