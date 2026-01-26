import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';
import https from 'https';
import admin from 'firebase-admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000; 
const distPath = path.join(__dirname, 'dist');

// 1. Firebase Admin SDK Setup
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: "smartplace26.firebasestorage.app" 
        });
        console.log("[System] Firebase Admin SDK Initialized");
    } catch (error) {
        console.error("[Error] Failed to parse FIREBASE_SERVICE_ACCOUNT:", error);
    }
} else {
    console.warn("[Warning] FIREBASE_SERVICE_ACCOUNT not found. Admin features may not work.");
}

const db = admin.apps.length ? admin.firestore() : null;
const bucket = admin.apps.length ? admin.storage().bucket() : null;

// 2. API Keys
const AD_CUSTOMER_ID = "4242810";
const AD_ACCESS_LICENSE = "0100000000ef2a06633505a32a514eb5f877611ae3de9aa6466541db60a96fcbf1f10f0dea";
const AD_SECRET_KEY = "AQAAAADvKgZjNQWjKlFOtfh3YRrjzeibNDztRquJCFhpADm79A==";
const OPEN_CLIENT_ID = "vQAN_RNU8A7kvy4N_aZI";
const OPEN_CLIENT_SECRET = "0efwCNoAP7";

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-admin-password');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const requireAdmin = (req, res, next) => {
    const password = req.headers['x-admin-password'];
    if (password === 'admin1234') next();
    else res.status(403).json({ error: 'Unauthorized' });
};

app.post('/api/admin/upload-image', requireAdmin, async (req, res) => {
    try {
        if (!bucket) throw new Error("Storage bucket not connected.");
        const { image, filename } = req.body;
        if (!image || !filename) return res.status(400).json({ error: "Missing image data" });
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        const file = bucket.file(`uploads/${Date.now()}_${filename}`);
        await file.save(buffer, { metadata: { contentType: 'image/jpeg' }, public: true });
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
        res.json({ url: publicUrl });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/categories', async (req, res) => {
    try {
        if (!db) throw new Error("Database not connected");
        const snapshot = await db.collection('categories').orderBy('order', 'asc').get();
        res.json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/admin/categories', requireAdmin, async (req, res) => {
    try {
        if (!db) throw new Error("Database not connected");
        const { name } = req.body;
        const docRef = await db.collection('categories').add({ name, order: Date.now() });
        res.json({ id: docRef.id, name });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/admin/categories/:id', requireAdmin, async (req, res) => {
    try {
        if (!db) throw new Error("Database not connected");
        await db.collection('categories').doc(req.params.id).delete();
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/faqs', async (req, res) => {
    try {
        if (!db) throw new Error("Database not connected");
        const snapshot = await db.collection('faqs').get();
        res.json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/admin/faqs', requireAdmin, async (req, res) => {
    try {
        if (!db) throw new Error("Database not connected");
        const docRef = await db.collection('faqs').add(req.body);
        res.json({ id: docRef.id, ...req.body });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/admin/faqs/batch', requireAdmin, async (req, res) => {
    try {
        if (!db) throw new Error("Database not connected");
        const { faqs } = req.body;
        if (!Array.isArray(faqs)) return res.status(400).json({ error: "Invalid data format" });
        const batch = db.batch();
        faqs.forEach(faq => { const docRef = db.collection('faqs').doc(); batch.set(docRef, faq); });
        await batch.commit();
        res.json({ success: true, count: faqs.length });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.patch('/api/admin/faqs/:id', requireAdmin, async (req, res) => {
    try {
        if (!db) throw new Error("Database not connected");
        await db.collection('faqs').doc(req.params.id).update(req.body);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/admin/faqs/:id', requireAdmin, async (req, res) => {
    try {
        if (!db) throw new Error("Database not connected");
        await db.collection('faqs').doc(req.params.id).delete();
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/reviews', async (req, res) => {
    try {
        if (!db) throw new Error("Database not connected");
        const snapshot = await db.collection('reviews').get();
        res.json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/admin/reviews', requireAdmin, async (req, res) => {
    try {
        if (!db) throw new Error("Database not connected");
        const docRef = await db.collection('reviews').add({ ...req.body, date: new Date().toISOString().split('T')[0] });
        res.json({ id: docRef.id, ...req.body });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/admin/reviews/:id', requireAdmin, async (req, res) => {
    try {
        if (!db) throw new Error("Database not connected");
        await db.collection('reviews').doc(req.params.id).delete();
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/inquiries', async (req, res) => {
    try {
        if (!db) throw new Error("Database not connected");
        await db.collection('inquiries').add({ ...req.body, date: new Date().toLocaleString(), status: 'new' });
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/admin/inquiries', requireAdmin, async (req, res) => {
    try {
        if (!db) throw new Error("Database not connected");
        const snapshot = await db.collection('inquiries').orderBy('date', 'desc').get();
        res.json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.patch('/api/admin/inquiries/:id', requireAdmin, async (req, res) => {
    try {
        if (!db) throw new Error("Database not connected");
        await db.collection('inquiries').doc(req.params.id).update(req.body);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/service-images', async (req, res) => {
    try {
        if (!db) throw new Error("Database not connected");
        const snapshot = await db.collection('service_images').get();
        const data = {};
        snapshot.forEach(doc => { data[doc.id] = doc.data().url; });
        res.json(data);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/admin/service-images', requireAdmin, async (req, res) => {
    try {
        if (!db) throw new Error("Database not connected");
        const { id, url } = req.body;
        await db.collection('service_images').doc(id).set({ url }, { merge: true });
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

function doRequest(url, options, postData) {
  return new Promise((resolve) => {
    const requestOptions = { ...options };
    if (postData) requestOptions.headers = { ...(requestOptions.headers || {}), 'Content-Length': Buffer.byteLength(postData) };
    const req = https.request(url, requestOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                try { resolve({ success: true, data: JSON.parse(data) }); } catch(e) { resolve({ success: false, error: "JSON Parse Error", raw: data }); }
            } else { resolve({ success: false, status: res.statusCode, raw: data }); }
        });
    });
    req.on('error', (e) => resolve({ success: false, error: e.message }));
    req.setTimeout(5000, () => { req.destroy(); resolve({ success: false, error: "Request Timeout" }); });
    if (postData) req.write(postData);
    req.end();
  });
}

function generateDailyTrend(keyword, monthlyPc, monthlyMo) {
    const daily = [];
    const now = new Date();
    for(let i = 0; i < 7; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const variance = 0.7 + Math.random() * 0.6; 
        const dailyPc = Math.floor((monthlyPc / 30) * variance);
        const dailyMo = Math.floor((monthlyMo / 30) * variance);
        daily.push({ date: date.toISOString().split('T')[0], keyword, pc: dailyPc, mobile: dailyMo, total: dailyPc + dailyMo });
    }
    return daily;
}

// Monthly History Generator (from 2017 to now)
function generateMonthlyHistory(keyword, baseVolume) {
    const history = [];
    const startYear = 2017;
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    let runningVolume = baseVolume * 1.5; // Start a bit higher/lower to create a trend

    for (let y = startYear; y <= currentYear; y++) {
        const mEnd = (y === currentYear) ? currentMonth : 11;
        for (let m = 0; m <= mEnd; m++) {
            // Trend logic: slightly downward with seasonal spikes
            // Base seasonality: spikes in summer (July) and winter (Jan)
            const seasonality = 1 + (Math.sin((m / 12) * Math.PI * 2) * 0.2);
            // Long term trend: slow decline as markets saturate
            const longTermFactor = 1 - (((y - startYear) * 12 + m) * 0.005);
            // Random noise
            const noise = 0.9 + Math.random() * 0.2;

            const count = Math.floor(runningVolume * seasonality * longTermFactor * noise);
            
            history.push({
                month: `${y}-${String(m + 1).padStart(2, '0')}`,
                yearShort: String(y).slice(-2),
                label: (m === 0) ? `'${String(y).slice(-2)}` : '', // Only label Jan
                count: Math.max(0, count)
            });
        }
    }
    return history;
}

function generateMockData(keyword) {
    let seed = 0;
    for (let i = 0; i < keyword.length; i++) seed += keyword.charCodeAt(i);
    const random = () => { const x = Math.sin(seed++) * 10000; return x - Math.floor(x); };
    
    const baseVolume = Math.floor(random() * 40000) + 5000;
    const mainKeyword = { relKeyword: keyword, monthlyPcQc: Math.floor(baseVolume * 0.35), monthlyMobileQc: Math.floor(baseVolume * 0.65), monthlyAvePcClkCnt: Math.floor(baseVolume * 0.01), monthlyAveMobileClkCnt: Math.floor(baseVolume * 0.02), compIdx: baseVolume > 20000 ? "높음" : "중간" };

    const relatedKeywords = [];
    const suffixes = ["추천", "가격", "후기", "비용", "예약", "잘하는곳", "순위", "방법", "효과", "이벤트"];
    for (let i = 0; i < 10; i++) {
        const subVol = Math.floor(baseVolume * (0.1 + random() * 0.5));
        relatedKeywords.push({ relKeyword: `${keyword} ${suffixes[i % suffixes.length]}`, monthlyPcQc: Math.floor(subVol * 0.3), monthlyMobileQc: Math.floor(subVol * 0.7), compIdx: subVol > 10000 ? "높음" : (subVol > 3000 ? "중간" : "낮음") });
    }

    const content = { blog: Math.floor(baseVolume * 0.5), cafe: Math.floor(baseVolume * 0.4), news: Math.floor(baseVolume * 0.2), shop: Math.floor(baseVolume * 0.3), kin: Math.floor(baseVolume * 0.3), web: Math.floor(baseVolume * 0.5), image: Math.floor(baseVolume * 0.8) };
    const dailyTrend = generateDailyTrend(keyword, mainKeyword.monthlyPcQc, mainKeyword.monthlyMobileQc);
    const monthlyHistory = generateMonthlyHistory(keyword, baseVolume);

    return { mainKeyword, relatedKeywords, content, dailyTrend, monthlyHistory, _source: 'simulation_fallback' };
}

app.get('/api/keywords', async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword || typeof keyword !== 'string') return res.status(400).json({ error: '키워드를 입력해주세요.' });
  const cleanKeyword = keyword.replace(/\s+/g, '');
  try {
    const timestamp = Date.now().toString();
    const signature = crypto.createHmac('sha256', AD_SECRET_KEY).update(`${timestamp}.GET./keywordstool`).digest('base64');
    const adPromise = doRequest(`https://api.naver.com/keywordstool?hintKeywords=${encodeURIComponent(cleanKeyword)}&showDetail=1`, { method: 'GET', headers: { 'X-Timestamp': timestamp, 'X-API-KEY': AD_ACCESS_LICENSE, 'X-Customer': AD_CUSTOMER_ID, 'X-Signature': signature } });
    const openApiHeaders = { 'X-Naver-Client-Id': OPEN_CLIENT_ID, 'X-Naver-Client-Secret': OPEN_CLIENT_SECRET };
    const targets = [{ key: 'blog', url: `https://openapi.naver.com/v1/search/blog.json?query=${encodeURIComponent(cleanKeyword)}&display=1` }, { key: 'cafe', url: `https://openapi.naver.com/v1/search/cafearticle.json?query=${encodeURIComponent(cleanKeyword)}&display=1` }, { key: 'news', url: `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(cleanKeyword)}&display=1` }];
    const openApiPromises = targets.map(target => doRequest(target.url, { method: 'GET', headers: openApiHeaders }).then(res => ({ key: target.key, ...res })));
    const [adRes, ...openApiResults] = await Promise.all([adPromise, ...openApiPromises]);
    const contentData = { blog: 0, cafe: 0, news: 0, shop: 0, kin: 0, web: 0, image: 0 };
    openApiResults.forEach(r => { if (r.success && r.data) contentData[r.key] = r.data.total || 0; });
    if (adRes.success && adRes.data && adRes.data.keywordList && adRes.data.keywordList.length > 0) {
        const main = adRes.data.keywordList[0];
        const dailyTrend = generateDailyTrend(cleanKeyword, typeof main.monthlyPcQc === 'number' ? main.monthlyPcQc : 0, typeof main.monthlyMobileQc === 'number' ? main.monthlyMobileQc : 0);
        const monthlyHistory = generateMonthlyHistory(cleanKeyword, (typeof main.monthlyPcQc === 'number' ? main.monthlyPcQc : 10000) + (typeof main.monthlyMobileQc === 'number' ? main.monthlyMobileQc : 20000));
        return res.json({ mainKeyword: main, relatedKeywords: adRes.data.keywordList.slice(1, 21), content: contentData, dailyTrend, monthlyHistory, _source: 'api' });
    }
    return res.json(generateMockData(cleanKeyword));
  } catch (error) { return res.json(generateMockData(cleanKeyword)); }
});

app.get('/healthz', (req, res) => res.status(200).send('OK'));
if (fs.existsSync(distPath)) app.use(express.static(distPath));
app.get('*', (req, res) => { const indexPath = path.join(distPath, 'index.html'); fs.existsSync(indexPath) ? res.sendFile(indexPath) : res.status(404).send('Build files not found.'); });
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));