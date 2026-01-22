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
            storageBucket: "smartplace26.firebasestorage.app" // Bucket name is required for storage operations
        });
        console.log("[System] Firebase Admin SDK Initialized");
    } catch (error) {
        console.error("[Error] Failed to parse FIREBASE_SERVICE_ACCOUNT:", error);
    }
} else {
    console.warn("[Warning] FIREBASE_SERVICE_ACCOUNT not found. Admin features may not work.");
}

const db = admin.apps.length ? admin.firestore() : null;
// Initialize bucket safely
const bucket = admin.apps.length ? admin.storage().bucket() : null;

// 2. API Keys
const AD_CUSTOMER_ID = "4242810";
const AD_ACCESS_LICENSE = "0100000000ef2a06633505a32a514eb5f877611ae3de9aa6466541db60a96fcbf1f10f0dea";
const AD_SECRET_KEY = "AQAAAADvKgZjNQWjKlFOtfh3YRrjzeibNDztRquJCFhpADm79A==";
const OPEN_CLIENT_ID = "vQAN_RNU8A7kvy4N_aZI";
const OPEN_CLIENT_SECRET = "0efwCNoAP7";

// Increase payload limit for base64 image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-admin-password');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Admin Auth Middleware
const requireAdmin = (req, res, next) => {
    const password = req.headers['x-admin-password'];
    if (password === 'admin1234') next();
    else res.status(403).json({ error: 'Unauthorized' });
};

// --- Server-Side Image Upload (Bypasses Client Auth) ---
app.post('/api/admin/upload-image', requireAdmin, async (req, res) => {
    try {
        if (!bucket) throw new Error("Storage bucket not connected. Check server logs.");
        
        const { image, filename } = req.body; // image is base64 string
        if (!image || !filename) return res.status(400).json({ error: "Missing image data" });

        // Remove header if present (e.g., "data:image/png;base64,")
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        
        const file = bucket.file(`uploads/${Date.now()}_${filename}`);
        
        await file.save(buffer, {
            metadata: { contentType: 'image/jpeg' }, // Defaulting to jpeg for simplicity, or detect from header
            public: true, // Make the file publicly accessible
        });

        // Get public URL
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
        
        res.json({ url: publicUrl });
    } catch (e) {
        console.error("Upload Error:", e);
        res.status(500).json({ error: e.message });
    }
});

// --- Database API Endpoints ---

// Categories
app.get('/api/categories', async (req, res) => {
    try {
        if (!db) throw new Error("Database not connected");
        const snapshot = await db.collection('categories').orderBy('order', 'asc').get();
        // If no categories exist, we might return empty array. Client handles defaults.
        res.json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/admin/categories', requireAdmin, async (req, res) => {
    try {
        if (!db) throw new Error("Database not connected");
        const { name } = req.body;
        // Simple order handling: put at the end
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

// FAQs
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

// Reviews
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

// Inquiries
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

// Service Images
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

// Keyword Analysis API Helper
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

// Generate Daily Trend Data (Simulation based on monthly volume)
function generateDailyTrend(keyword, monthlyPc, monthlyMo) {
    const daily = [];
    const now = new Date();
    
    // Create 7 days of history
    for(let i = 0; i < 7; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        // Random daily fluctuation (0.7 to 1.3 of average daily)
        const variance = 0.7 + Math.random() * 0.6; 
        
        const dailyPc = Math.floor((monthlyPc / 30) * variance);
        const dailyMo = Math.floor((monthlyMo / 30) * variance);
        
        daily.push({
            date: date.toISOString().split('T')[0], // YYYY-MM-DD
            keyword: keyword,
            pc: dailyPc,
            mobile: dailyMo,
            total: dailyPc + dailyMo
        });
    }
    return daily;
}

// Robust Mock Data Generator for Fallback
function generateMockData(keyword) {
    let seed = 0;
    for (let i = 0; i < keyword.length; i++) seed += keyword.charCodeAt(i);
    const random = () => { const x = Math.sin(seed++) * 10000; return x - Math.floor(x); };
    
    // Generate Main Keyword
    const baseVolume = Math.floor(random() * 40000) + 5000;
    const isHighComp = baseVolume > 20000;
    const mainKeyword = {
        relKeyword: keyword,
        monthlyPcQc: Math.floor(baseVolume * 0.35),
        monthlyMobileQc: Math.floor(baseVolume * 0.65),
        monthlyAvePcClkCnt: Math.floor(baseVolume * 0.01),
        monthlyAveMobileClkCnt: Math.floor(baseVolume * 0.02),
        compIdx: isHighComp ? "높음" : "중간"
    };

    // Generate Related Keywords
    const relatedKeywords = [];
    const suffixes = ["추천", "가격", "후기", "비용", "예약", "잘하는곳", "순위", "방법", "효과", "이벤트"];
    for (let i = 0; i < 10; i++) {
        const subVol = Math.floor(baseVolume * (0.1 + random() * 0.5));
        relatedKeywords.push({
            relKeyword: `${keyword} ${suffixes[i % suffixes.length]}`,
            monthlyPcQc: Math.floor(subVol * 0.3),
            monthlyMobileQc: Math.floor(subVol * 0.7),
            monthlyAvePcClkCnt: Math.floor(subVol * 0.01),
            monthlyAveMobileClkCnt: Math.floor(subVol * 0.02),
            compIdx: subVol > 10000 ? "높음" : (subVol > 3000 ? "중간" : "낮음")
        });
    }

    const content = { blog: Math.floor(baseVolume * 0.5), cafe: Math.floor(baseVolume * 0.4), news: Math.floor(baseVolume * 0.2), shop: Math.floor(baseVolume * 0.3), kin: Math.floor(baseVolume * 0.3), web: Math.floor(baseVolume * 0.5), image: Math.floor(baseVolume * 0.8) };
    
    // Generate Daily Trend based on Main Keyword Volume
    const dailyTrend = generateDailyTrend(keyword, mainKeyword.monthlyPcQc, mainKeyword.monthlyMobileQc);

    return { mainKeyword, relatedKeywords, content, dailyTrend, _source: 'simulation_fallback' };
}

app.get('/api/keywords', async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword || typeof keyword !== 'string') return res.status(400).json({ error: '키워드를 입력해주세요.' });
  const cleanKeyword = keyword.replace(/\s+/g, '');
  
  try {
    const timestamp = Date.now().toString();
    const signature = crypto.createHmac('sha256', AD_SECRET_KEY).update(`${timestamp}.GET./keywordstool`).digest('base64');
    
    const adPromise = doRequest(`https://api.naver.com/keywordstool?hintKeywords=${encodeURIComponent(cleanKeyword)}&showDetail=1`, {
        method: 'GET',
        headers: { 'X-Timestamp': timestamp, 'X-API-KEY': AD_ACCESS_LICENSE, 'X-Customer': AD_CUSTOMER_ID, 'X-Signature': signature }
    });

    const openApiHeaders = { 'X-Naver-Client-Id': OPEN_CLIENT_ID, 'X-Naver-Client-Secret': OPEN_CLIENT_SECRET };
    const targets = [
        { key: 'blog', url: `https://openapi.naver.com/v1/search/blog.json?query=${encodeURIComponent(cleanKeyword)}&display=1` },
        { key: 'cafe', url: `https://openapi.naver.com/v1/search/cafearticle.json?query=${encodeURIComponent(cleanKeyword)}&display=1` },
        { key: 'news', url: `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(cleanKeyword)}&display=1` },
    ];
    const openApiPromises = targets.map(target => doRequest(target.url, { method: 'GET', headers: openApiHeaders }).then(res => ({ key: target.key, ...res })));

    const [adRes, ...openApiResults] = await Promise.all([adPromise, ...openApiPromises]);
    const contentData = { blog: 0, cafe: 0, news: 0, shop: 0, kin: 0, web: 0, image: 0 };
    openApiResults.forEach(r => { if (r.success && r.data) contentData[r.key] = r.data.total || 0; });

    if (adRes.success && adRes.data && adRes.data.keywordList && adRes.data.keywordList.length > 0) {
        const main = adRes.data.keywordList[0];
        // Generate daily trend for the real data too (since API doesn't provide daily breakdown)
        const dailyTrend = generateDailyTrend(cleanKeyword, 
            typeof main.monthlyPcQc === 'number' ? main.monthlyPcQc : 0, 
            typeof main.monthlyMobileQc === 'number' ? main.monthlyMobileQc : 0
        );
        
        return res.json({ 
            mainKeyword: main, 
            relatedKeywords: adRes.data.keywordList.slice(1, 21), 
            content: contentData, 
            dailyTrend: dailyTrend,
            _source: 'api' 
        });
    }
    // If API fails or returns empty, use robust mock data
    console.log("Using Mock Data for keywords due to API limit/error");
    return res.json(generateMockData(cleanKeyword));
  } catch (error) {
    console.error("[Server Error]", error);
    return res.json(generateMockData(cleanKeyword));
  }
});

// Health Check & Serve React
app.get('/healthz', (req, res) => res.status(200).send('OK'));
if (fs.existsSync(distPath)) app.use(express.static(distPath));
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  fs.existsSync(indexPath) ? res.sendFile(indexPath) : res.status(404).send('Build files not found.');
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));