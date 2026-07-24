---
name: game-ui-style
description: >-
  目标游戏有对应风格则套用本库 pack；无对应则走通用竖屏游戏 UI 思路。
  触发：游戏 HUD、UI 风格、竖屏触控界面、选风格、生成按钮/面板/血条。
  Use when building mobile-portrait game UI (matched pack or generic rules).
---

# game-ui-style

先判断目标游戏能否对应本库 10 套风格；**有对应则套用 pack，无对应则走通用设计思路**。两条路径都遵守竖屏 9:20、触控、中文文案、反网页壳。

## 分支判定

1. 读 `references/style-matrix.md` + `references/hard-rules.md`
2. 对照用户游戏的**类型 / 核心玩法 / 布局需求**与矩阵各行
3. **判定**（二选一，须在回复里写明）：
   - **A. 有对应** — 某一行的类型与玩法循环明显匹配（可有小幅气质差，但楼型一致）→ 走「套用 pack」
   - **B. 无对应** — 对不上任何一行，或强行套用会扭曲玩法 → 走「通用 UI」；**禁止**为凑合硬选最近 pack 换皮

不确定时：先说明候选与风险，请用户确认；仍模糊则默认 **B**，并说明原因。

---

## 路径 A — 套用 pack

1. 选定 **一个** `library/packs/<id>/`
2. 读该 pack 的 `SPEC.md`、`tokens.css`、`index.html`（需要时再读本地 css / assets）
3. 按 `references/library-map.md` 加载序在用户项目生成/改造
4. 文案中文；触控语义；楼型与矩阵该行玩法一致
5. 可选：`audit-game-hud`

加载序：

```
components.css → phone-frame.css → game-feel.css → ./tokens.css → 可选场景私有 css → scene-kit.js
```

---

## 路径 B — 通用 UI（无对应风格）

**不打开**任意 pack 的 SPEC / 场景 HTML 当皮肤源；不复制某套霓虹/像素/斜切等专有视觉。

1. **必读**：`references/hard-rules.md` → 权威稿 `docs/rules/mobile-portrait-first.md`、`docs/rules/game-feel-vs-web.md`
2. **选型楼型**：仍按目标游戏自己的类型决定信息架构与操作循环（矩阵可作「同类游戏怎么分区」参考，但**不绑**某一 pack 的色板/几何/动效）
3. **建材**：只用 `library/components/` 共享层（`components.css`、`phone-frame.css`、`game-feel.css`、`scene-kit.js`）；token 在用户项目内按硬规则自拟（色板、圆角、字重），保持中性、可读、触控热区 ≥44
4. **加载序（无 pack tokens）**：

```
components.css → phone-frame.css → game-feel.css → （项目自拟 tokens.css）→ scene-kit.js
```

5. 文案中文；触控语义；禁止统一锁定开火模板、禁止网页壳冒充 HUD
6. 可选：`audit-game-hud`（按目标游戏自述的核心循环验收，不按某 pack 盲测）

---

## 禁止（两条路径共用）

- ❌ 无对应时硬套某一 pack 只换色
- ❌ 一次读多个 pack 的全量 HTML
- ❌ 把 `research/raw` 当规则源
- ❌ 键鼠作为玩家唯一操作路径
- ❌ 网页卡片 / pill / 默认 Material 底栏当作最终游戏 HUD

## 本地预览

- 全库入口：[`library/index.html`](../../library/index.html)
- 单包：`library/packs/<id>/index.html`（仅路径 A 需要对照）

## 相关

- 矩阵与匹配说明：`references/style-matrix.md`
- 目录与加载序：`references/library-map.md`
- 硬规则摘要：`references/hard-rules.md`
- 验收：`skills/audit-game-hud/SKILL.md`
