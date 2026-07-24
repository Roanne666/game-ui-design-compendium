# Style 07 — Survival Horror

## 1. 风格定位

**diegetic HUD、伪实景、神秘、不安、克制的医疗/工程仪表**。代表作:Dead Space、Resident Evil 2/3/4 Remake、Resident Evil 7、Silent Hill 2 Remake、Alien Isolation、The Last of Us、Soma、Amnesia。

UI 大量"diegetic"(in-world):健康显示在角色脊柱上(Dead Space 经典),物品栏是 3D 旋转模型(RE4),手表显示时间(Metro 2033)。HUD 元素越少越好,玩家靠音效、视觉氛围、上下文判断状态。

## 2. 适用游戏类型

**适合**
- 类型:生存恐怖、资源稀缺探索、压迫氛围动作
- 典型玩法:脊柱/手表生命、有限背包格谜题、门禁读卡
- 代表作:见风格定位

**不适合**
- 高饱和卡通射击商店
- 赛博霓虹信息过载
- JRPG 斜切海报主菜单

**本风格推荐场景包**
- 主场景:`library/packs/07-survival-horror/index.html`（9:20）
- 布局原型:几乎无常驻条；底一枚背包入口；资源在 spine/背包模态
- 核心玩法:打开背包管理资源；世界内紧张探索（门锁 / 钥匙）
- HUD 语汇:稀疏 diegetic、钢框 RIG、无网页按钮栏；见 `docs/rules/game-feel-vs-web.md`
- 扩展:门禁读卡、磁带提示

## 3. 视觉关键词

diegetic、伪实景、稀缺、低光、暗绿、医疗、紧急、不安、警告、极简、隐藏、限制造型、生锈、grime、磁带、CRT、笔记本、手电、残破。

## 4. 色彩系统

**默认调色板(Dead Space 风)**:

| 角色 | 颜色 | HEX | 用法 |
|------|------|-----|------|
| 主色 1 | Stencil Blue | `#3B5570` | 主强调、医疗信号、HUD 激活 |
| 主色 2 | Bone White | `#D8D0BC` | 主文本、stencil 文字 |
| 主色 3 | Deep Black | `#0A0A08` | 屏幕底 |
| 辅色 1 | Hazard Amber | `#D89830` | 警告、低光 |
| 辅色 2 | Infection Green | `#5BA85B` | 安全、护盾、生物信号 |
| 辅色 3 | Blood Red | `#A03838` | 危险、低生命、敌人 |
| 辅色 4 | Rust Brown | `#7A4A28` | 金属、装饰、复古 |
| 辅色 5 | Steel Grey | `#5A5A55` | 边框、次要文本 |
| 语义 | Danger | `#A03838` | 危险 |
| 语义 | Caution | `#D89830` | 警告 |

**替代调色板(Resident Evil 风)**:
- 主色 1: Vintage Cream `#E8DCC0`(笔记本、文件)
- 主色 2: Ink Black `#0A0A0A`
- 主色 3: Stencil Blue `#3B5570`
- 强调: Blood Red `#A03838`

**配色原则**:
- 全局暗调(80% 视觉面积)
- 蓝/青/绿是"科技/安全"信号,红是"危险",琥珀是"警告"
- 避免鲜艳色,所有颜色饱和度<70%
- 文本:骨白/暖白,不用纯白(过亮)
- 单色强调:Stencil Blue 是主交互

## 5. 几何与构图

- **圆角**: 0-4px(锐利,工业感)
- **边框**: 1-2px Stencil Blue,常带 stencil 切口(角部凹槽)
- **网格**: 严格,但允许 grime 纹理覆盖
- **HUD 锚点**: 极小,通常只有 1-2 个元素(玩家脊柱血条 + 弹药数)
- **面板锚点**: 屏幕中下/左下/右下,模拟"手持设备"
- **菜单**: 模拟实物(笔记本、磁带、武器箱)
- **物品**: 3D 旋转模型(RE4 Attache Case)

## 6. 边框与容器

**面板(医疗/工程风)**:
- 背景 `rgba(10, 10, 8, 0.85)` 或纯深色
- 1px Stencil Blue 边框
- 角部 stencil 切口:`clip-path: polygon(0 8px, 8px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 20px 100%, 0 calc(100% - 20px))` (模拟螺栓切口)
- 可选:角部小圆点(模拟铆钉/螺丝)
- 装饰:横向 stencil 文字"H.E.V. SUIT" / "MEDICAL SCANNER" / "AUDIO LOG"

**按钮**:
- 默认: 透明底 + 1px Stencil Blue 边 + Bone White 文本
- 字体: Stencil / 装饰体 / mono
- 悬浮: 背景 Stencil Blue 15% + 边框 2px
- 按下: 背景 Stencil Blue 25%
- 禁用: Steel Grey 边 + Steel Grey 文本

**进度条**:
- 极简:8-12px 高,1px Stencil Blue 边
- 轨道:近黑
- 填充:Stencil Blue(HP) / Infection Green(护盾) / Blood Red(低血)
- 无文字
- 边角可斜切(模拟金属边框)
- **Diegetic 版本**:直接渲染在角色骨骼上(Dead Space)

**血条(Dead Space 经典)**:
- 渲染在角色脊柱背面
- 5 段发光横条(等距)
- 健康时蓝色,警告时变橙,危险时变红
- 不占据屏幕空间,完全融入角色

**卡片(笔记本/文件)**:
- 背景 Vintage Cream (RE 笔记本风)
- 边框 1px Ink Black
- 内文:手写感字体 + 涂改 + 污渍
- 模拟真实笔记本翻页效果

**物品栏(RE4 风格)**:
- 3D Attache Case 渲染
- 物品以 3D 模型在格子里旋转
- 围绕一个平面阵列

## 7. 文字与排版

- **字体族**:
  - Display: Stencil(`Stencil Std`、`Allerta Stencil`、`Black Ops One`)
  - Body: Sans(`Inter`、`Rajdhani`)或 typewriter(`Special Elite`、`Courier Prime`)
  - Diegetic: 装饰 stencil / military
- **Display**: Stencil,weight 400,letter-spacing: 0.15em,uppercase
- **正文**: Sans weight 400-500,line-height 1.5
- **HUD 标签**: Stencil,uppercase,letter-spacing: 0.2em,字号 11-13px
- **数字**: Mono,tabular-nums
- **笔记本文字**: 手写感 typewriter
- **大小**: HUD 11-14px / 正文 14-16px / 标题 18-28px / Hero 32-48px
- **大小写**: HUD 全大写,正文小写
- **字符限制**: HUD 极短(只有状态文本)

## 8. 光影与质感

- **辉光**: 极弱,仅在医疗扫描 / 信号激活时用
- **阴影**: 软阴影,`box-shadow: 0 4px 12px rgba(0,0,0,0.7)`(营造深邃)
- **grime 纹理**: SVG turbulence 灰度噪点,opacity 0.08-0.15,模拟污渍/锈迹
- **金属**: linear-gradient 模拟拉丝金属(`#3B5570 → #2A3D55 → #3B5570`)
- **CRT/磁带**: 可选扫描线,opacity 0.05-0.10
- **血渍**: SVG filter `turbulence + displacement`,模拟有机污渍
- **低光 vignette**: 屏幕四周暗角
- **手电效果**: 中心亮、四周暗的径向渐变

## 9. 动效原则

| 动作 | 时长 | 曲线 | 备注 |
|------|------|------|------|
| 面板入场 | 480ms | ease-out,opacity + scale(0.95→1) | 缓慢浮现 |
| 按钮悬浮 | 200ms | ease-out | 慢半拍 |
| 状态切换 | 320ms | ease-in-out | 颜色和边框 |
| 数值变化 | 480ms | ease-out | 数值滚动到位 |
| 血条变化 | 600ms | ease-out | 缓慢减少(模拟"受伤反应") |
| 心电图 | 1000ms | linear infinite | 持续脉冲(医疗仪风) |
| 笔记本翻页 | 400ms | ease-out | 翻页动效 |
| 警告闪烁 | 800ms | step(2) infinite | 0.8s 切换 |
| 物品旋转 | 8000ms | linear infinite | 极慢 3D 旋转 |
| 屏幕抖动 | 80ms × 4 | step | 受伤瞬间 |
| 手电闪烁 | 200ms | step(2) infinite | 电池耗尽时 |

**原则**: 整体偏慢(200-600ms)。极简 diegetic 风格,玩家在紧张中没时间看动效。闪烁仅用于真正紧急(敌人接近/受伤)。

## 10. 状态语义

| 状态 | 视觉差 |
|------|--------|
| Normal | Stencil Blue 边 + Bone White 文本 |
| Hover | 背景 Stencil Blue 15% + 边框 2px |
| Active | 背景 Stencil Blue 30% + 微辉光 |
| Disabled | Steel Grey 边 + Steel Grey 文本 |
| Selected | Stencil Blue 边框 + 内背景 Stencil Blue 20% |
| Warning | Hazard Amber 边 + 文本 + 0.8s 闪烁 |
| Danger | Blood Red 边 + 文本 + 0.6s 闪烁 |
| Loading | Stencil 文本 typewriter + 扫描线扫过 |

## 11. 可程序化生成参数表

| 参数 | 类型 | 范围 | 默认值 | 说明 |
|------|------|------|--------|------|
| `bg` | HEX | 近黑 | `#0A0A08` | 屏幕底 |
| `surface` | HEX | 深色 | `#1A1816` | 面板底 |
| `panelBg` | rgba | - | `rgba(10,10,8,0.85)` | 半透明面板 |
| `stencil` | HEX | 蓝 | `#3B5570` | 主交互色 |
| `bone` | HEX | 暖白 | `#D8D0BC` | 主文本 |
| `textMuted` | HEX | 灰 | `#5A5A55` | 次文本 |
| `amber` | HEX | - | `#D89830` | 警告 |
| `green` | HEX | - | `#5BA85B` | 安全/护盾 |
| `red` | HEX | - | `#A03838` | 危险/低血 |
| `borderWidth` | int px | 1-2 | 1 | 边框粗细 |
| `stencilCut` | int px | 4-24 | 12 | stencil 切口大小 |
| `borderRadius` | int px | 0-4 | 0 | 圆角(几乎 0) |
| `fontStencil` | string | stencil | `Allerta Stencil, sans-serif` | Stencil 字体 |
| `fontBody` | string | sans | `Inter, sans-serif` | 正文字体 |
| `fontTypewriter` | string | typewriter | `Courier Prime, monospace` | 打字机字体 |
| `grimeOpacity` | float | 0-0.3 | 0.10 | 污渍透明度 |
| `vignetteStrength` | float | 0-1 | 0.6 | 暗角强度 |
| `enableFlashlight` | bool | - | false | 启用手电效果 |
| `enableCRT` | bool | - | false | 启用 CRT 扫描线 |
| `enableBloodSpatter` | bool | - | false | 启用血渍纹理 |
| `crtOpacity` | float | 0-0.15 | 0.05 | CRT 扫描线透明度 |
| `useHeartbeat` | bool | - | true | 心电图脉冲 |
| `heartbeatInterval` | int ms | 800-1200 | 1000 | 心跳间隔 |
| `useSlowMotion` | bool | - | false | 受伤慢动作 |
| `diegeticMode` | bool | - | false | diegetic HUD(血条渲染在角色) |
| `paperTexture` | float | 0-0.2 | 0.08 | 笔记本纸张纹理 |
| `bloodSpatterOpacity` | float | 0-0.3 | 0.12 | 血渍透明度 |

## 12. 不做什么(反例)

1. ❌ **不要** 显示大量 HUD 元素 — 必须极简
2. ❌ **不要** 用饱和鲜艳色 — 必须低饱和
3. ❌ **不要** 用霓虹/发光/扫描线 — 完全相反风格
4. ❌ **不要** 用 Sans 圆润字体 — 必须 Stencil/Mono/Typewriter
5. ❌ **不要** 用圆角 > 4px
6. ❌ **不要** 用快速动效(< 200ms) — 整体偏慢
7. ❌ **不要** 在面板外加大面积装饰 — 装饰限于角部
8. ❌ **不要** 用现代平面/极简风格 — 必须有 grime/质感
9. ❌ **不要** 用纯白文本 — 用骨白(#D8D0BC)更柔和
10. ❌ **不要** 在屏幕上到处放 icon — icon 限于 diegetic 来源(手持设备/角色身上)

## 13. 可生成部件清单

- HUD 元素:diegetic 血条(渲染在角色脊柱上)
- HUD 元素:极简弹药/资源(右下角 stencil 数字)
- HUD 元素:医疗扫描 HUD(脉冲圆环 + 信号读数)
- HUD 元素:无线电/Audio Log 指示器
- HUD 元素:低血警告(屏幕暗角变红 + 心跳声图标)
- HUD 元素:毒气/缺氧指示器(面具 UI, 模拟物理)
- HUD 元素:手电电池指示器
- HUD 元素:敌人接近雷达(脉冲同心圆)
- 按钮:动作按钮(短动作名,stencil)
- 面板:物品栏(3D 物品箱 / 笔记本)
- 面板:地图(笔记本手绘地图,粗糙纸张)
- 面板:武器/装备(3D 模型旋转 + 物理库存)
- 面板:文档/文件(笔记本翻页效果)
- 菜单:主菜单(低光,恐惧氛围)
- 模态:确认对话框(医疗仪/工程仪风)
- 数值:距离/角度/时间(等宽数字 + 单位)
- 数值:伤害数字(短暂浮现,blood red)
- 数值:经验/弹药拾取
- 加载:打字机文字 + 扫描线
- 警告:毒气/缺氧/低血(全屏 0.8s 闪烁)

---

**使用提示**: 此风格核心是"稀缺 + 不安"。HUD 元素越少越好,玩家需要在紧张中靠自己判断状态。diegetic 是终极目标(玩家脊柱上的血条、手表、角色手持设备),但允许 diegetic-flavoured(医疗仪/工程仪风的非 diegetic UI)。grime/vignette/手电效果是氛围关键。