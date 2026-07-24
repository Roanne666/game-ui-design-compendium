# Task 2 报告：试点迁移 `04-pixel-retro`

## 状态

DONE

## 完成内容

- 创建 `library/packs/04-pixel-retro/`，将场景、风格 Token、规格文档和 5 个专属资产迁入同一风格包。
- 将 `pixel-retro.css` 改名为包内 `tokens.css`，将原风格文档改名为包内 `SPEC.md`。
- 更新 `index.html`：共享组件栈与 `scene-kit.js` 保持 `../../components/` 深度；Token 改为 `./tokens.css`；全部专属资产改为 `./assets/`。
- 更新 `SPEC.md` 的主场景路径为 `library/packs/04-pixel-retro/index.html`。
- 新建 `library/packs/README.md`，标记 `04-pixel-retro` 已迁移、其余风格待迁移。
- 未迁移或修改其它风格包。

## 验证

- 静态路径搜索：包内不再包含 `library/scenes/04-pixel-retro`、`components/styles/pixel-retro.css` 或 `assets/project/04-pixel-retro`。
- 资产检查：`battle-bg.png`、`hero.png`、`foe-slime.png`、`foe-bat.png`、`foe-orc.png` 均存在于包内 `assets/`。
- HTTP 检查：场景、Token、三份共享 CSS、`scene-kit.js` 与 5 个图片资源共 11 个 URL 全部返回 200。
- 浏览器检查：使用 Playwright Chromium 以 `450 × 1000` 视口打开新场景并截图；手机画面为 9:20，战斗背景、英雄与三名敌人均正常显示，中文战斗日志与指令窗可读，未见裂图。
- 编码抽查：直接读取 `index.html`、`SPEC.md` 与 `library/packs/README.md`，中文均为正常 UTF-8 汉字。

## 备注

Cursor 内置浏览器服务在验收时不可用，因此改用本机 Playwright Chromium 完成等价浏览器渲染检查；HTTP 请求日志未出现 404。
