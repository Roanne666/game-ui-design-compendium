---
name: game-ui-style
description: >-
  按游戏类型选择并应用本库 10 套竖屏游戏 UI 风格。触发：游戏 HUD、UI 风格、
  竖屏触控界面、选风格、生成按钮/面板/血条。Use when building mobile-portrait game UI.
---

# game-ui-style

按游戏类型选型，读取单个 pack，在用户项目中生成移动端竖屏 9:20 触控游戏 UI。

## 工作流

1. **读索引** — `references/style-matrix.md` + `references/hard-rules.md`
2. **选定 pack** — 根据用户游戏类型选一个 `library/packs/<id>/`（见矩阵 `pack` 列）
3. **读 pack 内容** — 该 pack 的 `SPEC.md`、`tokens.css`、`index.html`；需要时再读本地 css / assets
4. **生成/改造** — 按 `references/library-map.md` 加载序在用户项目落地；界面文案中文；触控语义（点按/拖动/长按）
5. **可选验收** — 完成后可调用 `audit-game-hud` Skill 做清单检查

## 加载序（生成 HTML 时）

```
components.css → phone-frame.css → game-feel.css → ./tokens.css → 可选场景私有 css → scene-kit.js
```

共享层路径相对用户项目调整；顺序不可颠倒。

## 禁止

- ❌ 一次读多个 pack 的全量 HTML（每次只开一个 pack）
- ❌ 把 `research/raw` 当规则源（调研底稿不在默认 Skill 链）
- ❌ 用统一「左锁定 + 右开火 + 中口袋」覆盖矩阵不允许的类型
- ❌ 键鼠快捷键作为玩家唯一操作路径
- ❌ 网页卡片 / pill / 默认 `.btn` 皮当作最终游戏 HUD

## 本地预览

打开 [`library/index.html`](../../library/index.html) 浏览全部 10 套 pack 入口；单包主场景在 `library/packs/<id>/index.html`。

## 相关

- 选型矩阵：`references/style-matrix.md`
- 目录与加载序：`references/library-map.md`
- 硬规则摘要：`references/hard-rules.md`
- 验收 Skill：`skills/audit-game-hud/SKILL.md`
