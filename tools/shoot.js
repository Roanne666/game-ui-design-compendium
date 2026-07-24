// Screenshot genre-bound interactive scenes (puppeteer-core + local Chrome)
// Usage: node tools/shoot.js
// Outputs PNG to library/previews/<style>.png (gitignored).

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '..');
const scenes = [
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
    const sceneRoot = path.join(root, 'library', 'scenes');
    const previewRoot = path.join(root, 'library', 'previews');
    fs.mkdirSync(previewRoot, { recursive: true });
    for (const dir of scenes) {
      const sceneDir = path.join(sceneRoot, dir);
      const url = 'file:///' + path.join(sceneDir, 'index.html').replace(/\\/g, '/');
      const out = path.join(previewRoot, dir + '.png');
      await shootOne(browser, url, out);
      console.log('shot', dir);
    }
  } finally {
    await browser.close();
  }
})().catch(e => { console.error(e); process.exit(1); });
