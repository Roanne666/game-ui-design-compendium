# Style 09 — Tactical Military

## 1. 风格定位

**战术、实用、克制、信息密度优先**。代表作:Escape from Tarkov、ARMA、SOCOM、Insurgency:Sandstorm、Rainbow Six Siege HUD、Ghost Recon、Arma Reforger UI。

UI 是工具,不是装饰。所有元素服务于任务。玩家在战斗中需要快速读取信息,任何装饰都是干扰。配色偏暗/偏单一色调(常见暗绿或暗棕),字体偏 sans/mono,信息密度极高。

## 2. 适用游戏类型

**适合**
- 类型:战术射击、军事模拟、硬核撤离射击
- 典型玩法:弹药/姿态 HUD、战术地图标记、小队指令条
- 代表作:见风格定位

**不适合**
- 霓虹 Synthwave/Cyberpunk 装饰 HUD
- 手绘叙事契约卡
- 卡通厚边喜剧商店

**本风格推荐场景包**
- 主场景:`tactical-hud.html`（9:20）
- 布局原型:顶罗盘短讯；角小雷达；姿态/掩体 + 开火分区
- 核心玩法:切姿态 → 瞄准辅助 → 开火
- 扩展:战术地图、小队指令

## 3. 视觉关键词

战术、实用、信息密度、单色、暗调、字段化、stencilled、网格、坐标、读图、设备、军规、低光、清晰、精确、可靠、贫信息、ANSI。

## 4. 色彩系统

**默认暗绿调色板(Tarkov-Inspired)**:

| 角色 | 颜色 | HEX | 用法 |
|------|------|-----|------|
| 主色 1 | Tactical Green | `#5A6E3B` | 主色调、EFT 绿 |
| 主色 2 | Dark Olive | `#3A4527` | 背景 |
| 辅色 1 | Khaki | `#7A7548` | 边框、文字 |
| 辅色 2 | Bone White | `#C8C0A0` | 文本、激活 |
| 辅色 3 | Charcoal | `#1F1F1C` | 深背景、面板底 |
| 文本 1 | Off White | `#D4CFB8` | 主文本 |
| 文本 2 | Grey | `#8B8675` | 次要文本 |
| 语义 | HP Red | `#A03A2E` | 血量、低生命 |
| 语义 | Info Blue | `#5078A8` | 信息、盟友 |
| 语义 | Caution Yellow | `#C8A028` | 警告、Buff |
| 语义 | Success Green | `#5A8048` | 完成、成功 |
| 警告 | Alert Orange | `#C86838` | 紧急 |

**替代调色板(沙漠/灰)**:
- 沙色调:背景 `#4A3D2E`、文本 `#D4C098`、强调 `#C86838`
- 城市灰:背景 `#2A2A2A`、文本 `#C8C8C8`、强调 `#5078A8`
- 雪地白:背景 `#1F2030`、文本 `#E8E8F0`、强调 `#5078A8`

**配色原则**:
- 主导单色色调(绿/棕/灰),饱和度 30-60%
- 全局低对比背景(避免屏幕过亮导致眼睛疲劳)
- 状态色仅用于紧急/关键信息
- 文本不用纯白,用偏暖白(Off White)
- 单一强调色(暗绿或暗蓝),不混用

## 5. 几何与构图

- **圆角**: 0-2px(几乎全直角)
- **边框**: 1-2px 暗绿/橄榄色实线
- **网格**: 严格,信息字段化排布
- **HUD 锚点**: 四角固定,允许大量小模块
- **面板锚点**: 屏幕中央或左侧,带横向滚动
- **字段**: 信息按"行+列"组织,像表单
- **分隔线**: 暗色细线 1px
- **数字对齐**: 等宽数字右对齐,tabular-nums
- **密度**: 高密度,屏幕信息量优先

## 6. 边框与容器

**面板**:
- 背景 `rgba(31, 31, 28, 0.92)` 或纯 Charcoal
- 1px Khaki 边框
- 角部几乎无圆角(2px max)
- 无阴影(避免干扰)
- 标题条: 顶部 24px 高,Khaki 背景 + Bone White 标题
- 可选: 角落标注 ID/编号/坐标

**按钮**:
- 默认: 暗绿/橄榄底 + Khaki 文本 + 1px 暗边
- 悬浮: 背景加亮 1 色阶 + 文字变 Bone White
- 按下: 背景变深 1 色阶
- 禁用: 全灰阶 + 文本 #555

**进度条(HP/Status)**:
- 极简: 8-12px 高,1px 暗边
- 轨道: 深灰底
- 填充: 暗绿(Tarkov 风)或 HP Red(低血)
- 无文字标签在条上,数值独立显示
- 可选:刻度分 4 段(0/25/50/75/100)

**卡片(物品/装备)**:
- 背景 Charcoal + 1px Khaki 边
- 内部按字段排列(名称/类型/数值/描述)
- 无图标装饰,纯文本 + 数字
- 可选:左/右上角放小分类标签

**状态指示**:
- 圆点 4-8px(可用方形代替,军事感)
- 颜色:Tactical Green / HP Red / Info Blue
- 不闪烁(战场不分散注意力)

## 7. 文字与排版

- **字体族**: Sans(military 感)+ Mono 数字
- **Sans**: Inter、Roboto、Saira Condensed、`-apple-system, sans-serif`
- **Mono**: JetBrains Mono、IBM Plex Mono、`ui-monospace, monospace`
- **标题**: Weight 500-600,letter-spacing: 0.08em,uppercase
- **正文**: Weight 400,line-height 1.4
- **HUD 标签**: Weight 500,字号 10-12px,uppercase
- **数字**: Mono,tabular-nums,等宽右对齐
- **大小**: HUD 10-12px / 正文 13-15px / 标题 18-24px / 关键数值 32-48px
- **数字单位**: 小字号紧贴数字右侧,如 `100 m` / `30 s`
- **字符限制**: 描述允许长段,但允许截断 + "..."

## 8. 光影与质感

- **辉光**: 不用
- **阴影**: 不用 box-shadow(避免战场干扰)
- **玻璃**: 不用
- **噪点**: 极轻,opacity 0.02-0.05,模拟 CRT/低光环境
- **渐变**: 不用
- **纹理**: 可选军规布料纹理(opacity 0.05),极轻
- **颗粒**: 可选 SVG noise filter,低强度
- **整体**: 干净、信息优先、零装饰

## 9. 动效原则

| 动作 | 时长 | 曲线 | 备注 |
|------|------|------|------|
| 面板入场 | 160ms | linear,opacity + translateY(4px) | 快速、无干扰 |
| 按钮悬浮 | 80ms | linear | 即时 |
| 状态切换 | 120ms | linear | 即时 |
| 数值变化 | 200ms | linear | 平滑跳变 |
| 加载 | n/a | n/a | 通常无加载动画或仅进度条 |
| 警告闪烁 | 800ms | step(2) infinite | 紧急情况 0.8s 切换 |
| HUD 浮现 | 240ms | linear | 数据变化时短暂显示 |

**原则**: 动效极快极简,linear 为主。战场上无时间看动效。闪烁仅用于真正紧急(低血/被发现)。

## 10. 状态语义

| 状态 | 视觉差 |
|------|--------|
| Normal | 标准暗绿/橄榄样式 |
| Hover | 背景 +1 色阶 |
| Active | 背景 -1 色阶 + 文字加粗 |
| Disabled | opacity 0.4 |
| Selected | 左侧 2px Tactical Green 条 + 背景 +1 色阶 |
| Loading | 进度条线性推进 |
| Error | HP Red 文字 + 边框 |

## 11. 可程序化生成参数表

| 参数 | 类型 | 范围 | 默认值 | 说明 |
|------|------|------|--------|------|
| `palette` | enum | green/desert/grey/urban/snow | green | 调色板 |
| `primary` | HEX | - | `#5A6E3B` | 主色调 |
| `bg` | HEX | - | `#1F1F1C` | 屏幕底 |
| `surface` | HEX | - | `#2A2A26` | 面板底 |
| `border` | HEX | - | `#7A7548` | 边框色 |
| `text` | HEX | - | `#D4CFB8` | 主文本 |
| `textMuted` | HEX | - | `#8B8675` | 次文本 |
| `hp` | HEX | - | `#A03A2E` | 血量色 |
| `info` | HEX | - | `#5078A8` | 信息色 |
| `borderWidth` | int px | 0-2 | 1 | 边框粗细 |
| `borderRadius` | int px | 0-2 | 0 | 圆角(几乎为 0) |
| `fontFamily` | string | sans | `Inter, sans-serif` | 主字体 |
| `monoFontFamily` | string | mono | `JetBrains Mono, monospace` | 等宽字体 |
| `useMonoForNumbers` | bool | - | true | 数字用 mono |
| `textUppercase` | bool | - | true | HUD 标签大写 |
| `letterSpacing` | float | 0-0.15 | 0.08 | letter-spacing |
| `panelEntryDuration` | int ms | 80-200 | 160 | 面板入场 |
| `buttonHoverDuration` | int ms | 0-120 | 80 | 按钮 hover |
| `useBlinkForCritical` | bool | - | true | 紧急闪烁 |
| `blinkInterval` | int ms | 600-1000 | 800 | 闪烁间隔 |
| `useStencilFont` | bool | - | false | 是否使用 stencilled 字体 |
| `enableCRTNoise` | bool | - | false | CRT 噪点(可选) |
| `noiseOpacity` | float | 0-0.1 | 0.03 | 噪点透明度 |

## 12. 不做什么(反例)

1. ❌ **不要** 用任何装饰性元素 — 装饰 = 干扰
2. ❌ **不要** 用饱和鲜艳色 — 必须低饱和
3. ❌ **不要** 用霓虹/发光/玻璃
4. ❌ **不要** 用阴影或浮起效果
5. ❌ **不要** 用大字号装饰文字 — 字号服务于可读性
6. ❌ **不要** 用 Serif/手写/装饰字体
7. ❌ **不要** 用圆角 > 2px
8. ❌ **不要** 用动画时长 > 200ms — 战场不分神
9. ❌ **不要** 用弹跳/回弹/夸张动效
10. ❌ **不要** 在 HUD 上加插图/图像背景

## 13. 可生成部件清单

- HUD 元素:HP/Status/Stamina 短条
- HUD 元素:弹药计数(当前/最大,等宽数字)
- HUD 元素:小地图 + 坐标 + 方位
- HUD 元素:指南针 + 朝向
- HUD 元素:Buff/Debuff 状态列表(行式)
- HUD 元素:队友/队伍状态(行式)
- HUD 元素:威胁标记(圆形/方形点)
- 按钮:动作按钮(简短动作名,uppercase)
- 面板:装备清单(字段化)
- 面板:物品栏(网格 + 数值,无图标)
- 面板:任务列表(序号 + 名称 + 距离)
- 面板:地图(网格 + 坐标标记)
- 模态:确认对话框(简短文字 + Yes/No)
- 数值:距离/角度/速度(等宽数字 + 单位)
- 数值:伤害数字(简短弹出,1s 消失)
- 数值:击杀/死亡日志(行式滚动)
- 加载:线性进度条
- 警告:紧急状态(全屏低频闪烁)

---

**使用提示**: 此风格核心是"无存在感"。最好用的 UI 是玩家在战斗中意识不到它的存在。需要时一眼看到,不需要时完全隐藏。生成时优先信息密度,任何"美观"的诱惑都需让步于"清晰"。