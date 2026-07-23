# Style 06 — Cartoon Comic

## 1. 风格定位

**漫画书、卡通、cel-shading、厚黑边、网点纹理**。代表作:Borderlands 系列、No Straight Roads、Persona 5 Strikers 子风格、Hi-Fi Rush、漫画改编游戏、漫画儿童游戏。

UI 像从漫画书剪下来贴在屏幕上。所有元素带粗黑边,内部用平涂填色,背景常带 Ben-Day 网点或放射线效果。文字手写感、爆炸框、对话气泡。

## 2. 适用游戏类型

**适合**
- 类型:卡通射击、节奏动作、漫画改编动作游戏
- 典型玩法:厚边商店、击杀提示、技能弹窗、夸张反馈
- 代表作:见风格定位

**不适合**
- 低饱和恐怖生存
- 写实军规 UI
- 极简魂类 HUD

**本风格推荐场景包**
- 主场景:`comic-shop.html`(厚边枪械/道具商店)
- 扩展:击杀掉落条、暂停爆炸框

## 3. 视觉关键词

卡通、漫画、cel-shading、厚黑边、平涂、Ben-Day 网点、放射线、爆炸框、对话气泡、onomatopoeia(拟声词)、splash、hand-lettered、夸张、fun。

## 4. 色彩系统

**默认调色板(Borderlands 风)**:

| 角色 | 颜色 | HEX | 用法 |
|------|------|-----|------|
| 主色 1 | Comic Yellow | `#FFD900` | 主背景、强调、CTA |
| 主色 2 | Comic Red | `#E63946` | 标题、爆炸框、警告 |
| 主色 3 | Comic Blue | `#3DA9FF` | 信息、面板底 |
| 主色 4 | Ink Black | `#1A1A1A` | 主描边、文字 |
| 辅色 1 | Skin Cream | `#FFF1DC` | 面板浅底 |
| 辅色 2 | Pop Pink | `#FF77A8` | 装饰、女性化 |
| 辅色 3 | Toxic Green | `#7FE85B` | 成功、buff |
| 辅色 4 | Comic Orange | `#FF8C42` | 暖强调 |
| 辅色 5 | Purple Punch | `#9B5BD9` | 稀有、魔法 |
| 语义 | Danger | `#E63946` | 危险、低血 |
| 语义 | Success | `#7FE85B` | 成功 |

**配色原则**:
- 主背景常用 Comic Yellow 或 Skin Cream
- 永远配 1px Ink Black 描边(强制,无法省略)
- 颜色饱和度 80-100%(漫画式)
- 文本:Ink Black 在浅底,Comic Yellow 在深底
- 单色块主导,无渐变(cel-shading 是平涂+1 阴影色)

## 5. 几何与构图

- **圆角**: 0(全部尖锐,漫画感)
- **边框**: **3px Ink Black solid**(强制,所有元素)
- **网格**: 弱网格,允许手作不齐
- **HUD 锚点**: 四角固定,允许元素倾斜 ±3°(漫画不严格)
- **面板锚点**: 中央或贴边,允许爆炸框(星形/锯齿边框)
- **形状**: 矩形为主,允许圆形/星形/锯齿(对话气泡)
- **偏移**: 元素偶尔"歪一点"(模拟手贴漫画)

## 6. 边框与容器

**面板**:
- 背景 Comic Yellow 或 Skin Cream
- 边框 **3px Ink Black**
- 角部切角或锯齿(可选)
- 投影 `box-shadow: 6px 6px 0 var(--ink)`(硬阴影,漫画感)

**按钮**:
- 背景 Comic Yellow / Comic Blue / Toxic Green
- 边框 **3px Ink Black**
- 文本 Ink Black,weight 900,uppercase
- 投影 `4px 4px 0 var(--ink)`
- Hover: 背景 +1 色阶 + 投影偏移减半(2px)
- Active: 投影消失,元素 translate(+4px, +4px)
- **形状**: 矩形为主,允许圆角矩形(8-12px)用于次按钮

**进度条(HP)**:
- 形状:矩形 + 3px Ink Black 边
- 轨道:Skin Cream
- 填充:Comic Red (HP) / Toxic Green(护盾) / Comic Blue(Mana)
- 无圆角
- 文字化:斜体粗字写在条上方"BAM!" / "ZAP!" 风格

**卡片**:
- 背景 Comic Yellow
- 边框 3px Ink Black
- 投影 4px 4px 0 Ink Black
- 内部斜线分割(模拟漫画格子)

**爆炸框(Warning Box)**:
- 形状:星形/锯齿 polygon
- 背景 Comic Red
- 边框 3px Ink Black
- 大字 Ink Black + Comic Yellow,weight 900,uppercase,旋转 ±5°

## 7. 文字与排版

- **字体族**:
  - Display: `'Bangers'`, `'Bowlby One'`(漫画感夸张字体)
  - Body: `'Comic Neue'`, `'Patrick Hand'`(手写体)
  - Caps: `'Anton'`, `'Impact'`(粗大写)
- **Display 字号**: 48-96px,weight 900,uppercase,letter-spacing: 0.05em
- **正文**: Comic Neue weight 700,line-height 1.4
- **HUD 标签**: Anton/Impact,uppercase,letter-spacing: 0.1em
- **数字**: Bangers/Bowlby One,大字号时极夸张
- **大小**: HUD 14-16px / 正文 16-18px / 标题 24-48px / Hero 64-128px
- **onoma(拟声词)**: 单独处理,旋转 ±10°,Bangers 字体,大字
- **大小写**: Display 必大写,正文小写

## 8. 光影与质感

- **辉光**: 不用
- **阴影**: 硬阴影,**绝无模糊**。`box-shadow: 4px 4px 0 var(--ink)`
- **玻璃**: 不用
- **噪点**: 不用
- **渐变**: 不用
- **Ben-Day 网点**: SVG `<pattern>` 圆形点阵,opacity 0.15-0.30
- **放射线背景**: SVG `conicGradient` 从中心放射,模拟漫画爆炸效果
- **半色调网点**: 可选,模拟漫画印刷
- **cel-shading**: 阴影用 1 个色阶(平面),非平滑过渡
- **Splash 元素**: 星形/锯齿 polygon 作为警告框

## 9. 动效原则

| 动作 | 时长 | 曲线 | 备注 |
|------|------|------|------|
| 面板入场 | 320ms | ease-out,scale(1.2→1) + opacity + rotate(±5°→0) | 弹出 + 旋转摆正 |
| 按钮悬浮 | 120ms | ease-out | 阴影偏移减半 |
| 状态切换 | 160ms | ease-in-out | 颜色和阴影 |
| 数值变化 | 280ms | ease-out,scale(1.2→1) 弹跳 | 弹跳出现 |
| 爆炸框入场 | 240ms | spring(overshoot) | 夸张弹出 |
| 模拟弹跳 | 600ms | ease-out,scale(1→1.15→1) | 反复循环或单次 |
| 旋转抖动 | 200ms | step(4) infinite | shake 效果(受伤反馈) |

**原则**: 中等时长 + 夸张弹出/弹跳。强调"漫画感"的反应。弹跳幅度 10-20% scale。

## 10. 状态语义

| 状态 | 视觉差 |
|------|--------|
| Normal | Comic Yellow 底 + 3px 黑边 + 4px 硬阴影 |
| Hover | 背景变 Comic Orange + 阴影偏移 2px |
| Active | 背景变深 + 阴影消失 + translate(4px, 4px) |
| Disabled | 灰阶 + 透明度 0.5 |
| Selected | Toxic Green 底 + 黑边加粗 4px |
| Warning | 爆炸框(星形)+ Comic Red 底 + 旋转 ±5° |
| Error | 抖动动画 + Danger Red 底 |
| Success | 弹出 + Toxic Green 底 + 对勾 |

## 11. 可程序化生成参数表

| 参数 | 类型 | 范围 | 默认值 | 说明 |
|------|------|------|--------|------|
| `bg` | HEX | 浅色 | `#FFD900` | 屏幕底(常用 Comic Yellow) |
| `surface` | HEX | 浅色 | `#FFF1DC` | 面板底(Skin Cream) |
| `accent` | HEX | 鲜艳 | `#E63946` | 主强调(Comic Red) |
| `accentBlue` | HEX | 鲜艳 | `#3DA9FF` | 副强调 |
| `accentGreen` | HEX | 鲜艳 | `#7FE85B` | 成功 |
| `accentPink` | HEX | 鲜艳 | `#FF77A8` | 装饰 |
| `accentPurple` | HEX | 鲜艳 | `#9B5BD9` | 稀有 |
| `ink` | HEX | 黑 | `#1A1A1A` | 主描边、文字 |
| `borderWidth` | int px | 2-6 | 3 | 边框粗细 |
| `shadowOffset` | int px | 0-12 | 4 | 硬阴影偏移 |
| `shadowBlur` | int px | 0 | 0 | 阴影模糊(必须为 0) |
| `borderRadius` | int px | 0-12 | 0 | 圆角(强制 0) |
| `fontDisplay` | string | display | `Bangers, sans-serif` | 标题字体 |
| `fontBody` | string | comic | `Comic Neue, cursive` | 正文字体 |
| `useBenDay` | bool | - | true | 启用 Ben-Day 网点 |
| `benDayOpacity` | float | 0-0.4 | 0.20 | 网点透明度 |
| `benDaySize` | int px | 4-16 | 8 | 网点间距 |
| `useStarburst` | bool | - | false | 启用放射线背景 |
| `starburstOpacity` | float | 0-0.5 | 0.15 | 放射线透明度 |
| `panelEntryDuration` | int ms | 200-400 | 320 | 面板入场 |
| `useBounce` | bool | - | true | 启用弹跳 |
| `bounceStrength` | float | 0-0.25 | 0.15 | 弹跳强度 |
| `useRotation` | bool | - | true | 元素允许旋转 |
| `maxRotationDeg` | float deg | 0-10 | 5 | 最大旋转 |
| `enableShake` | bool | - | true | 受伤/警告抖动 |
| `shakeIntensity` | float | 0-0.05 | 0.02 | 抖动强度 |

## 12. 不做什么(反例)

1. ❌ **不要** 用圆角 > 12px(主元素强制 0,仅次按钮可微圆)
2. ❌ **不要** 用 box-shadow blur > 0 — 必须硬阴影
3. ❌ **不要** 用渐变填充 — 必须平涂
4. ❌ **不要** 用细边框 (< 2px)
5. ❌ **不要** 用细腻阴影/柔和光晕
6. ❌ **不要** 用 Serif/无衬线无漫画感字体
7. ❌ **不要** 用扫描线/CRT/未来感(完全不同风格)
8. ❌ **不要** 用极简/留白主导 — 必须信息密
9. ❌ **不要** 用真实照片质感 — 必须平面
10. ❌ **不要** 用紫色/品红/霓虹为主色(那是 Anime/Synthwave)

## 13. 可生成部件清单

- HUD 元素:HP/Mana/Shield 三条(粗黑边,硬阴影)
- HUD 元素:弹药数(大字 Bangers 字体 + 描边)
- HUD 元素:技能冷却(爆炸框显示 + 旋转 ±5°)
- HUD 元素:敌人/盟友头像(圆形 + 粗黑边)
- HUD 元素:金钱/经验(Bangers 大字 + 动效)
- 按钮:主/次/危险/图标(粗黑边 + 硬阴影)
- 面板:主菜单(爆炸框风格标题)
- 面板:装备详情(漫画格子布局)
- 菜单:物品栏(网格 + 粗黑边)
- 菜单:技能树(分支 + 爆炸框节点)
- 模态:确认对话框(爆炸框)
- 数值:伤害数字("BAM!" "ZAP!" 风格,旋转)
- 数值:暴击数字(超大夸张 + 抖动)
- 进度条:粗黑边 + 平涂填充
- 加载:爆炸框出现
- 提示:toast(爆炸框,3s 自动消失)
- Buff/Debuff:圆形图标 + 粗黑边
- 战斗:Battle 菜单(FIIGHT/SKILL/ITEM/ESCAPE,爆炸框风格)
- 警告:接近警告(爆炸框 + 抖动)

---

**使用提示**: 此风格核心是"漫画能量"。每个 UI 元素都应该感觉像从漫画书剪下来贴在屏幕上。粗黑边 + 硬阴影 + 平涂填色 = 一切。Ben-Day 网点和放射线背景是可选装饰,用于关键场景(警告/重要信息)。切忌细腻感,所有边缘必须锐利。