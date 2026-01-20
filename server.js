import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8001; 

const distPath = path.join(__dirname, 'dist');

// Middleware
app.use(express.json());

// Cloudtype Health Check (Critical for deployment success)
app.get('/healthz', (req, res) => res.status(200).send('OK'));

// Serve Static Files
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    maxAge: '1d',
    setHeaders: (res, path) => {
      // Don't cache index.html to ensure updates happen immediately
      if (path.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  }));
} else {
  console.error("CRITICAL ERROR: 'dist' folder not found. Build likely failed.");
}

// SPA Routing (Catch-all)
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // If index.html is missing, the build definitely failed.
    res.status(500).send('Deployment Error: App build files not found. Please check build logs.');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving files from: ${distPath}`);
});