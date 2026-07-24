# Generic HUD — 无对应风格时的最小骨架

当目标游戏 **对不上** 10 套 pack 时，用本目录作生成起点（路径 B）。

## 做什么

- 标准共享栈 + 中性 `tokens.css`
- 9:20 `.game-root`、触控主键、中文文案
- 楼型按**该游戏自己的类型**改，不抄某一 pack 的霓虹/像素/斜切等专有视觉

## 不做什么

- 不把本页当成「第 11 套风格」
- 不在判定无对应后仍去打开某个 pack HTML 换皮

## 文件

| 文件 | 用途 |
|------|------|
| `index.html` | 可打开的最小竖屏 HUD |
| `tokens.css` | 中性变量；可复制到用户项目后按需改色 |

权威规则：`docs/rules/mobile-portrait-first.md`、`docs/rules/game-feel-vs-web.md`。
