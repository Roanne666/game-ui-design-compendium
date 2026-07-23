# Style 01 — Cyberpunk HUD

## 1. 风格定位

**高对比、终端化、未来感 HUD**。信息密度 8/10,视觉冲击 9/10。代表作:Cyberpunk 2077、Deus Ex: Mankind Divided、Deus Ex: Human Revolution、Observer、Mirror's Edge Catalyst HUD。

根植于终端文化(开发者工具、monospace、暗色背景),后被游戏界合法化为交互设计语言(Deus Ex HR 2011,Cyberpunk 2077 2020)。

## 2. 适用游戏类型

**适合**
- 类型:赛博朋克 RPG、潜入/社交工程、近未来都市开放世界
- 典型玩法:植入增强、黑客小游戏、街头任务追踪、高密度信息 HUD
- 代表作:见风格定位

**不适合**
- 魂类极简沉浸(应用 Dark Fantasy)
- 儿童向卡通平台跳跃
- 写实军事战术射击(应用 Tactical Military)

**本风格推荐场景包**
- 主场景:`demo/scenes/01-cyberpunk-hud/index.html`（9:20 竖屏触控：图标主键、左冲刺/扫描、右开火+竖列次要、顶区帮助；四子方言布局不同）
- 操作准则:`research/synthesis/mobile-portrait-first.md`
- 扩展:义体商店、车载 HUD、对话选项条

## 3. 视觉关键词

终端、未来、扫描、霓虹、植入、信息过载、暗色、琥珀、CRT、闪烁、损坏、AR 覆盖、单色主导、军用、故障。

## 4. 色彩系统

| 角色 | 颜色 | HEX | 用法 |
|------|------|-----|------|
| 主色(Brand) | Neon Red | `#E60012` | 强调、活跃、军事、危险(CP2077 主红) |
| 主色(替代) | Amber Gold | `#F6C73B` | 文本、标记、Deus Ex 式琥珀 |
| 辅色 1 | Cyan | `#00FFFF` | 高亮、信息、副扫描层 |
| 辅色 2 | Magenta | `#FF00FF` | 危险、敌人标记、霓虹点缀 |
| 背景 1 | Near Black | `#0D0D0D` | 面板底 |
| 背景 2 | Deep Black | `#000000` | 屏幕底 |
| 背景 3 | Dark Red | `#2C0807` | 紧急面板底 |
| 语义 | Success | `#1DE780` | 通过/已连接 |
| 语义 | Warning | `#FDEF03` | 警告 |
| 语义 | Danger | `#FF3366` | 损坏/低生命 |

**配色原则**:
- 全局仅 1 个高饱和强调色(默认 Red,可选 Amber)
- 背景必须近黑,亮色面积<15%
- 文本双层:主文本 Amber Gold,次要文本 Cyan 50%
- 红色仅用于:活跃状态、危险、玩家相关、任务标记
- 蓝色仅用于:信息、盟友、辅助

## 5. 几何与构图

- **圆角**: 0-2px(尖锐为主,允许 1-2px 微圆角)
- **边框**: 1px 实线,常用 Cyan 或 Amber
- **网格**: 严格网格布局,基线 8px
- **HUD 锚点**: 四角固定,顶部小地图+时间,右上任务,左下血量,右下武器
- **HUD 弧度**: 可选 shader 弯曲(参照 CP2077),用 viewport 边缘曲率即可
- **面板锚点**: 大面板贴屏幕边缘,不悬浮中央
- **分割线**: 单像素水平/垂直线,带端点刻度(类似刻度尺)
- **Hud 单元**: 矩形单元 + 角部小三角装饰,标志"信息切片"

## 6. 边框与容器

**面板**:
- 背景 `rgba(13, 13, 13, 0.85)` + 1px Amber 边框
- 角部切角(可选): `clip-path: polygon(0 8px, 8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)` 制造未来感
- 可选 1px 内边框 Cyan 增加层

**按钮**:
- 默认: 透明背景 + 1px Amber 边框 + Amber 文本
- 悬浮: 背景变 Amber 10% + 文本变白 + 边框 1.5px
- 按下: 背景 Amber 30% + 1px Cyan 内描边
- 禁用: 边框/文本变 `#444`,无交互

**进度条(血条)**:
- 双层条:底层暗灰 + 当前层霓虹色
- 数值化刻度:每 25% 一个分段分隔
- 文本化数值:`HP 87/100` 紧贴条上方

**卡片/数据块**:
- 背景 `#0D0D0D` + 1px Amber 边 + 左上角 status 文本
- 右上角 ID/编号 mono 字

## 7. 文字与排版

- **字体族**: Monospace 优先(IBM Plex Mono、JetBrains Mono、Roboto Mono,fallback `monospace`)
- **Hero/数字**: Weight 700-800,letter-spacing: 0.05em,uppercase
- **正文**: Weight 400,line-height 1.5,允许小写
- **HUD 标签**: Weight 500,letter-spacing: 0.1em,uppercase,字号偏小
- **大小**: 标签 10-12px / 正文 14-16px / 大数字 24-48px / Hero 48-72px
- **数字字体变体**: 关键数值可使用 tabular-nums(等宽数字)对齐
- **字符限制**: 文本框宽度按字符数计算,不按像素

## 8. 光影与质感

- **辉光(Glow)**: Neon 色文本/边框配 `text-shadow: 0 0 8px <color>, 0 0 16px <color>`
- **扫描线**: 全屏 `::before` 覆盖,2px 间隔 1px 半透明黑线,opacity 0.15
- **CRT 噪点**: 全屏 `::after` 覆盖,SVG turbulence 滤镜,opacity 0.05
- **RGB 偏移**: 故障态 chromatic aberration,左右偏移 1-3px 红蓝通道
- **背景动态**: 缓慢移动的网格透视 + 远处数据流(可选)
- **阴影**: 0 0 12px <color> 仅用于发光元素;不用普通阴影
- **纹理**: 无纸纹/无颗粒,纯色 + 发光

## 9. 动效原则

| 动作 | 时长 | 曲线 | 备注 |
|------|------|------|------|
| 面板入场 | 320ms | ease-out,opacity 0→1 + translateY(8px→0) | 从底部滑入 |
| 按钮悬浮 | 120ms | linear | 即时响应,无延迟 |
| 状态切换 | 200ms | ease-in-out | 颜色/边框过渡 |
| 数值变化 | 480ms | ease-out | 滚动数字滚动到位 |
| 错误闪烁 | 600ms | steps(6, end) | 红光闪烁,steps 而非平滑 |
| 扫描线扫过 | 2400ms | linear infinite | 0%→100% 扫过屏幕 |
| 故障态 | 80ms 抖动 × 3 | ease-in-out | RGB 通道分离+位移 |
| 数据流 | 2000ms | linear infinite | 背景流向下 |

**原则**: 大部分交互即时(120-200ms),入场用中等时长,故障态用 steps 而非平滑。

## 10. 状态语义

| 状态 | 视觉差 |
|------|--------|
| Normal | 透明背景 + 1px Amber 边 + Amber 文本 |
| Hover | 背景 Amber 10% + 边框 1.5px + 文本白 |
| Active/Focus | 背景 Amber 25% + 1px Cyan 内描边 + 文本白 |
| Disabled | 边框 `#444` + 文本 `#444`,无 hover 反馈 |
| Loading | 边框脉冲:Cyan ↔ Amber,1500ms infinite |
| Error | 边框 Red + 背景 Red 20% + 故障抖动 80ms × 3 |
| Success | 边框 Green + 短暂 Green 辉光 |

## 11. 可程序化生成参数表

| 参数 | 类型 | 范围 | 默认值 | 说明 |
|------|------|------|--------|------|
| `primaryColor` | HEX | Neon 色 | `#E60012` | 主强调色 |
| `secondaryColor` | HEX | Neon 色 | `#F6C73B` | 主文本色 |
| `accentColor` | HEX | Neon 色 | `#00FFFF` | 信息/辅助色 |
| `background` | HEX | `#0-#1A` | `#0D0D0D` | 面板底色 |
| `surfaceOpacity` | float | 0.6-1.0 | 0.85 | 面板透明度 |
| `borderWidth` | int px | 0-3 | 1 | 边框粗细 |
| `borderColor` | HEX | Neon | `#F6C73B` | 边框色 |
| `cornerClip` | int px | 0-16 | 8 | 切角大小(可设 0 取消) |
| `fontFamily` | string | mono family | `JetBrains Mono, monospace` | 字体族 |
| `glowIntensity` | float | 0-2 | 1.0 | 辉光强度倍率 |
| `scanlineOpacity` | float | 0-0.3 | 0.15 | 扫描线透明度 |
| `scanlineSpacing` | int px | 1-4 | 2 | 扫描线间距 |
| `crtNoiseOpacity` | float | 0-0.15 | 0.05 | CRT 噪点透明度 |
| `enableGlitch` | bool | - | true | 是否启用故障抖动 |
| `glitchDuration` | int ms | 60-120 | 80 | 单次故障时长 |
| `panelEntryDuration` | int ms | 200-400 | 320 | 面板入场时长 |
| `buttonHoverDuration` | int ms | 80-160 | 120 | 按钮 hover 时长 |
| `useCurvedHud` | bool | - | false | HUD 边缘是否弯曲 |
| `dataStreamSpeed` | float | 0-3 | 1.0 | 背景数据流速度倍率 |
| `tabularNums` | bool | - | true | 数字是否等宽 |

## 12. 不做什么(反例)

1. ❌ **不要** 使用软阴影或模糊阴影 — 唯一阴影是辉光(glow),无 box-shadow blur
2. ❌ **不要** 使用圆角 > 4px — 保持尖锐感
3. ❌ **不要** 使用渐变填充 — 唯一允许的渐变是扫描线/网格背景
4. ❌ **不要** 使用 Serif 字体 — 全局 monospace
5. ❌ **不要** 在亮色背景上放文本 — 必须暗底亮字
6. ❌ **不要** 用超过 3 个霓虹色 — 主+辅+强调,再多就乱
7. ❌ **不要** 加纸纹/颗粒/手绘 — 工业感,非手工
8. ❌ **不要** 用平滑 ease 模拟故障 — 故障必须 steps 或抖动

## 13. 可生成部件清单

- HUD 元素:血条/蓝条/体力条(双层,带刻度)
- HUD 元素:小地图 + 时间 + 坐标
- HUD 元素:弹药计数器(当前/最大 + 武器图标位)
- HUD 元素:任务追踪(顶部条 + 复选框)
- HUD 元素:扫描高亮(敌人/物品标记)
- 按钮:主按钮、次按钮、危险按钮
- 面板:角色属性、库存、技能树
- 面板:对话/邮件/终端
- 模态:确认对话框、黑入小游戏提示
- 加载:扫描线扫过 + 数据流
- 弹窗:错误、警告、低生命警告(全屏红色脉冲)
- 数值:Tick 数字变化、百分比、距离显示

---

**使用提示**: 整套风格以"终端+植入显示"为核心。任何元素都可以想象成"玩家眼中植入芯片渲染出来的数据"。装饰要服务于"信息密集+功能优先"原则。