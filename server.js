import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8001; 

const distPath = path.join(__dirname, 'dist');
app.use(express.json());

app.get('/healthz', (req, res) => res.status(200).send('OK'));

if (fs.existsSync(distPath)) {
  // Add simple cache headers for static assets
  app.use(express.static(distPath, {
    maxAge: '1d', // Cache static assets for 1 day
    setHeaders: (res, path) => {
      if (path.endsWith('.html')) {
        // No cache for index.html to ensure updates are seen immediately
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  }));
}

app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send('Server Error: index.html not found. Please run "npm run build" first.');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});