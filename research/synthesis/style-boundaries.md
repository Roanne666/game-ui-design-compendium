# 风格边界 — 10 套风格互斥矩阵

蒸馏自 research/raw/batch1-2。任何风格不能跨到另一风格的核心特征上。

## 核心特征对比表

| 风格 | 主色调 | 字体 | 几何/圆角 | 质感/光影 | 动效 | 关键反例 |
|------|--------|------|----------|----------|------|---------|
| 01 Cyberpunk HUD | 黑+霓虹(红/青/品红) | Monospace 700 | 直角/硬角 + 扫描线 | 发光辉光、CRT 噪声 | 闪烁/抖动 | 不能没有扫描线/单色 |
| 02 Dark Fantasy | 暗金+棕褐+骨白 | Serif + 装饰衬线 | 锐角金边/磨损 | 金属拉丝、浮雕 | 缓慢淡入淡出 | 不能用饱和色/霓虹 |
| 03 Minimal Modern | 中性灰 + 1 强调 | Sans(Inter/system) | 大圆角 8-16px | 极弱阴影/无 | 短淡入 | 不能装饰/厚重 |
| 04 Pixel Retro | 8/16/32 色硬限制 | Pixel bitmap | 0 圆角、像素对齐 | 无渐变/抖动抗锯齿 | 步进式跳变 | 不能抗锯齿/平滑 |
| 05 Hand-drawn | 暖色板 + 黑墨线 | 手写感衬线 | 不规则有机 | 颗粒纸/墨水笔触 | 弹跳+夸张曲线 | 不能用完美几何 |
| 06 Brutalist | 黑 + 1-2 撞色 | Mono/Sans 粗 | border-radius: 0 | 硬阴影 4px offset | 即时无缓动 | 不能用圆角/模糊 |
| 07 Glassmorphism | 半透明白 + 彩色背景 | Sans 干净 | 大圆角 16-24px | backdrop-filter blur | 平滑 spring | 不能实底/厚重 |
| 08 Anime Colorful | 红+黑+白(1 强调色) | 斜体粗 Sans | 斜切/锯齿 | 平面填充 | 弹跳 swing | 不能用渐变/圆角 |
| 09 Tactical Military | 暗绿/暗棕 + 米白 | Mono + Sans | 直角硬边 | 平面无装饰 | 极短无装饰 | 不能用霓虹/装饰 |
| 10 Synthwave Neon | 品红+青+紫黑 | Bebas/Poppins | 直角+复古圆角 | 辉光渐变扫描线 | 脉冲发光 | 不能用低饱和 |

## 边界规则

1. **Cyberpunk vs Synthwave**: 共享霓虹+扫描线,但 Cyberpunk 偏暗冷(黑客/终端)、Synthwave 偏暖亮(复古未来)
2. **Brutalist vs Minimal Modern**: 都极简,但 Brutalist 厚边框硬阴影,Minimal 几乎无装饰
3. **Dark Fantasy vs Anime Colorful**: 都强对比,但 Dark Fantasy 暗金古朴,Anime 红黑白现代
4. **Pixel Retro vs 其他**: 唯一硬性网格对齐,抗锯齿为零,所有元素像素级测量
5. **Glassmorphism vs 其他**: 唯一使用 backdrop-filter,半透明背景是必备
6. **Hand-drawn vs 其他**: 唯一允许不规则/有机线条/手绘抖动
7. **Tactical Military**: 唯一禁止霓虹/装饰,以可读性为最高优先

## 通用参数(全部 10 套共享)

- 抗锯齿:Pixel Retro 关,其他开
- 字体回退:每个风格指定字体族描述,允许引擎 fallback
- 颜色空间:sRGB(HEX/HSL)
- 动效曲线:必须命名(ease-out/cubic-bezier/spring),不能写"流畅"
- 间距基线:8px 倍数优先