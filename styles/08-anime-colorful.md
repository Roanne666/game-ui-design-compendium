# Style 08 — Anime Colorful

## 1. 风格定位

**日式二次元、强冲击、尖锐斜切、单色主导、平面填充**。代表作:Persona 5 系列、P5R、P5S、P5X、Persona 3 Reload(新 UI)、Catherine: Full Body、13 Sentinels: Aegis Rim。

UI 像电影海报。1 个主色(红/蓝/黄/粉)+ 黑/白辅助。所有形状尖锐斜切,文字斜体加粗。世界观匹配"怪盗/酷/叛逆/年轻"主题。

## 2. 适用游戏类型

**适合**
- 类型:日式 JRPG、校园/社交日程、怪盗题材 RPG
- 典型玩法:斜切主菜单、人物状态、日程/社交、战斗指挥华丽面板
- 代表作:见风格定位

**不适合**
- 写实战术军事
- 像素硬核网格 RPG(应用 Pixel Retro)
- 低光恐怖 diegetic

**本风格推荐场景包**
- 主场景:`library/scenes/08-anime-colorful/index.html`（9:20）
- 布局原型:半屏/全屏斜切菜单栈；战斗时底指令条
- 核心玩法:在菜单间导航；战斗选指令
- HUD 语汇:红黑斜切海报同语汇（标题/指令/模态一致）；见 `docs/rules/game-feel-vs-web.md`
- 扩展:人物状态、日程面板

## 3. 视觉关键词

斜切、尖锐、平面、单色、对比、斜体、粗体、海报、怪盗、叛逆、年轻、Ben-Day、波普、平面构成、节奏感、动势。

## 4. 色彩系统

**Persona 5 默认调色板(Red Passion)**:

| 角色 | 颜色 | HEX | 用法 |
|------|------|-----|------|
| 主色 1 | Crimson Red | `#E60012` | 主强调、活跃状态、攻击、警告 |
| 主色 2 | Deep Black | `#0A0A0A` | 主背景、文字 |
| 主色 3 | Pure White | `#FFFFFF` | 副背景、文本反色 |
| 辅色 1 | Highlight Blue | `#3DA9FF` | 唯一允许的辅助色(选中态、移动光标) |
| 辅色 2 | Sub Blue | `#1A4F8B` | 选中态背景 |
| HP | HP Green | `#00C800` | HP 条、治疗 |
| MP | MP Blue | `#0080FF` | MP/魔法资源 |
| 警告 | Alert Red | `#FF3030` | 低血、错误 |
| 装饰 | Pink | `#FFB3C8` | 装饰(可选) |

**Persona 3 Reload(Blue Cool)**:
- 主色:Deep Blue `#0A4F8B`、Cool Cyan `#3DA9FF`、Black `#0A0A0A`、White `#FFFFFF`

**Persona 4 Golden(Yellow Retro)**:
- 主色:Yellow `#FFD800`、White `#FFFFFF`、Black `#0A0A0A`、TV Static 灰

**配色原则**:
- 全局只 1 个主强调色 + 黑 + 白(Persona 系列传统,杜绝多色)
- 主色饱和度 100%,纯色,无柔化
- HP/MP 可用第二色(绿/蓝),仅用于资源条
- 黑/白作主背景和文本对比
- 高对比 + 平面填充(无渐变)

## 5. 几何与构图

- **圆角**: 0(强制尖锐)
- **边框**: 2-4px 黑色实线,带斜切角部(非 90°)
- **网格**: 不严格,故意斜切
- **斜切**: 所有 UI 元素强制斜切(±5-15°),按钮平行四边形,面板斜边
- **HUD 锚点**: 四角固定,大胆
- **面板锚点**: 中央,允许旋转 ±3°
- **形状**: 大量平行四边形、三角、菱形
- **分割线**: 斜向线段,常带箭头条纹

## 6. 边框与容器

**面板**:
- 背景 Black 或 White(对比)
- 边框 3px 黑色 + 红色内描边(双层)
- 角部斜切 30°(非 90°):`clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)`
- 可选:中央一条白色斜线分割
- 可选:背景 Ben-Day 点阵(波普风)

**按钮(主)**:
- 形状:平行四边形或斜切矩形
- 背景:主色(Red) + 3px 黑色边
- 文字:White,weight 800,italic
- 斜切:`transform: skew(-12deg)` 或 clip-path
- Hover:背景变 Dark Red + 边框变粗 4px
- Active:背景变深 + 内白边 1px

**按钮(次)**:
- 背景 White + 黑边 + Black 斜体文字
- 同形状

**按钮(危险)**:
- 背景 Black + Red 文字 + 红边

**进度条**:
- 形状:平行四边形或斜切矩形
- 轨道:Black
- 填充:主色实色
- 无圆角,无渐变
- 斜向条纹(可选装饰)

**卡片**:
- 背景 Black 或 White
- 边框 3px Black
- 角部斜切
- 中央倾斜条带可作标签

## 7. 文字与排版

- **字体族**: Sans-serif bold italic(Impact、Arial Black、Archivo Black、Roboto Black)
- **首选**: 自定义斜体粗 Sans(可指定 `font-style: italic` + `font-weight: 900`)
- **标题**: Weight 900,italic,letter-spacing: 0.05em,uppercase
- **正文**: Weight 700,line-height 1.4
- **HUD 标签**: Weight 800,italic,uppercase
- **数字**: Weight 900,italic,允许巨大字号
- **大小**: HUD 14-18px / 正文 16-18px / 标题 32-48px / Hero 64-128px
- **字符限制**: 短而有力,标题 ≤ 12 字符
- **特殊字符**: 强调字可单独反色显示(背景白字黑 vs 背景黑字白)

## 8. 光影与质感

- **辉光**: 不用(完全平面)
- **阴影**: 不用 box-shadow,用 SVG displacement 模拟漫画线稿抖动
- **玻璃**: 不用
- **噪点**: 可选 Ben-Day 点阵(SVG pattern)
- **渐变**: 不用
- **平面构成**: 所有元素纯色填充,平面堆叠
- **线条**: 黑色 2-3px 描边,模拟漫画风
- **动势**: 用形状倾斜和条纹表示运动

## 9. 动效原则

| 动作 | 时长 | 曲线 | 备注 |
|------|------|------|------|
| 面板入场 | 480ms | ease-out,scale(1.1→1) + opacity + skew | 弹入,快结束 |
| 按钮悬浮 | 120ms | ease-out | 颜色 |
| 选中切换 | 200ms | spring 曲线 | 弹一下 |
| 数值变化 | 280ms | ease-out | 数字滚动到位 |
| 模态弹出 | 320ms | ease-out,scale + rotate(2→0) | 弹入带轻微旋转 |
| 列表项 stagger | 60ms | ease-out | 顺序 |
| 滑入(slide-in) | 280ms | ease-out | 从屏幕侧推入 |
| 闪烁 | 600ms | step(2) infinite | 颜色反转 |

**原则**: 中等时长 + 弹跳/spring 风格。整体节奏快,有"打"和"刺"的感觉(漫画风)。

## 10. 状态语义

| 状态 | 视觉差 |
|------|--------|
| Normal | Red 背景 + White 斜体粗字 |
| Hover | Dark Red + 边框 4px + 文字放大 110% |
| Active | Darker Red + scale(0.96) |
| Disabled | Grey + 灰文字 |
| Selected | 蓝色背景 + White 字 + 边框 4px(唯一允许的辅色) |
| Loading | 文字打字机 + Red 边框脉冲 |

## 11. 可程序化生成参数表

| 参数 | 类型 | 范围 | 默认值 | 说明 |
|------|------|------|--------|------|
| `primaryColor` | HEX | 鲜艳 | `#E60012` | 主色 |
| `background` | HEX | 黑/白 | `#0A0A0A` | 背景 |
| `surface` | HEX | 黑/白 | `#FFFFFF` | 表面 |
| `textColor` | HEX | 对比 | `#FFFFFF` | 主文本 |
| `accentSecondary` | HEX | 鲜艳 | `#3DA9FF` | 唯一辅色(选中) |
| `borderColor` | HEX | 黑 | `#0A0A0A` | 边框 |
| `borderWidth` | int px | 2-6 | 3 | 边框粗细 |
| `cornerClip` | int px | 0-30 | 15 | 角部斜切大小 |
| `skew` | float deg | -20 to 0 | -12 | 元素斜切角度 |
| `fontFamily` | string | bold sans | `Archivo Black, sans-serif` | 字体族 |
| `useItalic` | bool | - | true | 斜体 |
| `useUppercase` | bool | - | true | 大写 |
| `useBenDay` | bool | - | false | Ben-Day 点阵 |
| `benDaySize` | int px | 4-16 | 8 | 点阵大小 |
| `benDayOpacity` | float | 0-0.3 | 0.15 | 点阵透明度 |
| `panelEntryDuration` | int ms | 300-600 | 480 | 面板入场 |
| `entryScale` | float | 1.0-1.2 | 1.1 | 入场起始缩放 |
| `buttonHoverDuration` | int ms | 80-160 | 120 | 按钮 hover |
| `useSpring` | bool | - | true | 启用 spring 曲线 |
| `staggerDelay` | int ms | 0-80 | 60 | stagger |
| `enableRotation` | bool | - | true | 元素允许旋转 |
| `maxRotationDeg` | float deg | 0-5 | 3 | 最大旋转 |
| `hpColor` | HEX | - | `#00C800` | HP 条色 |
| `mpColor` | HEX | - | `#0080FF` | MP 条色 |

## 12. 不做什么(反例)

1. ❌ **不要** 用圆角(除角部斜切外) — 必须尖锐
2. ❌ **不要** 用渐变 — 必须纯色填充
3. ❌ **不要** 用阴影/辉光/玻璃 — 必须平面
4. ❌ **不要** 用超过 1 个主色 + 1 个辅色 — 配色极简
5. ❌ **不要** 用衬线/手写/像素字体
6. ❌ **不要** 用细字体(weight < 700)
7. ❌ **不要** 让面板/按钮完全水平对齐 — 必须斜切
8. ❌ **不要** 用小字号 — 必须大胆
9. ❌ **不要** 用现代柔和曲线 — 必须 spring/弹跳
10. ❌ **不要** 用 50% 灰阶 — 必须高对比黑/白/单色

## 13. 可生成部件清单

- HUD 元素:HP/MP 条(平行四边形,斜切)
- HUD 元素:技能冷却(倾斜图标 + 斜切条)
- HUD 元素:敌人/盟友头像(斜切边框)
- 按钮:主/次/危险/图标(全部斜切)
- 面板:主菜单(斜切大字体列表)
- 面板:角色详情(中央人物 + 斜切信息条)
- 菜单:装备/技能/物品(斜切卡片)
- 模态:确认对话框(红色填充 + 白字)
- 列表:行项(斜切边 + 红/白交替)
- 标签:状态标签(斜切矩形 + 红/白)
- 数值:大数字显示(斜体粗体)
- 进度条:平行四边形进度
- 加载:打字机文字
- 战斗:Battle 菜单(FIGHT/SKILL/ITEM/ESCAPE,斜切)
- Buff/Debuff:斜切图标
- 对话:角色对话(底部斜切条 + 角色名斜体粗)

---

**使用提示**: 此风格核心是"一击必中"。每个 UI 元素像从漫画剪下来,色彩冲击 + 形状冲击 + 字号冲击。设计时大胆留白(让主色块成为画面焦点),避免信息密度过高(向 dark fantasy 反向)。所有斜切角度建议 -8° 到 -15°,过大显得滑稽,过小失去动势。