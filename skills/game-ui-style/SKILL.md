---
name: game-ui-style
description: >-
  目标游戏有对应风格则套用本库 pack；无对应则按该游戏类型自建楼型与视觉（硬规则 + 共享建材）。
  触发：游戏 HUD、UI 风格、竖屏触控界面、选风格、生成按钮/面板/血条。
  Use when building mobile-portrait game UI (matched pack or custom type-correct HUD).
---

# game-ui-style

先判断目标游戏能否对应本库 10 套风格；**有对应则套用 pack，无对应则按该游戏自己的类型设计楼型与视觉**（不用假「通用皮肤」）。两条路径都遵守竖屏 9:20、触控、中文文案、反网页壳。

## 分支判定

1. 读 `references/style-matrix.md` + `references/hard-rules.md`
2. 对照用户游戏的**类型 / 核心玩法 / 布局需求**与矩阵各行
3. **判定**（二选一，须在回复里写明）：
   - **A. 有对应** — 某一行的类型与玩法循环明显匹配，且未命中 `style-matrix` 否决条件 → 套用 pack
   - **B. 无对应** — 对不上 / 命中否决 → **为该游戏定制 UI**；**禁止**为凑合硬选最近 pack 换皮

不确定时：先说明候选与风险，请用户确认；仍模糊则默认 **B**，并说明原因。

---

## 路径 A — 套用 pack

1. 选定 **一个** `library/packs/<id>/`
2. 读该 pack 的 `SPEC.md`、`tokens.css`、`scene.css`、`scene.js`、`index.html`（需要时再读 assets）
3. 按 `references/library-map.md` 加载序在用户项目生成/改造
4. 文案中文；触控语义；楼型与矩阵该行玩法一致
5. 可选：`audit-game-hud`

加载序：

```
components.css → phone-frame.css → game-feel.css → ./tokens.css → ./scene.css → scene-kit.js → ./scene.js
```

---

## 路径 B — 无对应 pack（按游戏类型自建）

**不打开**任意 pack 的 SPEC / 场景 HTML / CSS / JS 当皮肤或楼型源；不复制某套霓虹/像素/斜切等专有视觉。  
**没有**仓库内「通用场景」可抄——每种游戏布局本就不同。

1. **必读**：`references/hard-rules.md` → `docs/rules/mobile-portrait-first.md`、`docs/rules/game-feel-vs-web.md`
2. **楼型**：只按**该目标游戏**的类型与核心循环设计信息架构与操作区（矩阵可作「同类游戏怎么分区」的参考，**不绑**任一 pack 的色板/几何/动效/DOM）
3. **建材**：`library/components/` 共享层；在用户项目自拟 `tokens.css` / `scene.css` / `scene.js`
4. **加载序**（与路径 A 相同，文件均为项目自建）：

```
components.css → phone-frame.css → game-feel.css → ./tokens.css → ./scene.css → scene-kit.js → ./scene.js
```

5. 文案中文；触控语义；禁止统一锁定开火模板、禁止网页壳冒充 HUD
6. 可选：`audit-game-hud`（报告写明路径 B + 该游戏约定循环）

---

## 禁止（两条路径共用）

- ❌ 无对应时硬套某一 pack 只换色
- ❌ 假设存在「适合所有游戏的通用 HUD 布局」
- ❌ 一次读多个 pack 的全量 HTML
- ❌ 把 `research/raw` 当规则源
- ❌ 键鼠作为玩家唯一操作路径
- ❌ 网页卡片 / pill / 默认 Material 底栏当作最终游戏 HUD

## 本地预览

- 全库入口：[`library/index.html`](../../library/index.html)
- 单包：`library/packs/<id>/index.html`（仅路径 A）

## 相关

- 矩阵与匹配说明：`references/style-matrix.md`
- 目录与加载序：`references/library-map.md`
- 硬规则摘要：`references/hard-rules.md`
- 验收：`skills/audit-game-hud/SKILL.md`
