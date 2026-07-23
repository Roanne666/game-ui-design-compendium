# 风格边界 — 10 套风格互斥矩阵

任何风格不能跨到另一风格的核心特征上。场景布局必须服从「适用游戏类型」,不能用统一页面换皮冒充差异。

## 核心特征对比表

| 风格 | 锚定游戏类型 | 主色调 | 字体 | 几何/圆角 | 质感/光影 | 动效 | 关键反例 |
|------|--------------|--------|------|----------|----------|------|---------|
| 01 Cyberpunk HUD | 赛博 RPG/潜入 | 黑+霓虹(红/青) | Monospace 700 | 直角/硬角 + 扫描线 | 辉光、CRT 噪声 | 闪烁/抖动 | 不能没有扫描线感/单色终端感 |
| 02 Dark Fantasy | 魂类/动作 RPG | 暗金+棕褐+骨白 | Serif | 锐角金边/磨损 | 金属、浮雕 | 缓慢淡入 | 不能用饱和霓虹 |
| 03 Sci-Fi Space | 太空模拟 | 深蓝+青全息 | Sans + Mono | 细线几何 | 半透明全息辉光 | 持续仪表动画 | 不能用暖霓虹主色/80s 复古 |
| 04 Pixel Retro | 像素 RPG/平台 | 8/16 色硬限制 | Pixel bitmap | 0 圆角、像素对齐 | 无渐变/关 AA | 步进跳变 | 不能抗锯齿/平滑缓动 |
| 05 Hand-drawn | 叙事动作/Roguelike | 暖色+黑墨线 | 手写/衬线 | 不规则有机 | 纸纹/笔触 | 弹跳夸张 | 不能完美几何/工业 HUD |
| 06 Cartoon Comic | 射击/节奏动作 | 高饱和平涂 | 漫画粗体 | 0 圆角厚黑边 | 硬阴影无 blur | 快切弹跳 | 不能柔和阴影/霓虹主调 |
| 07 Survival Horror | 生存恐怖 | 低饱和骨白/锈 | Stencil/Mono | 直角、稀缺 | diegetic、grime | 偏慢 | 不能信息过载 HUD/霓虹 |
| 08 Anime Colorful | JRPG/社交 | 红+黑+白 | 斜体粗 Sans | 斜切/锯齿 | 平面填充 | spring 弹跳 | 不能圆角渐变玻璃 |
| 09 Tactical Military | 战术射击/军模 | 暗绿/米白 | Mono + Sans | 直角硬边 | 平面无装饰 | 极短线性 | 不能霓虹/装饰浮夸 |
| 10 Synthwave Neon | 复古动作/街机 | 品红+青+紫黑 | Display Sans | 直角+复古圆角 | 辉光渐变扫描线 | 脉冲发光 | 不能低饱和/现代极简 |

## 边界规则

1. **Cyberpunk vs Synthwave**: 共享霓虹+扫描线；Cyberpunk 冷暗终端/植入，Synthwave 暖亮 80s 街机
2. **Dark Fantasy vs Survival Horror**: 都克制 HUD；前者古金沉浸，后者 diegetic 医疗/工程不安感
3. **Sci-Fi Space vs Cyberpunk**: 都未来；Space 深蓝全息舰桥，Cyberpunk 街头/黑客终端红青
4. **Pixel Retro vs 其他**: 唯一硬性网格对齐，抗锯齿为零
5. **Hand-drawn vs Cartoon Comic**: 都非写实；Hand-drawn 墨线纸感叙事，Cartoon 厚边硬阴影动作喜剧
6. **Anime Colorful vs Cartoon**: 都高冲击平面；Anime 斜切红黑白 JRPG，Cartoon 漫画网点射击节奏
7. **Tactical Military**: 唯一禁止霓虹/装饰，可读性最高优先
8. **场景互斥**: 禁止用同一商店/技能树 DOM 套十种 Token 充当十种风格 Demo

## 通用参数

- 抗锯齿: Pixel Retro 关,其他开
- 字体回退: 每个风格指定字体族描述,允许引擎 fallback
- 颜色空间: sRGB(HEX/HSL)
- 动效曲线: 必须命名(ease-out/cubic-bezier/steps),不能写"流畅"
- 间距基线: 8px 倍数优先
