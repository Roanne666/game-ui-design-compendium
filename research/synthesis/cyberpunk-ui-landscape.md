# 赛博朋克 UI 全景分析（不局限 CP2077）

> 研究日期: 2026-07-24  
> 目的: 打破「赛博朋克 = Cyberpunk 2077 红 HUD」的单一印象，整理网络上（影视 / 游戏 / 网页 / Figma Kit / CSS 教程）真正在用的做法，并抽出可程序化的共性与分歧。

---

## 0. 结论先行

赛博朋克 UI **不是一种皮肤**，而是一族共享「暗底 + 霓虹信号 + 终端/HUD 语法」的视觉方言。网络上常见实现其实分成 **至少 5–6 个可互斥的子方言**；把它们混在同一块 HUD 上就会又土又吵。

| 质量高的做法 | 廉价/土的做法 |
|-------------|--------------|
| 选 **一个** 子方言，锁死主强调色 | 红+琥珀+青+品红+绿一起上 |
| 霓虹面积 ≤ 画面 10–15% | 到处 `text-shadow` / `box-shadow` 发光 |
| 用 **角标/刻度/切角** 当「机器语言」 | 圆角卡片 + 霓虹描边（网页后台感） |
| Glitch / 扫描线是 **偶发状态** | 每个元素都在抖、都在故障 |
| 信息密度本身就是风格 | 大片留白 + 一条细进度条 |
| 颜色 = 语义映射（可用/危险/数据） | 颜色只为「好看」 |

---

## 1. 谱系：赛博朋克 UI 从哪来

### 1.1 影视源头（语言母体）

| 源头 | 视觉语法 | 对 UI 的遗产 |
|------|----------|-------------|
| **Blade Runner (1982) / 2049** | 雾中霓虹、汉字招牌、湿路面反射、CRT 余晖 | 「Tech Noir」：青/洋红/暖琥珀并存；界面往往是 **世界里的屏幕**（diegetic），不是玩家浮层 |
| **The Matrix** | 磷光绿代码瀑布、黑底、等宽字 | 「终端即世界」：monospace、高密度、绿色语义 = 系统层 |
| **Ghost in the Shell** | 体视全息、点云、干净 FUI | 半透明体积感、扫描、物体标注线；偏 **空间 UI** |
| **Terminator** | 红底机器视觉、低保真、大量只读文本 | 战术 HUD：偏文本、偏红、偏「传感器 overlay」 |

关键洞察（[HUDS+GUIS 对 CP2077 预告片的评论](https://www.hudsandguis.com/home/2019/cyberpunk-2077)）：早期 CP HUD 被描述为 **off-red、low-fi、偏 Terminator**，而车载界面偏 **80s 方块字 + 电路形**——同一世界观里 **不同设备用不同方言**。

### 1.2 游戏把「氛围」做成「可交互系统」

| 作品 | 方言 | 做法要点 |
|------|------|----------|
| **Deus Ex: Human Revolution / Mankind Divided** | Amber Augment | 琥珀/黑；HUD 被设计成 **义眼 AR**；武器 UI 贴在枪上追踪；Smart Vision = 色权重映射 + 几何高亮（[Benoit Perreault](https://www.benoitperreault.com/deusex)） |
| **Cyberpunk 2077** | Neo Militarism（默认玩家 UI） | 红作品牌色；角切几何；HUD 边缘 shader 弯曲；文本主导；世界观内还有 Entropism / Kitsch / Neo-Kitsch 等设备风格（UI Art Bible） |
| **Observer / 其它植入恐怖** | CRT 故障 | 扫描线、色差、噪声更重，信息可读性故意被「损坏」 |

### 1.3 网页 / 产品 / 开源把方言「商品化」

网络教程与设计系统（[stellae](https://www.stellae.design/en/learn/cyberpunk-ui-design)、[designmd Cyberpunk UI](https://designmd.app/library/cyberpunk-ui)、大量 CSS Glitch 教程、eDEX-UI、各类 Vue/Hugo 赛博主题）高度收敛到一套 **「可复制配方」**：

1. Near-black 背景（常带蓝紫偏色，忌纯 `#000` 一片死）
2. 1–2 个霓虹强调色（青 / 品红 / 矩阵绿最常见）
3. Monospace 或「终端感」字体
4. `clip-path` 切角卡片
5. `repeating-linear-gradient` 扫描线
6. Glitch = `skew` + RGB 错位伪元素
7. `text-shadow` 霓虹辉光

这套对 **落地页 / 登录页 / 终端仪表盘** 很有效，但 **直接搬到游戏 HUD** 容易变成「霓虹网页」。

Figma / Behance 资源（Cyberpunk HUD Mega Kit、FUI Frame 包等）提供的是 **零件库**：角括号、六边形、雷达环、分段条、数据条、全息面板——它们是 **FUI（Fantasy User Interface）词汇表**，比「换个色」更关键。

---

## 2. 子方言图谱（互斥选用）

做风格文档 / Demo 时，应先选方言，再选布局。

### A. Matrix Terminal（矩阵终端）

- **色**: `#00FF00` / `#00FF41` on `#0D0D0D`
- **字**: 纯 monospace，全大写标签
- **形**: 几乎无装饰，或极简方框；数字雨作氛围层
- **动**: 光标闪烁、行滚动、轻微 CRT
- **适合**: 黑客小游戏、入侵界面、系统日志
- **不适合**: 开放世界常驻 HUD（绿满屏会糊）

### B. Neon Noir（霓虹黑色电影 / Blade Runner 街景）

- **色**: Cyan `#00FFF5` + Magenta `#FF00FF` + 少量 Amber；雾感暗底
- **字**: 几何无衬线 + 偶发显示字体；可有汉字/假名点缀（慎用，避免文化贴纸）
- **形**: 广告牌式色块、竖排标签、反射感渐变
- **动**: 霓虹灯管闪烁、慢呼吸辉光
- **适合**: 城市探索、商店 UI、对话旁的环境感
- **风险**: 与 Vaporwave 混淆（粉青网格）

### C. Amber Augment（琥珀义体 / Deus Ex）

- **色**: Amber Gold `#F6C73B` 主文本；近黑面板；极少第二霓虹
- **字**: 清晰 UI 无衬线；数据用等宽
- **形**: 干净 AR 框、追踪线、贴附在 3D 物体上的标签
- **动**: 扫描 sweep、高亮 fade；**克制**
- **适合**: 潜入、社交工程、扫描玩法
- **气质**: 公司/军事植入，比「街头霓虹」冷、干净

### D. Neo Militarism（新军国主义 / CP2077 玩家 UI）

- **色**: 主红 `#E60012`；蓝表示「可用/弹药」；白正文
- **字**: 压缩无衬线（如 Rajdhani 一类）
- **形**: 攻击性切角、斜切等级徽章、分段血条、弱底板
- **动**: 短促、硬；HUD 可有轻微透视弯曲
- **适合**: 战斗向开放世界常驻 HUD
- **注意**: 红既是品牌又是危险色 → 语义要额外用形状区分

### E. Soft FUI / Holo Shell（攻壳式全息）

- **色**: 半透明青白、低饱和；发光边缘细
- **形**: 圆环、六边、点云框、引导线标注
- **动**: 展开/折叠的几何生长、深度视差
- **适合**: 扫描、导航、物体信息层（spatial UI）
- **不适合**: 当唯一血条风格（可读性靠实色条更好）

### F. Glitch / Entropic（故障朋克）

- **色**: 任意主色 + RGB split
- **形**: 错位图层、撕裂、噪声
- **动**: 短促 glitch burst（状态切换时）
- **原则**: **每视图最多一种故障效果**（designmd: “One glitch effect per view”）
- **适合**: 受击、入侵成功、义体过载等 **瞬时反馈**

### G.（易混淆）Synthwave / Vapor — 相邻但不是同一回事

粉青日落、透视网格、80s 跑车字标 → 更偏 **怀旧电子乐视觉**。可作载具 HUD 点缀，不宜当作「赛博朋克 UI」主定义。

---

## 3. 跨方言的「零件语法」（网络上真正在复用的）

无论选哪种子方言，Behance / Figma Kit / CSS 教程反复出现同一套 **FUI 零件**：

1. **角括号 (corner brackets)** — L 形裁切，暗示「取景/锁定」
2. **切角容器 (chamfer / clip-path)** — 非圆角卡片；常见对角切除
3. **刻度尺分隔** — 进度条上的 25%/12.5% 竖线，像仪表不是 Bootstrap bar
4. **双读数** — 大号当前值 + 小号容量；常用 **双色语义**（如弹匣青 / 备弹红）
5. **雷达/圆环** — 小地图或状态用同心圆，不是圆角方块地图
6. **引导线标签** — 从实体拉出折线 + 短标签（扫描模式）
7. **等宽数据条** — RAM 格、冷却格、库存格：离散格子 > 连续细条
8. **装饰性伪数据** — 条码、不可读字形、坐标串（须不可被误读成真实 UI 文案）
9. **层叠透明度** — 面板 60–85% 不透明黑，边缘更亮，模拟全息投影
10. **状态色锁定** — 例如：青=可交互/扫描，红=敌对/锁定，绿=系统/矩阵，琥珀=任务/警告

**布局范式（游戏 HUD）** 常见两种，不要混成「四角各扔一堆细字」：

- **情境自适应**（CP2077 / Witcher 系）：非战斗极简；拔枪才出生命；体力仅在消耗时出现
- **常驻驾驶舱**（终端仪表盘 / eDEX-UI）：信息密度故意高，像多屏监控

网页落地页则是第三种：**非对称 Hero + 切角卡片栅格**，和游戏 HUD 不是同一套布局。

---

## 4. 材料与动效（网络配方拆解）

### 4.1 几乎所有教程都教的 CSS 手段

| 效果 | 典型实现 | 使用建议 |
|------|----------|----------|
| 扫描线 | `repeating-linear-gradient` 全屏 overlay | opacity 0.03–0.1；multiply |
| 霓虹字 | 多层 `text-shadow` | 只给 **1 级标题/关键数值** |
| 切角 | `clip-path: polygon(...)` | 统一切角尺寸 token（8/12/16px） |
| Glitch | 伪元素 RGB 偏移 + `skew` + 短动画 | 触发式，duration ~0.2–0.4s |
| 色差 | `filter` 或双层文字 | 受击/入侵时 |
| 网格底 | 细线 repeating gradient | 小地图、面板内，勿铺满世界 |

### 4.2 字体策略的两条路（都对，但互斥）

- **硬核终端路**: 全站 JetBrains Mono / Fira Code / IBM Plex Mono（Matrix / 仪表盘）
- **产品+机器路**: 标题几何无衬线 + 数据等宽（Deus Ex / 多数现代游戏）

Courier New 单独使用会显「临时网页」，不是方言本身的问题。

### 4.3 动效曲线（从 designmd / 实作共识）

- 入场: fade + translateY(16→0)，~480ms ease-out；列表 stagger 100ms
- Hover: 轻微提亮边框 / 填充 8–12% 强调色，**不要**乱 scale 卡片
- 状态切换: 允许一次 glitch burst
- 数值条: 90–150ms linear（跟枪感觉）

---

## 5. 语义：为什么「只抄颜色」会失败

多方来源（stellae、designmd、CP2077 UX 评论）一致强调：

> **霓虹色是信号，不是油漆。**

推荐的语义契约（可写进参数表）：

| 信号 | 建议用法 |
|------|----------|
| 主强调色（每方言只 1 个） | 品牌、活跃控件、玩家相关 |
| 第二色 | 可用资源、盟友、扫描层 |
| 警告色 | 过热、敌对、不可用（若主色已是红，则用形状/图标区分「品牌红」vs「危险红」） |
| 静音色 | 次要说明、坐标、装饰伪数据 |

CP2077 被 UX 文章批评的点恰恰是：**红同时承担品牌、不可用、装饰、任务未完成** → 可学视觉，勿学语义混乱。

---

## 6. 媒介差异：网页赛博 ≠ 游戏 HUD

| 维度 | 网页 / SaaS 赛博 | 游戏常驻 HUD |
|------|------------------|--------------|
| 目标 | 品牌冲击、停留、转化 | 可读、少遮挡、情境显隐 |
| 密度 | 中高，但分区块 | 边缘锚点，中央尽量空 |
| Glitch | 可作 Hero 卖点 | 仅反馈，否则眩晕 |
| 圆角 | 有的系统仍给 8px | 游戏向通常 0–2px |
| 背景 | 可纯 UI | 必须让 **3D/场景** 当主角 |
| 成功标准 | 「哇，好赛博」 | 「开枪时仍能读血与弹」 |

**对我们 demo 的启示**: 用网页 Kit 的零件语法（角标、切角、分段），但用游戏的布局纪律（情境显隐、边缘锚点、少底板）。

---

## 7. 常见失败模式（网络样本里反复出现）

1. **彩虹霓虹**: 五色齐飞，无语义  
2. **发光过载**: 所有字都 glow → 无层级  
3. **Bootstrap 赛博**: `card` + `border-cyan` + 圆角  
4. **Glitch 上瘾**: 静态页面也一直抖  
5. **方言混搭**: 矩阵绿字 + CP 红条 + 琥珀任务 + 品红边框  
6. **装饰可读**: 装饰层写了英文单词，玩家以为是提示  
7. **中央堆叠**: 准星周围堆提示条、任务、伤害数字  
8. **纯黑死底**: `#000` 无空气感；好的暗底略偏蓝/紫/红 (`#0a0a12` / `#0D0D0D` / `#080204`)

---

## 8. 可程序化参数建议（跨子方言）

做本仓库 Style 01 时，建议参数表支持 **子方言枚举**，而不是写死一套红：

```
substyle: matrix | neon-noir | amber-augment | neo-militarism | holo-fui
accentPrimary: HEX
accentSecondary: HEX
bgDeep: HEX
neonCoverageMax: 0.10–0.15
cornerCutPx: 8–16
scanlineOpacity: 0–0.1
glitchMode: off | on-state-change | ambient-rare
typePairing: mono-only | sans+mono
hudCurvature: 0–1
panelOpacity: 0.55–0.88
infoDensity: low | mid | high
```

组件生成时强制走 FUI 零件，而不是 `progress` 标签视觉。

---

## 9. 对当前 Demo 的诊断（基于本分析）

`demo/scenes/01-cyberpunk-hud/` 为 **9:20 竖屏手机框**，顶栏切换方言时 **配色与布局同时变化**：

| 键 | 方言 | 竖屏布局 |
|----|------|----------|
| NEO | Neo Militarism | 顶左生命+顶右小地图，底中技能栏，弹药在底右上 |
| MATRIX | Matrix Terminal | 顶栏终端条，任务在下，技能右列，弹药左下，地图左下中 |
| AMBER | Amber Augment | 顶角 AR，任务居中括号框，底中弹药+技能坞 |
| NOIR | Neon Noir | 顶满宽霓虹条，任务左中，地图左下，弹药/技能右下 |

快捷键 `[` `]`。样式见 `layout-9x20.css`。

---

## 10. 主要参考（本次增补）

- https://www.stellae.design/en/learn/cyberpunk-ui-design  
- https://designmd.app/library/cyberpunk-ui  
- https://www.hudsandguis.com/home/2019/cyberpunk-2077  
- https://www.benoitperreault.com/deusex  
- https://prototypr.io/post/a-ux-analysis-of-cyberpunk-2077s-hud  
- https://www.behance.net/gallery/118663901/Cyberpunk-2077User-Interface-(Part-1)（UI Art Bible: Entropism / Kitsch / Neo Militarism / Neo Kitsch）  
- https://opacity.ru/Cyberpunk-2077-UI-Art  
- Figma/Behance 关键词样本: “Cyberpunk HUD UI”, “HUD FUI frame”, “CyberPunk UI Mega KIT”  
- 开源/产品: eDEX-UI、各类 cyberpunk CSS glitch 教程、终端仪表盘实践文  

---

## 11. 一句话方法论

> **先选方言，再锁语义色，再用 FUI 零件说话，把故障当标点而不是全文；网页学零件，游戏学布局。**
