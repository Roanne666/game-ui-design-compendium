# 风格 Spec — 10 套程序化游戏 UI 风格

每套风格 = 一份 spec 文档 + 一套 CSS Token 变量 + 一个 9:20 竖屏主场景。

## 索引

| # | 风格 | 锚定游戏类型 | 主场景 |
|---|------|-------------|--------|
| 01 | [Cyberpunk HUD](01-cyberpunk-hud.md) | 赛博 RPG / 潜入 | `library/scenes/01-cyberpunk-hud/` |
| 02 | [Dark Fantasy](02-dark-fantasy.md) | 魂类 / 动作 RPG | `library/scenes/02-dark-fantasy/` |
| 03 | [Sci-Fi Space](03-scifi-space.md) | 太空模拟 | `library/scenes/03-scifi-space/` |
| 04 | [Pixel Retro](../library/packs/04-pixel-retro/SPEC.md) | 2D 像素 RPG / 平台 | `library/packs/04-pixel-retro/` |
| 05 | [Hand-drawn](05-hand-drawn.md) | 叙事动作 / Roguelike | `library/scenes/05-hand-drawn/` |
| 06 | [Cartoon Comic](06-cartoon-comic.md) | 射击 / 节奏动作 | `library/scenes/06-cartoon-comic/` |
| 07 | [Survival Horror](07-survival-horror.md) | 生存恐怖 | `library/scenes/07-survival-horror/` |
| 08 | [Anime Colorful](08-anime-colorful.md) | 日式 JRPG / 社交 | `library/scenes/08-anime-colorful/` |
| 09 | [Tactical Military](09-tactical-military.md) | 战术射击 / 军事模拟 | `library/scenes/09-tactical-military/` |
| 10 | [Synthwave Neon](10-synthwave-neon.md) | 复古动作 / 街机 | `library/scenes/10-synthwave-neon/` |

## 类型 → 布局 / 玩法 矩阵

完整版见 [`docs/rules/mobile-portrait-first.md` §4](../docs/rules/mobile-portrait-first.md)。

## Spec 模板（13 章节，顺序固定）

1. 风格定位
2. 适用游戏类型
3. 视觉关键词
4. 色彩系统
5. 几何与构图
6. 边框与容器
7. 文字与排版
8. 光影与质感
9. 动效原则
10. 状态语义
11. 可程序化生成参数表
12. 不做什么（反例 ≥ 5）
13. 可生成部件清单