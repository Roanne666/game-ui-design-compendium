// Take screenshots of all 10 style showcase files using puppeteer
// Usage: node tools/shoot.js

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '..');
const styles = [
  'cyberpunk', 'dark-fantasy', 'scifi-space', 'pixel-retro', 'hand-drawn',
  'cartoon-comic', 'survival-horror', 'anime-colorful', 'tactical-military', 'synthwave-neon'
];
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function shootOne(browser, url, out, h = 800) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1280, height: h });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 10000 });
    await new Promise(r => setTimeout(r, 200));
    await page.screenshot({ path: out, type: 'png' });
  } finally {
    await page.close();
  }
}

(async () => {
  if (!fs.existsSync(CHROME)) {
    console.error('Chrome not found at', CHROME);
    process.exit(1);
  }
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
  });
  try {
    for (const s of styles) {
      const url = 'file:///' + path.join(root, 'demo', s, 'index.html').replace(/\\/g, '/');
      const out = path.join(root, 'demo', s, 'preview.png');
      await shootOne(browser, url, out);
      console.log('shot', s);
    }
  } finally {
    await browser.close();
  }
})().catch(e => { console.error(e); process.exit(1); });