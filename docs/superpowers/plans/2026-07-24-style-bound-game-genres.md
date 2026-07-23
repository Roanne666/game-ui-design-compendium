# Style-Bound Game Genres Implementation Plan

> **For agentic workers:** Execute task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Bind each UI style to fitting game genres in docs + ship one exclusive main scene per style (no unified page matrix).

**Architecture:** Shared `demo/lib` tokens/components stay; narrative and demos move to `demo/scenes/<style>/<main>.html`. Specs gain「适用游戏类型」. README/CLAUDE drop「HTML 一次换 CSS」as primary principle.

**Tech Stack:** Markdown specs, static HTML + CSS variables, Node `tools/shoot.js` (puppeteer-core).

**Spec:** `docs/superpowers/specs/2026-07-24-style-bound-game-genres-design.md`

## Global Constraints

- 建材共享，楼型按游戏类型分（禁止 10×10 同 DOM 换皮）
- 本轮每风格恰好 1 个主场景（文件名见规格锚定表）
- 不用真实游戏美术资产；中文文档用 Write/StrReplace 直接写 UTF-8
- 完成后 git commit + push

---

### Task 1: 同步规范文档

**Files:**
- Modify: `CLAUDE.md`, `README.md`, `demo/lib/README.md`, `research/synthesis/style-boundaries.md`, `research/references.md`（Style 03/06/07 标题对齐）

- [ ] 按规格重写原则与目录；去掉 Minimal/Brutalist/Glass；写明 `demo/scenes/`
- [ ] Commit: `docs: align project narrative to genre-bound styles`

### Task 2: 十套 Spec 写入适用游戏类型

**Files:** Modify all `styles/01-*.md` … `styles/10-*.md`

- [ ] 在「1. 风格定位」后插入「适用游戏类型」（适合 / 不适合≥3 / 推荐场景包）
- [ ] Commit: `docs: add genre fit sections to all style specs`

### Task 3: Demo 场景骨架

**Files:**
- Create: `demo/scenes/index.html`
- Create: 10× `demo/scenes/<nn-name>/<main>.html`（见规格表）

- [ ] index 链到 10 主场景
- [ ] 每页只用对应 style CSS + 差异化 DOM（类型信号）
- [ ] Commit: `feat: add genre-specific main scenes for all 10 styles`

### Task 4: 修正截图工具

**Files:** Modify `tools/shoot.js`, `package.json`（脚本说明）

- [ ] shoot 目标改为 `demo/scenes/...` 主场景 → `preview.png`
- [ ] Commit: `fix: point shoot.js at genre-bound scene paths`

### Task 5: 走查

- [ ] 确认 10 个 html 与 index 存在；抽查 2 个场景类名与 token link
- [ ] Push all commits

---

**Execution:** Inline in this session (user already approved spec + proceed).
