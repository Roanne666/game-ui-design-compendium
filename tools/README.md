# Tools — 项目工具脚本

## shoot.js

puppeteer-core 批量截图。给每个 `library/scenes/<style>/index.html` 渲染 **9:20 竖屏**（默认 390×867）PNG，输出到 `library/previews/<style>.png`（gitignored）。

```bash
npm install            # 装 puppeteer-core
node tools/shoot.js    # 跑全部 10 套场景
```

要求本机装了 Chrome（默认路径 `C:\Program Files\Google\Chrome\Application\chrome.exe`）。改路径直接编辑脚本里的 `CHROME` 常量。

## chroma_key.py

黑底 / 绿幕抠图小工具。给项目生成的 PNG 素材去背景用。

```bash
python tools/chroma_key.py <input.png> <output.png>
```