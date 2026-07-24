# Style 05 — Hand-drawn Illustrative

## 1. 风格定位

**手绘插画、墨线轮廓、颗粒纸感、有机笔触**。代表作:Hades(Supergiant)、Sea of Stars(Sabotage)、Brawlhalla、Ori and the Blind Forest、Gris、Hollow Knight。

UI 看起来像被绘制在羊皮纸/笔记本上,笔触粗细不均,边缘有抖动。所有线条由程序模拟手绘绘制算法生成(SVG path + noise distortion)。

## 2. 适用游戏类型

**适合**
- 类型:叙事动作、Roguelike 祝福/契约选择、手绘冒险
- 典型玩法:Boon 选择卡、对话立绘框、地图节点旅途
- 代表作:见风格定位

**不适合**
- 赛博终端故障 HUD
- 战术射击弹药读数
- 纯几何太空全息

**本风格推荐场景包**
- 主场景:`library/scenes/05-hand-drawn/index.html`（9:20）
- 布局原型:中部三选一恩赐卡；底确认 / 限次重抽
- 核心玩法:点选一张卡 → 确认铭刻 → 进入下一密室（可循环）
- 扩展:墨线对话、旅途地图节点

## 3. 视觉关键词

手绘、墨水、笔触、抖动、轮廓、插画、有机、不规则、温暖、羊皮纸、笔记本、油画、绘画、纹理、纸张、生命感、灵魂。

## 4. 色彩系统

**Hades 调色板(Stygian)**:

| 角色 | 颜色 | HEX | 用法 |
|------|------|-----|------|
| 主色 1 | Bone White | `#E8DCC4` | 背景、文本、徽章底 |
| 主色 2 | Stygian Gold | `#D9B36C` | 边框、强调 |
| 辅色 1 | Parchment | `#3A2E20` | 面板底、文本轮廓 |
| 辅色 2 | Olive Shadow | `#5C5440` | 阴影、二级文本 |
| 强调 1 | Olympian Red | `#8B3A2E` | 标题、活跃状态 |
| 强调 2 | Grecian Blue | `#3A5870` | 信息、Buff |
| 强调 3 | Forest Green | `#5C7548` | 成功 |
| 强调 4 | Underworld Purple | `#4A3854` | 装饰、稀有 |
| 墨水 | Pure Black | `#1A1410` | 轮廓线、核心文本 |
| 警告 | Blood Red | `#A03A2E` | 低血、警告 |

**Sea of Stars 调色板(Celestial)**:
- 调色板更亮、更多粉彩:Pink `#F4C2C2`、Mint `#B5D6B5`、Lavender `#C5B5D6`、Cream `#FFF4D6`、Sky Blue `#A5C5E5`

**配色原则**:
- 暖色调为主(70%),冷色作对比
- 颜色饱和度中等(30-60%),不用霓虹
- 颜色叠加有"层叠水彩"感,允许边缘渗色
- 阴影颜色不是黑色而是色调阴影(暖色阴影偏紫褐,冷色偏蓝)
- 永远有一层墨线轮廓(纯黑或近黑)

## 5. 几何与构图

- **圆角**: 12-20px,但边缘不规则(用 noise 扰动)
- **边框**: 2-3px 墨线 + 内部背景填充
- **网格**: 弱网格,允许 2-4px 偏移模拟手抖
- **HUD 锚点**: 左上 + 右下 + 底部中央,允许不规则
- **面板**: 自由形状,允许旋转 ±2°,边缘有 ink-bleed 效果
- **菜单**: 居中或偏心,带边框装饰(卷边/胶带/纸张撕裂效果)
- **不规则元素**: 卡片可能六边形或卷轴形,非纯矩形

## 6. 边框与容器

**面板**:
- 形状:不规则矩形,边缘 noise 扰动
- 2-3px 墨线 `#1A1410` 外边框
- 1-2px 内部高光(暖白色,模拟墨水下渗出)
- 背景:羊皮纸/木纹/帆布纹理(SVG filter: turbulence + displacement)
- 角部:卷边、缺角、撕裂等装饰(用 SVG path 描述)

**按钮**:
- 形状:圆角矩形但边缘抖动
- 默认:骨白底 + 2px 墨线 + 暗棕文本
- 悬浮:背景变暖黄 + 文本变主红
- 按下:墨线变粗 3-4px + 背景纹理变深
- 选中:左侧出现墨线箭头(或羽毛笔图标)

**进度条**:
- 外形:像手工画的瓶子或弓
- 填充:渐变模拟液体(水彩笔触)
- 端点:带塞子/羽毛装饰
- 文本:用羽毛笔字体的数字

**卡片(物品/装备)**:
- 形状:矩形但 4 角微抖动
- 背景:羊皮纸纹理
- 边框:墨线 + 内部贴纸感装饰(印章、徽章)
- 左上角:物品图标(程序绘的简化插画)

## 7. 文字与排版

- **字体族**: 手写感 Serif(Cormorant Garamond、IM Fell English、Caveat 作小标签)
- **装饰字体**: 用于标题/章节(Cinzel、IM Fell DW Pica)
- **正文**: Serif weight 400,line-height 1.6-1.8
- **HUD 标签**: 手写体(Caveat / Patrick Hand),12-14px
- **数字**: 可考虑 装饰数字(oldstyle 或 swash)
- **大小**: HUD 14-16px / 正文 16-18px / 标题 24-36px / Hero 48-72px
- **字符限制**: 描述文本允许长段落,允许手写风格连笔
- **文本装饰**: 部分字可加下划墨线或画圈强调

## 8. 光影与质感

- **辉光**: 极弱,仅在关键激活态用
- **阴影**: 不用 box-shadow,用 SVG filter 模拟纸张阴影
- **纹理必备**:
  - 羊皮纸纹(SVG turbulence + sepia 着色)
  - 墨水飞溅(opacity 0.1-0.3 的不规则斑点)
  - 铅笔涂鸦痕迹(浅色 low opacity 线条)
- **墨水笔触**:
  - SVG path 描边 + roughness filter
  - 端点不规则(可模拟笔尖抬起)
  - 笔触粗细 1-4px 之间变化
- **水彩笔触**:
  - 颜色叠加带 alpha 渐变
  - 边缘渗色(用 SVG turbulence 扰动)
- **纸张纹理**:
  - 颗粒噪点 opacity 0.05-0.1
  - 折痕/撕裂/咖啡渍(可选装饰)

## 9. 动效原则

| 动作 | 时长 | 曲线 | 备注 |
|------|------|------|------|
| 面板入场 | 400ms | ease-out,opacity + scale(0.92→1) | 像翻开纸页 |
| 按钮悬浮 | 200ms | ease-out | 稍慢,有"手"感 |
| 状态切换 | 280ms | ease-in-out | 颜色和边框 |
| 数值变化 | 360ms | ease-out + 微 bounce | 数字滚动到位 |
| 元素绘制 | 800ms | ease-out | SVG path 描边动画(stroke-dashoffset) |
| 墨水飞溅 | 120ms | linear | 入场瞬间,opacity 0→1 |
| 选中切换 | 320ms | ease-out,scale(1→1.05→1) | 弹一下 |

**原则**: 整体比 minimal 慢,但比 dark fantasy 快。强调"绘入"感(SVG 描边动画)。微 bounce/弹跳是允许的,但不超过 5% scale 变化。

## 10. 状态语义

| 状态 | 视觉差 |
|------|--------|
| Normal | 骨白底 + 2px 墨线 + 暗棕文本 |
| Hover | 暖黄底 + 墨线加粗 + 主红文本 + 微辉光 |
| Active | 主红底 + 骨白文本 + 墨线 3px |
| Disabled | 灰褐边 + 灰褐文本,墨线变虚线 |
| Selected | 左侧墨线箭头 ▶ + 暖黄背景 |
| Loading | 边框墨线流动(像用笔画),1800ms infinite |

## 11. 可程序化生成参数表

| 参数 | 类型 | 范围 | 默认值 | 说明 |
|------|------|------|--------|------|
| `palette` | enum | stygian/celestial/forest/synth | stygian | 调色板 |
| `inkColor` | HEX | 暖黑 | `#1A1410` | 墨水色 |
| `paperColor` | HEX | 暖白 | `#E8DCC4` | 纸底色 |
| `accentColor` | HEX | 强调色 | `#8B3A2E` | 强调色 |
| `inkLineWidth` | float px | 1-4 | 2.5 | 墨线粗细 |
| `borderRoughness` | float | 0-1 | 0.4 | 边框抖动强度 |
| `inkBleed` | float | 0-1 | 0.3 | 墨水渗透强度 |
| `paperTexture` | float | 0-1 | 0.5 | 纸张纹理强度 |
| `inkSplatterDensity` | float | 0-0.3 | 0.1 | 飞溅墨点密度 |
| `useWatercolor` | bool | - | true | 启用水彩填充 |
| `watercolorEdges` | float | 0-1 | 0.4 | 水彩边缘渗色 |
| `fontFamily` | string | serif | `IM Fell English, serif` | 装饰字体 |
| `bodyFontFamily` | string | serif | `Cormorant Garamond, serif` | 正文 |
| `scriptFontFamily` | string | script | `Caveat, cursive` | 手写体 |
| `panelEntryDuration` | int ms | 300-500 | 400 | 面板入场 |
| `useStrokeAnimation` | bool | - | true | SVG 描边动画 |
| `strokeDrawDuration` | int ms | 500-1000 | 800 | 描边时长 |
| `enableMicroBounce` | bool | - | true | 启用微弹跳 |
| `bounceStrength` | float | 0-0.1 | 0.05 | 弹跳强度 |
| `enableIrregularRotation` | bool | - | true | 元素不规则旋转 |
| `maxRotationDeg` | float deg | 0-5 | 2 | 最大旋转角度 |
| `panelShape` | enum | rectangle/scroll/parchment/wood | rectangle | 面板形状 |

## 12. 不做什么(反例)

1. ❌ **不要** 用完美几何(锐边、对齐网格) — 必须有抖动
2. ❌ **不要** 用霓虹色/高饱和 — 必须中等饱和暖色
3. ❌ **不要** 用 box-shadow / glow — 用 SVG filter 模拟
4. ❌ **不要** 用现代 sans 字体 — 必须 serif/手写
5. ❌ **不要** 用冰冷渐变 — 用层叠水彩
6. ❌ **不要** 让所有元素完美对齐 — 允许 1-3px 偏移
7. ❌ **不要** 用发光/扫描线/未来感
8. ❌ **不要** 让背景纯色 — 必须有纸张/帆布纹理
9. ❌ **不要** 用纯白/纯黑作主色 — 必须偏暖
10. ❌ **不要** 用过度工业/技术语言(终端/HUD) — 必须绘画感

## 13. 可生成部件清单

- HUD 元素:左下 HP/FP/Stamina 三条手绘条
- HUD 元素:右上 Boon 图标网格(带墨线图标)
- HUD 元素:底部当前武器/技能
- 菜单:主菜单(笔记本/卷轴风)
- 菜单:装备详情(羊皮纸底 + 插图)
- 菜单:物品栏(格子像旧抽屉)
- 菜单:技能树(分支像家族树,带羽毛笔装饰)
- 对话框:角色对话(底部条 + 角色名字手写体)
- 模态:确认对话框(羽毛笔签字感)
- 数值:伤害数字(墨水飞溅效果)
- 数值:经验/金币提示
- 加载:羊皮纸卷开
- 状态:Buff/Debuff(手绘图标)
- 战斗:技能冷却条(像墨水瓶)
- 地图:手绘地图(风图,带插图标记)

---

**使用提示**: 此风格核心是"温度"。每个元素都应感觉被一双手绘制,不是机器生成。SVG roughness filter 是核心工具。所有抖动/偏移基于程序 noise,保证可复现但有手作感。