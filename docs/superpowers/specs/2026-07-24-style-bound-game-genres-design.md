# 风格绑定游戏类型 — 设计规格

日期：2026-07-24  
状态：已确认并实现（2026-07-24）  
范围：文档约束 + Demo 架构（做法 1，本轮每风格 1 个主场景）

## 背景与问题

当前对外原则是「HTML 一次写完，换 CSS 换风格」，隐含 **同一套游戏 UI 页面** 套用全部风格。这与「每种 UI 风格应对应适合该风格的游戏」冲突：魂类极简 HUD、恐怖 diegetic、太空全息仪表等不应共享同一商店/技能树模板。

## 目标

1. **文档**：每套风格明确「适合 / 不适合」的游戏类型，以及推荐参考场景。
2. **Demo**：每风格独占场景（本轮各 1 个主场景），一眼能认出对应游戏类型。
3. **建材仍共享**：`components.css` + `lib/styles/*.css` 保留；统一只发生在 Token/组件层，不发生在页面布局层。

## 非目标（本轮不做）

- 不做 10 页面 × 10 风格笛卡尔积矩阵
- 不做双轨「换皮对照页」（可后续另开）
- 不删除共享组件库
- 不引入真实游戏美术资产
- 不一次做满每风格 2–4 个场景（后续迭代）
- 不强制 Spec 参数名与 CSS 变量全面重命名（可另开任务）

## 原则改写

| 旧 | 新 |
|----|----|
| HTML 一次写完，换 CSS 换风格 | **建材共享，楼型按游戏类型分** |
| 10 标准页全风格复用 | 每风格按适用类型选场景 |
| 换 link 即验收风格 | 打开该风格主场景，类型正确才算验收 |

调试用途下仍可用「同组件 + 换 Token」；**不得**再作为 README 主叙事。

## 文档层变更

### Spec 模板（CLAUDE.md + 每套 styles/*.md）

在「1. 风格定位」之后新增固定小节 **「1b. 适用游戏类型」**（或并入第 1 章末尾，标题必须出现）：

```markdown
## 适用游戏类型

**适合**
- 类型：…
- 典型玩法：…
- 代表作：（已有可复用）

**不适合**
- …（至少 3 条，防止风格挪用到错误品类）

**本风格推荐场景包**
- 主场景：（本轮必做 1 个）
- 扩展：（可选，列名即可，本轮不实现）
```

### 十风格锚定表（本轮权威）

| # | 风格 | 锚定游戏类型 | 本轮主场景（文件名） | 主场景必须呈现的类型信号 |
|---|------|--------------|---------------------|--------------------------|
| 01 | Cyberpunk HUD | 赛博 RPG / 潜入 | `gameplay-hud.html` | 终端感 HUD、扫描/任务条、霓虹暗底 |
| 02 | Dark Fantasy | 魂类 / 动作 RPG | `souls-hud.html` | 极简血条+精力、几乎无常驻装饰 |
| 03 | Sci-Fi Space | 太空模拟 | `bridge-holo.html` | 舰桥全息、导航/系统读数密 |
| 04 | Pixel Retro | 2D 像素 RPG/平台 | `battle-command.html` | 像素格、指令窗、有限调色板 |
| 05 | Hand-drawn | 叙事动作 / Roguelike | `boon-select.html` | 契约/祝福选择、墨线对话框 |
| 06 | Cartoon Comic | 射击 / 节奏动作 | `comic-shop.html` | 厚黑边商店、硬阴影、高饱和 |
| 07 | Survival Horror | 生存恐怖 | `spine-inventory.html` | 脊柱/diegetic 生命 + 稀缺背包格 |
| 08 | Anime Colorful | 日式 JRPG / 社交 | `phantom-menu.html` | 斜切主菜单、红黑白冲击 |
| 09 | Tactical Military | 战术射击 / 军事模拟 | `tactical-hud.html` | 弹药/姿态、低装饰高可读 |
| 10 | Synthwave Neon | 复古动作 / 街机 | `neon-title.html` | 霓虹标题屏、得分/磁带感暂停入口 |

### 其它文档同步

- `README.md`：重写核心原则、目录树、Quickstart；删除「换 link 换风格做验收」主路径。
- `demo/lib/README.md`：标明组件库是建材；场景在 `demo/scenes/<style>/`；禁止宣传 100 场景矩阵。
- `research/synthesis/style-boundaries.md`：按现行 10 风格重写互斥表（去掉 Minimal/Brutalist/Glass）。
- `CLAUDE.md`：目录清单改为现行 10 文件名；模板加入「适用游戏类型」；Demo 约定写入。
- `research/references.md`：Style 03/06/07 等旧编号说明与现行风格对齐（至少改标题与指向）。

## Demo 目录结构

```
demo/
├── lib/
│   ├── components.css          # 共享建材（保留）
│   ├── styles/<name>.css ×10   # Token（保留）
│   └── README.md               # 建材说明
└── scenes/
    ├── index.html              # 10 风格入口（链到各自主场景）
    ├── 01-cyberpunk-hud/
    │   └── gameplay-hud.html
    ├── 02-dark-fantasy/
    │   └── souls-hud.html
    ├── …（每风格一目录、一本轮一个 html）
    └── 10-synthwave-neon/
        └── neon-title.html
```

约束：
- 每个场景 HTML **只**引用：`../../lib/components.css` + 对应一套 `../../lib/styles/<name>.css`。
- 布局、信息架构按该游戏类型编写；**禁止**十个文件共用同一 DOM 骨架再换皮。
- 可复用组件类名；不可复用整页结构。

## 工具

- `package.json`：`gen:scenes` 若保留，语义改为「按风格场景清单生成/校验」，**禁止**生成 N×M 矩阵。
- 本轮可手工写 10 个 HTML，脚本可后补；若补脚本，输入应为 `scenes-manifest.json`（风格 → 主场景列表）。
- `tools/shoot.js`：改为截 `demo/scenes/<id>/<main>.html` → `preview.png`；去掉错误的 `demo/<style>/index.html` 假设。

## 验收标准

1. 打开 `demo/scenes/index.html`，10 个入口均可进入对应主场景。
2. 盲测：不看标题，仅看画面，能判断「这是魂类 / 恐怖 / 太空 / …」中的大类（内部自评即可）。
3. 文档中不再出现「HTML 一次写完换 CSS」作为主原则；`CLAUDE` / boundaries / README 风格清单一致。
4. 每套 Spec 含「适合 / 不适合 / 推荐场景包」；不适合至少 3 条。

## 风险与缓解

| 风险 | 缓解 |
|------|------|
| 共享组件不够某类型表达 | 主场景可用少量页内 `<style>` 做布局；类型特有结构优先用已有类（`.spine-bar`、`.arc-bar` 等） |
| 场景质量参差 | 本轮只要求类型信号正确，不要求美术成品 |
| 文档与场景再次漂移 | `scenes/index.html` + 上表作为场景真相源；README 只引用该表 |

## 实现顺序（供计划引用）

1. 同步规范文档（CLAUDE / README / boundaries / lib README / references 必要处）
2. 十套 Spec 写入「适用游戏类型」
3. 创建 `demo/scenes/` + `index.html` + 10 主场景
4. 修正 `shoot.js`（及 package 脚本说明）
5. 打开入口页做一次人工走查

## 开放问题（已决议）

- 做法：风格独占场景（做法 1）— **已确认**
- 本轮深度：文档全改 + 每风格 1 主场景 — **已确认**
- 双轨对照页 — **本轮不做**
