# 风格 Spec — 10 套程序化游戏 UI 风格

每套风格 = 一份 spec 文档 + 一套 CSS Token 变量 + 一个 9:20 竖屏主场景。

## 索引

| # | 风格 | 锚定游戏类型 | 主场景 |
|---|------|-------------|--------|
| 01 | [Cyberpunk HUD](../library/packs/01-cyberpunk-hud/SPEC.md) | 赛博 RPG / 潜入 | `library/packs/01-cyberpunk-hud/` |
| 02 | [Dark Fantasy](../library/packs/02-dark-fantasy/SPEC.md) | 魂类 / 动作 RPG | `library/packs/02-dark-fantasy/` |
| 03 | [Sci-Fi Space](../library/packs/03-scifi-space/SPEC.md) | 太空模拟 | `library/packs/03-scifi-space/` |
| 04 | [Pixel Retro](../library/packs/04-pixel-retro/SPEC.md) | 2D 像素 RPG / 平台 | `library/packs/04-pixel-retro/` |
| 05 | [Hand-drawn](../library/packs/05-hand-drawn/SPEC.md) | 叙事动作 / Roguelike | `library/packs/05-hand-drawn/` |
| 06 | [Cartoon Comic](../library/packs/06-cartoon-comic/SPEC.md) | 射击 / 节奏动作 | `library/packs/06-cartoon-comic/` |
| 07 | [Survival Horror](../library/packs/07-survival-horror/SPEC.md) | 生存恐怖 | `library/packs/07-survival-horror/` |
| 08 | [Anime Colorful](../library/packs/08-anime-colorful/SPEC.md) | 日式 JRPG / 社交 | `library/packs/08-anime-colorful/` |
| 09 | [Tactical Military](../library/packs/09-tactical-military/SPEC.md) | 战术射击 / 军事模拟 | `library/packs/09-tactical-military/` |
| 10 | [Synthwave Neon](../library/packs/10-synthwave-neon/SPEC.md) | 复古动作 / 街机 | `library/packs/10-synthwave-neon/` |

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