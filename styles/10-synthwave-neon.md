# Style 10 — Synthwave Neon

## 1. 风格定位

**80s 复古未来、霓虹渐变、CRT 残影、透视网格**。代表作:Hotline Miami、Fahrenheit:Indigo Prophecy、Katana ZERO、Cyber Shadow、Tron、Drive 电影美学、Synthwave 音乐 MV。

UI 像从 80 年代未来想象出来的全息显示。霓虹辉光、无限透视网格、太阳渐变、磁带残影。核心是"穿越到过去对未来想象的视觉"。

## 2. 适用游戏类型

**适合**
- 类型:复古动作、街机顶视角、Synthwave 叙事小品
- 典型玩法:霓虹标题屏、得分连击、磁带式暂停
- 代表作:见风格定位

**不适合**
- 写实军规低饱和 HUD
- 魂类古金极简
- 现代扁平 SaaS 风菜单

**本风格推荐场景包**
- 主场景:`neon-title.html`（9:20）
- 布局原型:标题层 → 一局；HUD 几乎只有分数
- 核心玩法:开始 → 得分 → 结束重开
- 扩展:得分 HUD、磁带暂停

## 3. 视觉关键词

霓虹、辉光、80s、复古未来、渐变、网格透视、CRT、扫描线、磁带、太阳、棕榈、紫罗兰、洋红、青色、Outrun、合成器、维加斯、迈阿密。

## 4. 色彩系统

**默认调色板(Miami Sunset)**:

| 角色 | 颜色 | HEX | 用法 |
|------|------|-----|------|
| 背景 1 | Void Purple | `#090014` | 屏幕底,深空感 |
| 背景 2 | Deep Purple | `#1A0B2E` | 面板底 |
| 背景 3 | Mid Purple | `#3D1E6D` | 渐变中段 |
| 主色 1 | Neon Magenta | `#FF00FF` | 主强调、CTA、辉光 |
| 主色 2 | Electric Cyan | `#00FFFF` | 副强调、信息 |
| 辅色 1 | Sunset Pink | `#FF006E` | 强调、热、暖 |
| 辅色 2 | Sun Yellow | `#FFD700` | 太阳渐变、强调 |
| 辅色 3 | Sun Orange | `#FF6B35` | 太阳渐变中段 |
| 辅色 4 | Hot Pink | `#FF85B3` | 装饰、辅助 |
| 辅色 5 | Deep Magenta | `#A8008C` | 渐变阴影 |
| 文本 | White | `#FFFFFF` | 主文本 |
| 文本弱 | Dim Cyan | `#88E0E0` | 次要文本 |
| 语义 | Success | `#00F5A0` | 完成 |
| 语义 | Warning | `#FFD700` | 警告 |
| 语义 | Danger | `#FF3366` | 错误 |

**太阳渐变(signature)**: `linear-gradient(180deg, #FFD700 0%, #FF6B35 30%, #FF006E 60%, #8338EC 85%, #1A0B2E 100%)`(黄→橙→粉→紫→深)

**配色原则**:
- 背景暗紫黑,所有亮色都需辉光
- 招牌组合:洋红 + 青(Outrun 双色)
- 太阳渐变是 signature,所有"英雄区/标题区"用此渐变
- 文本必须白色或浅 cyan,中等亮度
- 永远饱和 100%

## 5. 几何与构图

- **圆角**: 0-4px(允许复古小圆角,模拟旧显示器)
- **边框**: 1-2px 霓虹色 + 1-3px 辉光
- **网格**: 透视网格背景(向后消失点),装饰性
- **HUD 锚点**: 四角,允许倾斜/歪斜
- **面板锚点**: 中央,常带透视效果
- **形状**: 直角矩形为主,允许三角形、菱形装饰
- **文字排版**: 横向网格对齐 + 大字号标题
- **间距**: 宽松(8-32px),允许元素超出边界

## 6. 边框与容器

**面板**:
- 背景 `rgba(26, 11, 46, 0.85)` 或 `linear-gradient(135deg, rgba(58, 30, 109, 0.7), rgba(13, 0, 26, 0.85))`
- 边框:2px 实心 + 多层辉光
- 圆角 0-4px
- 可选:背景透视网格(SVG 透视变换)
- 可选:底部霓虹线发光(模拟 CRT 显示器底边)

**按钮(主)**:
- 背景:Neon Magenta 实色
- 边框:1px Cyan
- 文字 White,weight 800
- 辉光:`box-shadow: 0 0 16px #FF00FF, 0 0 32px #FF00FF`
- Hover:背景变 Cyan + 辉光变 Magenta
- Active:scale(0.96) + 辉光增强

**按钮(次)**:
- 透明背景 + 1px Cyan 边 + Cyan 文本 + Cyan 辉光
- Hover:背景 Cyan 10% + 边框 2px

**按钮(危险)**:
- 背景 Hot Pink 实色 + 白字 + 粉辉光

**进度条**:
- 轨道:深紫底 + 1px Cyan 边
- 填充:Neon Magenta 实色 + Magenta 辉光
- 圆角 0-2px
- 装饰:旁边可贴小三角形渐变填充指示器

**卡片**:
- 背景:深紫半透明 + 顶部 1px 霓虹线
- 边框:1-2px 霓虹色 + 辉光
- 角部:允许不对称或切角
- 可选:底部装饰渐变条

## 7. 文字与排版

- **字体族**:
  - Display: Bebas Neue、Anton、Oswald(`display sans, condensed`)
  - Body: Poppins、Inter、Montserrat
  - Mono: IBM Plex Mono、Space Mono(`monospace`)
- **标题**: Bebas Neue,weight 400,letter-spacing: 0.05em,uppercase
- **Hero 字号**: 56-120px
- **副标题**: Weight 500-700
- **正文**: Weight 400-500,line-height 1.5
- **HUD 标签**: Mono,weight 400,uppercase,字号 11-13px
- **数字**: Mono,tabular-nums,允许巨大字号
- **大小**: HUD 11-14px / 正文 15-16px / 标题 24-44px / Hero 56-120px
- **大小写**: Display 必大写

## 8. 光影与质感

- **辉光(必需)**:
  - 文本: `text-shadow: 0 0 8px <color>, 0 0 16px <color>`
  - 边框/按钮: `box-shadow: 0 0 12px <color>, 0 0 24px <color>`
  - 强度可调(2-3 层)
- **CRT 扫描线**: 全屏 `::before` 覆盖,2-3px 间隔 1px 半透明黑线,opacity 0.10-0.20
- **CRT 噪点**: 全屏 `::after` 覆盖,SVG turbulence,opacity 0.05
- **RGB 偏移**: 故障态 `text-shadow: -2px 0 #FF00FF, 2px 0 #00FFFF`
- **背景动态**:
  - 透视网格(SVG 透视变换,向后消失点)
  - 太阳渐变(常贴底部)
  - 远景霓虹城市剪影(可选)
- **阴影**: 仅辉光,不用普通阴影
- **纹理**: 无纸纹,纯色 + 辉光 + 扫描线

## 9. 动效原则

| 动作 | 时长 | 曲线 | 备注 |
|------|------|------|------|
| 面板入场 | 400ms | ease-out,opacity + scale(0.94→1) | 弹入 |
| 按钮悬浮 | 160ms | ease-out | 颜色 + 辉光增强 |
| 状态切换 | 280ms | ease-in-out | 颜色 |
| 数值变化 | 360ms | ease-out | 平滑跳变 |
| 辉光脉冲 | 2400ms | ease-in-out infinite | 0.8↔1.2 强度 |
| 太阳渐变扫描 | 4000ms | linear infinite | 渐变上移 |
| 网格向后移动 | 2000ms | linear infinite | 透视网格向后 |
| 故障态 | 100ms × 3 | ease-in-out | RGB 抖动 |
| 加载 | n/a | n/a | 扫描线扫过 |

**原则**: 中等时长,辉光必须脉冲(让 UI"活"起来)。网格透视必须缓慢移动(Outrun 标志)。

## 10. 状态语义

| 状态 | 视觉差 |
|------|--------|
| Normal | 主样式(Magenta/Cyan + 辉光) |
| Hover | 辉光强度 × 1.5 + 颜色互换 |
| Active | scale(0.96) + 辉光强度 × 2 |
| Disabled | opacity 0.4 + 无辉光 |
| Selected | Sun Yellow 边框 + 黄辉光 |
| Loading | 扫描线扫过 |

## 11. 可程序化生成参数表

| 参数 | 类型 | 范围 | 默认值 | 说明 |
|------|------|------|--------|------|
| `palette` | enum | miami/cyber/outrun/dreamwave | miami | 调色板 |
| `bg` | HEX | 深色 | `#090014` | 屏幕底 |
| `surface` | HEX | 紫 | `#1A0B2E` | 面板底 |
| `primary` | HEX | Neon | `#FF00FF` | 主强调 |
| `secondary` | HEX | Neon | `#00FFFF` | 副强调 |
| `text` | HEX | 白 | `#FFFFFF` | 主文本 |
| `border` | HEX | Neon | `#FF00FF` | 边框色 |
| `glowColor` | HEX | Neon | `#FF00FF` | 辉光色 |
| `glowIntensity` | float | 0-2 | 1.0 | 辉光倍率 |
| `glowLayers` | int | 1-4 | 2 | 辉光层数 |
| `scanlineOpacity` | float | 0-0.3 | 0.15 | 扫描线透明度 |
| `scanlineSpacing` | int px | 1-4 | 2 | 扫描线间距 |
| `crtNoiseOpacity` | float | 0-0.15 | 0.05 | CRT 噪点 |
| `enableGrid` | bool | - | true | 透视网格 |
| `gridSpeed` | float | 0-3 | 1.0 | 网格移动速度 |
| `gridColor` | HEX | - | `#FF00FF` | 网格色 |
| `enableSunGradient` | bool | - | true | 太阳渐变 |
| `sunGradient` | gradient | - | see palette | 太阳渐变值 |
| `borderRadius` | int px | 0-8 | 2 | 圆角 |
| `fontDisplay` | string | display | `Bebas Neue, sans-serif` | 标题字体 |
| `fontBody` | string | sans | `Poppins, sans-serif` | 正文字体 |
| `fontMono` | string | mono | `IBM Plex Mono, monospace` | Mono 字体 |
| `panelEntryDuration` | int ms | 300-500 | 400 | 面板入场 |
| `glowPulseDuration` | int ms | 1500-3000 | 2400 | 辉光脉冲 |
| `rgbOffsetStrength` | int px | 0-4 | 2 | RGB 偏移 |
| `useUppercase` | bool | - | true | Display 大写 |

## 12. 不做什么(反例)

1. ❌ **不要** 用低饱和色 — 必须 100% 饱和
2. ❌ **不要** 不用辉光 — 辉光是核心
3. ❌ **不要** 用阴影替代辉光 — 阴影是 Brutalist 范畴
4. ❌ **不要** 用玻璃/透明叠加(会吃掉辉光)
5. ❌ **不要** 用现代柔和配色(暖白/米黄) — 必须霓虹
6. ❌ **不要** 用 Serif/手写/像素字体
7. ❌ **不要** 用细字体(weight < 400)
8. ❌ **不要** 用小字号标题 — 必须 56px+
9. ❌ **不要** 静态网格 — 透视网格必须移动
10. ❌ **不要** 用低对比 — 必须暗底亮霓虹,极端对比

## 13. 可生成部件清单

- HUD 元素:HP/Mana 条(带辉光)
- HUD 元素:大字号数值显示(Display 字体 + 辉光)
- HUD 元素:小地图 + 雷达扫描
- HUD 元素:敌人标记(三角形 + Neon 色)
- 按钮:主/次/危险(全部带辉光)
- 面板:主菜单(中央标题 + 太阳渐变背景)
- 面板:装备详情(渐变条 + 霓虹边)
- 菜单:列表项(每项 hover 辉光切换)
- 模态:确认对话框(全息风)
- 列表:行项(分隔线带渐变)
- 标签:chip/badge(带辉光)
- 数值:大数字 + 辉光
- 进度条:渐变填充 + 辉光
- 加载:扫描线扫过
- 提示:toast(右下角,Neon 边框 + 辉光)
- 状态:Buff 图标(霓虹边框)
- 背景:透视网格 + 太阳渐变(场景元素)

---

**使用提示**: Synthwave 核心是"从过去看未来的炫目"。辉光是生命,没有辉光就不是 Synthwave。生成时:
1. 先设计背景层(太阳渐变 + 透视网格)
2. 再设计主交互元素(必须辉光)
3. 最后加 CRT 残影(扫描线 + 噪点)
4. 永远不要"少一层辉光",因为饱和辉光是核心识别度。

避免与 Cyberpunk HUD 混淆:Synthwave 偏暖(粉/橙/紫)、Cyberpunk 偏冷(青/红/黑)。Synthwave 是复古未来乐观想象,Cyberpunk 是赛博朋克悲观想象。