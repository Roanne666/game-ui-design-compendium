# Agent Plugin + library/packs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把仓库改造成可安装的 Agent Plugin，并把每套风格全文收进 `library/packs/<id>/`（SPEC + tokens + 场景 + 专属 assets）。

**Architecture:** Skill/commands/references 负责选型与硬规则路由；`library/components/` 仅共享建材；每风格独占 `library/packs/<id>/`。先搭 plugin 骨架，再试点迁一个 pack，再批量迁完并删旧路径。

**Tech Stack:** 静态 HTML/CSS/JS、Markdown Spec、Claude/Cursor `.claude-plugin` + `skills/` + `commands/`。迁移优先 `git mv`；含中文源文件只用编辑器 Write/StrReplace，禁止 PowerShell 写源码。

**Design spec:** [`2026-07-25-agent-plugin-pack-design.md`](./2026-07-25-agent-plugin-pack-design.md)

## Global Constraints

- 画幅默认竖屏 **9:20**；主输入触控；玩家可见 UI 文案一律中文
- 楼型与玩法按游戏类型；禁止全库统一「锁定 + 开火」模板
- 共享加载序：`components.css` → `phone-frame.css` → `game-feel.css` → `./tokens.css` →（可选本地 css）→ `scene-kit.js`
- Pack ID 固定：`01-cyberpunk-hud` … `10-synthwave-neon`
- `research/raw/**` 不进 Skill 默认触发链
- 不重写玩法、不重做美术；只搬家 + 改路径 + 接 plugin

---

## File map（目标）

| 路径 | 职责 |
|------|------|
| `.claude-plugin/plugin.json` | Plugin 清单 |
| `skills/game-ui-style/SKILL.md` | 主路由 Skill |
| `skills/audit-game-hud/SKILL.md` | 验收 Skill |
| `commands/pick-style.md` | 选型命令 |
| `commands/apply-style.md` | 按 pack 生成 |
| `commands/audit-hud.md` | 验收命令 |
| `references/hard-rules.md` | 硬规则摘要 → `docs/rules/*` |
| `references/style-matrix.md` | 矩阵短表 → packs |
| `references/library-map.md` | 目录与加载序 |
| `library/packs/<id>/SPEC.md` | 风格 Spec |
| `library/packs/<id>/tokens.css` | 风格 token |
| `library/packs/<id>/index.html` | 主场景 |
| `library/packs/<id>/assets/**` | 风格专属素材 |
| `library/packs/README.md` | Pack 索引 |
| `library/index.html` | 入口（链到 packs） |
| `INSTALL.md` | 安装说明 |
| `CLAUDE.md` / `README.md` | 路径约定更新 |

**删除（P2 末）：** 根 `styles/`、`library/scenes/`、`library/components/styles/`、`library/assets/project/`

**Token 文件名映射**

| pack id | 旧 token 路径 |
|---------|----------------|
| `01-cyberpunk-hud` | `library/components/styles/cyberpunk.css` |
| `02-dark-fantasy` | `library/components/styles/dark-fantasy.css` |
| `03-scifi-space` | `library/components/styles/scifi-space.css` |
| `04-pixel-retro` | `library/components/styles/pixel-retro.css` |
| `05-hand-drawn` | `library/components/styles/hand-drawn.css` |
| `06-cartoon-comic` | `library/components/styles/cartoon-comic.css` |
| `07-survival-horror` | `library/components/styles/survival-horror.css` |
| `08-anime-colorful` | `library/components/styles/anime-colorful.css` |
| `09-tactical-military` | `library/components/styles/tactical-military.css` |
| `10-synthwave-neon` | `library/components/styles/synthwave-neon.css` |

**场景相对路径改写规则（迁入 pack 后）**

- `../../components/styles/<token>.css` → `./tokens.css`
- `../../assets/project/<id>/foo.png` → `./assets/foo.png`
- `../../components/components.css` 等共享三件套 → **保持** `../../components/...`（`packs/` 与 `scenes/` 同深）
- `../../components/scene-kit.js` → 保持

---

### Task 1: Plugin 骨架 + references（P0）

**Files:**
- Create: `.claude-plugin/plugin.json`
- Create: `skills/game-ui-style/SKILL.md`
- Create: `skills/audit-game-hud/SKILL.md`
- Create: `commands/pick-style.md`
- Create: `commands/apply-style.md`
- Create: `commands/audit-hud.md`
- Create: `references/hard-rules.md`
- Create: `references/style-matrix.md`
- Create: `references/library-map.md`
- Create: `INSTALL.md`
- Modify: `docs/plans/2026-07-25-agent-plugin-pack-design.md`（状态改为「已确认，实施中」）

**Interfaces:**
- Consumes: design §3–§5；`docs/rules/mobile-portrait-first.md` §4 矩阵
- Produces: 可安装 plugin 清单；Skill 路径一律写 `library/packs/<id>/`（即使 P1 才开始迁）

- [ ] **Step 1: 写 `plugin.json`**

```json
{
  "name": "game-ui-encyclopedia",
  "version": "1.0.0",
  "description": "10 procedural mobile-portrait game UI styles: specs, shared components, per-style packs.",
  "author": { "name": "Game UI Design Encyclopedia" },
  "keywords": ["game-ui", "mobile", "portrait", "hud", "css-tokens"],
  "skills": "./skills/",
  "commands": "./commands/"
}
```

- [ ] **Step 2: 写 `references/library-map.md`**

内容必须包含：

1. 目录树：`library/components/`（共享）+ `library/packs/<id>/`（SPEC.md / tokens.css / index.html / assets/）
2. 加载序 HTML 片段（与 Global Constraints 一致）
3. 一句：「Agent 每次只打开一个 pack；禁止扫齐 10 套场景 HTML」

- [ ] **Step 3: 写 `references/style-matrix.md`**

从 `docs/rules/mobile-portrait-first.md` §4 抄短表，每行增加列：`pack` = `library/packs/<id>/`。文末链到权威稿与 `game-feel-vs-web.md`。

- [ ] **Step 4: 写 `references/hard-rules.md`**

摘要硬规则（9:20、触控、中文、类型正确楼型、热区 ≥44、反网页壳、禁止统一锁定开火）。每条后链 `docs/rules/mobile-portrait-first.md` 或 `docs/rules/game-feel-vs-web.md`。注明：权威在 `docs/rules/`，本文件仅短读。

- [ ] **Step 5: 写 `skills/game-ui-style/SKILL.md`**

Frontmatter：

```yaml
---
name: game-ui-style
description: >-
  按游戏类型选择并应用本库 10 套竖屏游戏 UI 风格。触发：游戏 HUD、UI 风格、
  竖屏触控界面、选风格、生成按钮/面板/血条。Use when building mobile-portrait game UI.
---
```

正文工作流：

1. 读 `references/style-matrix.md` + `references/hard-rules.md`
2. 选定一个 `library/packs/<id>/`
3. 读该 pack 的 `SPEC.md`、`tokens.css`、`index.html`（需要时再读本地 css / assets）
4. 按 `references/library-map.md` 加载序在用户项目生成；中文文案；触控语义
5. 可选再跑 `audit-game-hud`

禁止：一次读多个 pack 全量 HTML；把 `research/raw` 当规则源。

- [ ] **Step 6: 写 `skills/audit-game-hud/SKILL.md`**

触发：验收 HUD、盲测、audit。清单项：画幅 9:20、矩阵玩法可辨、可见触控热区、中文、无键鼠主路径、非网页壳、与其它风格互斥。输出格式：通过/失败列表 + 建议改法。

- [ ] **Step 7: 写三条 commands**

`commands/pick-style.md`：根据用户游戏类型输出推荐 pack id + 一句话理由 + 路径。  
`commands/apply-style.md`：要求指定 pack id（或先 pick）；按 Skill 工作流生成/改造。  
`commands/audit-hud.md`：调用 audit Skill 清单。

- [ ] **Step 8: 写 `INSTALL.md`**

说明：本仓为 Claude/Cursor Agent Plugin；指向 `.claude-plugin/plugin.json`；本地预览打开 `library/index.html`（P2 后链 packs）；开发期 `research/` 不需安装。

- [ ] **Step 9: 验证骨架文件存在**

Run:

```bash
cmd /c "dir /s /b .claude-plugin\plugin.json skills\game-ui-style\SKILL.md skills\audit-game-hud\SKILL.md commands\pick-style.md references\hard-rules.md INSTALL.md"
```

Expected: 列出上述路径，无 missing。

- [ ] **Step 10: Commit**

```powershell
git add .claude-plugin skills commands references INSTALL.md docs/plans/2026-07-25-agent-plugin-pack-design.md
git commit -m @"
Add Agent Plugin skeleton and pack-path references.

"@
git push
```

---

### Task 2: 试点迁 `04-pixel-retro`（P1）

**Files:**
- Create dir: `library/packs/04-pixel-retro/`
- Move: `library/scenes/04-pixel-retro/**` → `library/packs/04-pixel-retro/`
- Move: `library/components/styles/pixel-retro.css` → `library/packs/04-pixel-retro/tokens.css`
- Move: `styles/04-pixel-retro.md` → `library/packs/04-pixel-retro/SPEC.md`
- Move: `library/assets/project/04-pixel-retro/**` → `library/packs/04-pixel-retro/assets/`
- Modify: `library/packs/04-pixel-retro/index.html`（token + asset 路径）
- Modify: `library/packs/04-pixel-retro/SPEC.md`（主场景路径句）
- Create: `library/packs/README.md`（先只列 04 + 说明迁移中）

**Interfaces:**
- Consumes: Task 1 的 pack 路径约定
- Produces: 第一个可打开的完整 pack，作为其余 9 套模板

- [ ] **Step 1: 建目录并用 git mv 搬场景**

```bash
mkdir library\packs\04-pixel-retro
git mv library/scenes/04-pixel-retro/index.html library/packs/04-pixel-retro/index.html
```

若目录下还有其它文件，一并 `git mv`。

- [ ] **Step 2: git mv token 与 Spec**

```bash
git mv library/components/styles/pixel-retro.css library/packs/04-pixel-retro/tokens.css
git mv styles/04-pixel-retro.md library/packs/04-pixel-retro/SPEC.md
```

- [ ] **Step 3: git mv project 资产**

```bash
mkdir library\packs\04-pixel-retro\assets
git mv library/assets/project/04-pixel-retro/battle-bg.png library/packs/04-pixel-retro/assets/battle-bg.png
git mv library/assets/project/04-pixel-retro/hero.png library/packs/04-pixel-retro/assets/hero.png
git mv library/assets/project/04-pixel-retro/foe-slime.png library/packs/04-pixel-retro/assets/foe-slime.png
git mv library/assets/project/04-pixel-retro/foe-bat.png library/packs/04-pixel-retro/assets/foe-bat.png
git mv library/assets/project/04-pixel-retro/foe-orc.png library/packs/04-pixel-retro/assets/foe-orc.png
```

- [ ] **Step 4: 改 `index.html` 链接**

用 StrReplace：

- `href="../../components/styles/pixel-retro.css"` → `href="./tokens.css"`
- 所有 `../../assets/project/04-pixel-retro/` → `./assets/`

共享 `../../components/components.css` 等三件套与 `scene-kit.js` **不要改深度**。

- [ ] **Step 5: 改 `SPEC.md` 主场景路径**

将「主场景:`library/scenes/04-pixel-retro/index.html`」改为「主场景:`library/packs/04-pixel-retro/index.html`」。其它相对链接若指向旧 styles/scenes 一并改。

- [ ] **Step 6: 写临时 `library/packs/README.md`**

说明 packs 为风格包根；目前已迁 `04-pixel-retro`；其余待迁。表列 id | SPEC | 场景。

- [ ] **Step 7: 浏览器/静态验收**

用文件协议或本地静态服打开 `library/packs/04-pixel-retro/index.html`。

Expected:

- 手机框 9:20 可见
- 战斗背景与角色图加载（非裂图）
- 中文指令窗可读
- DevTools Network 无 404（tokens.css / assets/* / components/*）

中文抽查：Read `index.html` 与 `SPEC.md`，确认汉字正常（非 `?` / 乱码）。

- [ ] **Step 8: Commit**

```powershell
git add -A library/packs/04-pixel-retro library/packs/README.md
git add -u styles/04-pixel-retro.md library/scenes/04-pixel-retro library/components/styles/pixel-retro.css library/assets/project/04-pixel-retro
git commit -m @"
Move pixel-retro into library/packs as migration pilot.

"@
git push
```

---

### Task 3: 批量迁其余 9 个 pack（P2a）

**Files:** 对下表每一行执行与 Task 2 相同的 git mv + 路径改写。

| id | old token file | has project assets? | 场景额外文件 |
|----|----------------|---------------------|--------------|
| `01-cyberpunk-hud` | `cyberpunk.css` | 是 | `hud.css`, `layout-9x20.css` |
| `02-dark-fantasy` | `dark-fantasy.css` | 是 | `hud.css` |
| `03-scifi-space` | `scifi-space.css` | 是 | `hud.css` |
| `05-hand-drawn` | `hand-drawn.css` | 否 | 无 |
| `06-cartoon-comic` | `cartoon-comic.css` | 否 | 无 |
| `07-survival-horror` | `survival-horror.css` | 是 | 无（或仅 index） |
| `08-anime-colorful` | `anime-colorful.css` | 是 | 无 |
| `09-tactical-military` | `tactical-military.css` | 是 | 无 |
| `10-synthwave-neon` | `synthwave-neon.css` | 是 | 无 |

**Interfaces:**
- Consumes: Task 2 路径改写规则
- Produces: 10 个完整 pack；旧 scenes 下仅剩 `index.html`（入口）或可删

对 **每个** id，按序完成下列步骤（可一个 commit 含多个 pack，但每迁完 3 个建议 commit 一次）：

- [ ] **Step 1: git mv 场景目录全部文件 → `library/packs/<id>/`**

含 `index.html` 与表中「场景额外文件」。

- [ ] **Step 2: git mv token → `library/packs/<id>/tokens.css`**

- [ ] **Step 3: git mv Spec → `library/packs/<id>/SPEC.md`**

源：`styles/<id>.md`（文件名与 id 一致，如 `01-cyberpunk-hud.md`）。

- [ ] **Step 4: 若有 `library/assets/project/<id>/`，整树 git mv 到 `library/packs/<id>/assets/`**

无资产的 `05` / `06`：跳过；不要建假 PNG。

- [ ] **Step 5: StrReplace `index.html`（及该 pack 内引用旧路径的本地 css）**

- `../../components/styles/<old-token-name>.css` → `./tokens.css`
- `../../assets/project/<id>/` → `./assets/`
- 若本地 css（如 `hud.css`）内有 `url(...assets/project...)`，同样改为 `./assets/` 或相对 assets 的正确相对路径

- [ ] **Step 6: StrReplace `SPEC.md` 主场景路径**

`library/scenes/<id>/` → `library/packs/<id>/`

- [ ] **Step 7: 每迁完一批，打开该 pack `index.html` 抽查无 404、中文正常**

- [ ] **Step 8: Commit（建议分批）**

```powershell
git commit -m @"
Move style packs NN into library/packs.

"@
git push
```

全部 9 个完成后：

- [ ] **Step 9: 更新 `library/packs/README.md` 为完整 10 行索引表**

列：# | 风格 | 类型 | SPEC | 主场景。内容可从原 `styles/README.md` 改编，路径全部 `packs/`。

- [ ] **Step 10: Commit README**

---

### Task 4: 入口、CREDITS、删旧目录、清残留引用（P2b）

**Files:**
- Modify: `library/index.html`
- Modify: `library/assets/CREDITS.md`
- Modify: `library/components/README.md`
- Modify: `README.md`
- Modify: `CLAUDE.md`
- Modify: `docs/rules/mobile-portrait-first.md`（若含旧路径）
- Modify: `docs/rules/game-feel-vs-web.md`（若含旧路径）
- Modify: `docs/README.md`（若需要）
- Delete: `library/scenes/`（整树，含旧 `scenes/index.html`）
- Delete: `styles/`（整树，含 README；内容已在 packs）
- Delete: `library/components/styles/`（应已空）
- Delete: `library/assets/project/`（应已空）

**Interfaces:**
- Consumes: 10 packs 已就位
- Produces: 无旧路径主叙事；入口直达 packs

- [ ] **Step 1: 重写 `library/index.html` 为风格入口表**

不要再 redirect 到 `scenes/index.html`。做成中文列表，每行链到 `packs/<id>/index.html`，并链 `packs/<id>/SPEC.md`（可选）。可参考原 `library/scenes/index.html` 的表结构，改 href。

- [ ] **Step 2: 更新 `CREDITS.md`**

所有 `library/assets/project/<id>/...` → `library/packs/<id>/assets/...`

- [ ] **Step 3: 更新 `library/components/README.md`**

删除「`styles/<name>.css` ×10」模块描述；改为「token 在各 `library/packs/<id>/tokens.css`」。加载序示例改为 pack 相对路径。

- [ ] **Step 4: 更新根 `README.md` 与 `CLAUDE.md`**

目录树改为 packs；Quickstart：打开 `library/index.html` → pack；Spec 在 `library/packs/<id>/SPEC.md`。

- [ ] **Step 5: Grep 清残留**

Run:

```bash
rg -n "library/scenes/|styles/0[0-9]-|components/styles/|assets/project/" --glob "!docs/plans/*" --glob "!research/**"
```

Expected: 无业务代码/文档命中（`docs/plans/*` 与 `research/**` 可保留历史提及；若 rules/README 仍有旧路径必须改）。

对命中文件用 StrReplace 改为 pack 路径。

- [ ] **Step 6: 删除空旧目录**

```bash
git rm -r library/scenes styles
# 若 components/styles 与 assets/project 仍在且为空或仅残留：
git rm -r library/components/styles library/assets/project
```

若 `git rm` 报 not empty，先确认文件是否漏迁。

- [ ] **Step 7: 全 pack 冒烟**

对 `01`–`10` 各打开一次 `library/packs/<id>/index.html`，或至少抽查 `01`、`04`、`07`、`10`。Expected: 无裂图、玩法控件可见、中文正常。

- [ ] **Step 8: Commit**

```powershell
git commit -m @"
Retarget library entry to packs and remove legacy style paths.

"@
git push
```

---

### Task 5: Skill 接线验收 + 设计状态收尾（P3）

**Files:**
- Modify: `skills/game-ui-style/SKILL.md`（确认路径与真实目录一致；补「打开 library/index.html 预览」）
- Modify: `references/library-map.md`（去掉「迁移中」语气）
- Modify: `INSTALL.md`（预览路径最终化）
- Modify: `docs/plans/2026-07-25-agent-plugin-pack-design.md`（状态：已实施）
- Modify: `docs/plans/README.md`（implementation 状态：完成或进行中）

**Interfaces:**
- Consumes: Task 1–4 最终树
- Produces: Plugin 文档与磁盘一致；可宣布 P0–P3 完成

- [ ] **Step 1: 核对 Skill / references 中每个示例路径在磁盘存在**

Run:

```bash
cmd /c "dir /b library\packs & dir /s /b library\packs\*\SPEC.md library\packs\*\tokens.css library\packs\*\index.html"
```

Expected: 10 个 pack 目录；各至少 SPEC.md、tokens.css、index.html。

- [ ] **Step 2: 人工走一遍 `/pick-style` 文案逻辑**

假设用户说「魂类动作」→ 文档应指向 `02-dark-fantasy`。确认 `references/style-matrix.md` 该行正确。

- [ ] **Step 3: 更新计划状态字段并 Commit**

```powershell
git add skills references INSTALL.md docs/plans
git commit -m @"
Finalize plugin docs against migrated library packs.

"@
git push
```

- [ ] **Step 4: 成功标准核对（设计 §9）**

1. `plugin.json` + 主 Skill 存在  
2. 每风格仅在 `library/packs/<id>/`  
3. `library/components/` 无 per-style token  
4. 抽查场景可盲测类型  
5. 根 `styles/` 与 `library/scenes/` 不存在  

全部勾选则本计划完成。

---

## Self-review (plan author)

| Design 要求 | 对应 Task |
|-------------|-----------|
| `.claude-plugin` + skills + commands | Task 1 |
| references 三件套 | Task 1 |
| library 保留且 packs 收全文 | Task 2–3 |
| 共享仅 components + _shared | Task 3–4（project 迁入 pack） |
| 删 styles/scenes/components/styles/project | Task 4 |
| INSTALL / README / CLAUDE | Task 1 + 4 + 5 |
| 不进 research/raw | Task 1 Skill 禁止项 |
| P0→P1→P2→P3 分期 | Task 1 / 2 / 3–4 / 5 |

无 TBD 占位；token 映射与路径改写规则已写死。
