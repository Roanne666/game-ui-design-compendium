// Screenshot genre-bound pack demos (puppeteer-core + local Chrome)
// Usage: node tools/shoot.js
// Outputs PNG to library/previews/<id>.png (gitignored).
// Viewport is portrait 9:20 (390×867) to match delivery aspect.

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '..');
const packs = [
  '01-cyberpunk-hud',
  '02-dark-fantasy',
  '03-scifi-space',
  '04-pixel-retro',
  '05-hand-drawn',
  '06-cartoon-comic',
  '07-survival-horror',
  '08-anime-colorful',
  '09-tactical-military',
  '10-synthwave-neon',
];
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// 9:20 portrait — phone preview size
const VIEW_W = 390;
const VIEW_H = 867;

async function shootOne(browser, url, out) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: VIEW_W, height: VIEW_H, deviceScaleFactor: 2 });
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
    const previewRoot = path.join(root, 'library', 'previews');
    fs.mkdirSync(previewRoot, { recursive: true });
    for (const id of packs) {
      const indexHtml = path.join(root, 'library', 'packs', id, 'index.html');
      if (!fs.existsSync(indexHtml)) {
        console.warn('skip', id, '(missing index.html)');
        continue;
      }
      const url = 'file:///' + indexHtml.replace(/\\/g, '/');
      const out = path.join(previewRoot, id + '.png');
      await shootOne(browser, url, out);
      console.log('shot', id, VIEW_W + 'x' + VIEW_H);
    }
  } finally {
    await browser.close();
  }
})().catch(e => { console.error(e); process.exit(1); });
