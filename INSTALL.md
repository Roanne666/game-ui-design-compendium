# 安装与使用

本仓库为 **Claude / Cursor Agent Plugin**，提供 10 套可程序化生成的移动端竖屏（9:20）游戏 UI 风格。

## Plugin 入口

- 清单： [`.claude-plugin/plugin.json`](.claude-plugin/plugin.json)
- Skills：`skills/game-ui-style/`、`skills/audit-game-hud/`
- Commands：`commands/pick-style.md`、`commands/apply-style.md`、`commands/audit-hud.md`
- 短索引：`references/`（矩阵、硬规则、目录图）

在 Cursor / Claude 中安装或加载本仓库为 Agent Plugin 后，Agent 可通过 Skills 与 Commands 按游戏类型选型并生成 UI。

## 本地预览

- **当前（P0/P1 前）**：打开 [`library/index.html`](library/index.html) 浏览各风格入口
- **P2 后**：预览链接将指向 `library/packs/<id>/index.html`

## 开发期目录

- `research/` — 调研底稿；**不需安装**，默认不在 Skill 触发链
- `docs/rules/` — 硬规则权威稿（Plugin references 为短读摘要）
- `tools/` — 截图等维护脚本

## 快速命令

| 命令 | 作用 |
|------|------|
| `/pick-style` | 按游戏类型推荐 pack id |
| `/apply-style` | 指定 pack，生成/改造 UI |
| `/audit-hud` | 验收 HUD 是否符合规则 |
