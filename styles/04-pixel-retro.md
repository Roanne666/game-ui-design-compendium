# Style 04 — Pixel Retro

## 1. 风格定位

**8/16-bit 像素风,严格网格、有限调色板、零抗锯齿**。代表作:Final Fantasy 系列(PRE-13)、Dragon Quest、Shovel Knight、Celeste、Stardew Valley、Undertale、Terraria。

每像素有意义。颜色受限(典型 16 色 NES/SNES 调色板)。所有 UI 必须按整数像素对齐。字体、图标、边框全部由像素点构成。

## 2. 适用游戏类型

**适合**
- 类型:2D 像素 RPG、平台跳跃、农场/沙盒复古风
- 典型玩法:战斗指令窗、背包格、对话框、世界地图瓷砖 UI
- 代表作:见风格定位

**不适合**
- 写实军事 HUD
- 玻璃拟态 OS 风面板
- 高分辨率写实恐怖 diegetic

**本风格推荐场景包**
- 主场景:`library/scenes/04-pixel-retro/index.html`（9:20）
- 布局原型:上半战场；下半指令窗
- 核心玩法:点指令——攻击 / 技能 / 道具 / 逃跑（含胜负再战闭环）
- 扩展:主菜单、背包格阵

## 3. 视觉关键词

像素、8-bit、16-bit、有限调色板、网格对齐、零抗锯齿、点阵字体、抖动混色(dither)、复古、SNES、NES、Game Boy、PICO-8、瓷砖拼接。

## 4. 色彩系统

**默认调色板:PICO-8(16 色)**

| # | 名称 | HEX | 角色 |
|---|------|-----|------|
| 0 | Black | `#000000` | 边框、文字、深背景 |
| 1 | Dark Blue | `#1D2B53` | 主背景 |
| 2 | Dark Purple | `#7E2553` | 装饰 |
| 3 | Dark Green | `#008751` | 主色/Health |
| 4 | Brown | `#AB5236` | 木质边框 |
| 5 | Dark Grey | `#5F574F` | 阴影、次要文本 |
| 6 | Light Grey | `#C2C3C7` | 边框、面板 |
| 7 | White | `#FFF1E8` | 文字、激活 |
| 8 | Red | `#FF004D` | 警告、低血 |
| 9 | Orange | `#FFA300` | 强调 |
| 10 | Yellow | `#FFEC27` | 文字高亮 |
| 11 | Green | `#00E436` | 成功/Mana |
| 12 | Blue | `#29ADFF` | 信息 |
| 13 | Lavender | `#83769C` | 装饰 |
| 14 | Pink | `#FF77A8` | Buff、强调 |
| 15 | Peach | `#FFCCAA` | 皮肤色 |

**替代调色板**:
- NES: 54 色但 sprite 内最多 4 色(3 + 透明)
- SNES: 256 色,sub-palette 15+1
- Game Boy: 4 阶绿 `#0F380F / #306230 / #8BAC0F / #9BBC0F`
- Sweetie 16: 更柔 16 色
- Endesga 32: 32 色经典 indie

**配色原则**:
- 严格使用调色板中的颜色,不允许插值或自定义色
- 同一画面不超过 16 种颜色
- sprite/图标内 3-4 色 + 透明
- 阴影用 1 个暗色色阶,而非透明度叠加
- 高亮用 1 个亮色色阶

## 5. 几何与构图

- **基础单位**: 1px(屏幕像素,渲染时按 scale 倍数缩放)
- **网格**: 严格对齐,所有元素位置/尺寸必须是 1px 倍数
- **基线**: 8x8 瓷砖网格,UI 单元以 8px 或 16px 为单位
- **圆角**: 0(直角像素)
- **边框**: 1px 或 2px 单像素线,纯色,角部像素对齐
- **HUD 锚点**: 顶部条 8-16px 高,左/右角对称
- **面板尺寸**: 8 像素倍数,常用 80x72、160x144、256x224
- **窗口位置**: 屏幕中或居中偏上,留 8px 安全边距
- **菜单布局**: 网格排列,每格固定大小

## 6. 边框与容器

**面板(9-slice)**:
- 角部 + 边 + 中心 9 块瓷砖拼接
- 外框: 2px 黑色实线
- 内填充: 调色板中的中等亮色
- 角部装饰: 2-3 像素的"砖块"或"金属铆钉"

**按钮**:
- 默认: 3 色填充(暗边/中底/亮顶高光),形成 3D 凸起感
- 悬浮: 整体亮 1 色阶
- 按下: 顶亮底暗反转,模拟按下
- 禁用: 全灰阶 2 色

**进度条**:
- 经典 3-段:左中右,中段重复填充
- 8x6 像素基本单元
- 单像素分割线
- 数值化:用像素数字叠加(可选)

**血条(经典 RPG)**:
- 100 格,每格 2x4 像素
- 当前血量整段着色,缺失部分留底色
- 低血(<25%)时闪烁红色

**图标**:
- 16x16 或 32x32 像素
- 1px 黑色外轮廓
- 内填 2-3 色
- 角部对齐 8x8 网格

## 7. 文字与排版

- **字体族**: Pixel bitmap font(Press Start 2P、PixelOperator、VT323)
- **正文字号**: 8px(屏幕像素,等效放大后 16-24px)
- **标题字号**: 16px
- **每字符宽**: 8px(pixel-perfect monospace)
- **行高**: 8px 或 16px 整数倍
- **字符集**: A-Z, 0-9, 基础符号
- **大小写**: 通常全部 uppercase
- **颜色**: 单一调色板色,常 Black on Light / White on Dark
- **字体粗细**: 单粗细,无 weight 变化
- **字符间距**: 0 或 1px,绝不用 letter-spacing > 2px

## 8. 光影与质感

- **辉光**: 不用
- **阴影**: 不用 box-shadow,用 1 像素暗色色块偏移模拟
- **抖动混色(Dithering)**:
  - 棋盘格:`█ ░` 2x2 交错
  - Bayer 矩阵:程序生成 4x4 / 8x8 矩阵
  - 用 2 种颜色交替,模拟中间色
- **瓷砖纹理**: 8x8 / 16x16 平铺,可程序生成(perlin 噪声 + 调色板量化)
- **粒子**: 单像素粒子,自由落体或抛物线
- **渐变**: 不允许 — 用色阶(2-3 个相邻调色板色阶)
- **金属/水面**: 调色板色阶 + 像素错位模拟动画

## 9. 动效原则

| 动作 | 时长 | 曲线 | 备注 |
|------|------|------|------|
| 面板入场 | 200ms | step(3) | 逐像素/逐行扫入,非平滑 |
| 按钮切换 | 80ms | step(1) | 即时切换,无渐变 |
| 文字逐字显示 | 50ms/字 | linear | 经典 RPG 风格 |
| 数值变化 | 80ms | step(2) | 跳变式 |
| 闪烁 | 500ms | step(2) infinite | 0.5s 切换可见性 |
| 走格移动 | 160ms | linear | 8x8 步进 |
| 瓦片地图渐变 | 200ms | step(4) | 8x8 块扫入 |

**原则**: 全部 step-based,无 ease。所有帧必须整数像素对齐。动画以 30fps 或 60fps 整数帧为基准(常见 6fps / 8fps / 12fps)。

## 10. 状态语义

| 状态 | 视觉差 |
|------|--------|
| Normal | 3 色 3D 凸起(暗边/中底/亮顶) |
| Hover | 整体加 1 色阶亮 |
| Active/Pressed | 反转 3D 方向(亮顶/中底/暗底) |
| Disabled | 单色灰阶 |
| Selected | 闪烁箭头 ▶(0.5s 切换) |
| Loading | 文字逐字打字机效果 |

## 11. 可程序化生成参数表

| 参数 | 类型 | 范围 | 默认值 | 说明 |
|------|------|------|--------|------|
| `palette` | enum | PICO8/NES/SNES/GB/Sweetie16/Endesga32/Custom | PICO8 | 调色板 |
| `pixelScale` | int | 1-8 | 4 | 像素放大倍数 |
| `baseUnit` | int px | 8/16/32 | 8 | 网格单位 |
| `fontFamily` | string | pixel font | `Press Start 2P, monospace` | 像素字体 |
| `fontSize` | int px | 8/16 | 8 | 像素字号 |
| `borderStyle` | enum | solid/double/ornament | solid | 边框样式 |
| `borderWidth` | int px | 1/2 | 2 | 边框宽 |
| `useDithering` | bool | - | true | 启用抖动混色 |
| `ditherPattern` | enum | bayer2/bayer4/bayer8/chess | bayer4 | 抖动模式 |
| `useShadowBlocks` | bool | - | true | 1px 偏移阴影块 |
| `panelCornerStyle` | enum | sharp/bevel/ornament | bevel | 角部样式 |
| `textAnimation` | enum | typewriter/instant | typewriter | 文字逐字显示 |
| `cursorBlinkRate` | int ms | 400-600 | 500 | 光标闪烁 |
| `frameRate` | int | 30/60 | 60 | 动画帧率 |
| `useScanlines` | bool | - | false | CRT 扫描线(可选复古滤镜) |
| `paletteSwapEnabled` | bool | - | false | 是否允许调色板交换 |
| `gridSnap` | bool | - | true | 强制网格对齐 |
| `antialiasing` | bool | - | false | 必须 false |
| `textureTileSize` | int px | 8/16 | 16 | 瓷砖大小 |

## 12. 不做什么(反例)

1. ❌ **不要** 启用抗锯齿 — 必须关闭 AA
2. ❌ **不要** 使用调色板外的颜色 — 严格 palette 内
3. ❌ **不要** 用 ease 曲线 — 全部 step
4. ❌ **不要** 用 sub-pixel 位置 — 必须整数像素
5. ❌ **不要** 用渐变 — 必须色阶
6. ❌ **不要** 用 box-shadow / glow — 用 1px 偏移色块
7. ❌ **不要** 用现代字体 — 像素 bitmap 字体
8. ❌ **不要** 用透明度 — 用调色板中的"半透明"色阶
9. ❌ **不要** 用超过 16 种颜色在同一画面
10. ❌ **不要** 用 32x24 这种非 8 倍数尺寸

## 13. 可生成部件清单

- HUD 元素:经典 3 段 HP/MP 条
- HUD 元素:小型 HP/Mana 数字(像素字)
- HUD 元素:顶部金币/经验计数器
- HUD 元素:小地图(像素 tile 拼接)
- 菜单:主菜单(竖列选项 + 闪烁箭头)
- 菜单:物品栏(网格布局,8x8 或 16x16 图标格)
- 菜单:装备栏(身体部位图示 + 装备格)
- 菜单:技能树(节点 + 像素连接线)
- 对话框:经典 RPG 对话框(底部署名条 + 文字逐字显示)
- 商店:列表 + 价格 + 数量选择
- 模态:确认对话框
- 数值:伤害数字(短暂弹出,像素字)
- 数值:经验/金币获得提示(经典 ↑ 数字 弹出)
- 状态:Buff/Debuff 图标(像素图标)
- 加载:瓷砖渐变扫入
- 战斗:Battle 菜单(FIGHT/MAGIC/ITEM/RUN)
- 地图:像素世界地图(瓦片拼接)
- 进度条:经典 100 格血条

---

**使用提示**: 像素风核心是"约束即美"。调色板越限制,视觉一致性越强。生成时强制所有坐标/尺寸/颜色都通过 palette 验证函数检查。整数像素是法律。