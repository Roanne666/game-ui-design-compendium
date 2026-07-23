# Game UI Design Encyclopedia

10 套游戏 UI 风格：每套 = Spec 文档 + CSS Token + **该类型游戏**的参考场景。

**交付目标：移动端竖屏 9:20（画幅定死）+ 触控；玩家可见 UI 文案一律中文。**  
**楼型与玩法按游戏类型区分**，禁止全库统一「锁定 + 开火」模板。桌面仅作预览。

通用准则：[`research/synthesis/mobile-portrait-first.md`](research/synthesis/mobile-portrait-first.md)（含类型 → 布局/玩法矩阵）。

## 核心原则

**建材共享,楼型按游戏类型分；画幅统一 9:20，玩法不统一。**

场景必须是「盖在游戏世界上的 HUD」（diegetic / non-diegetic / meta），不是网页落地页。详见 `research/synthesis/game-feel-vs-web.md`。

- 共享：`demo/lib/components.css` + `demo/lib/styles/<name>.css` + `demo/lib/scene-kit.js` + `demo/lib/game-feel.css`
- 独占：`demo/scenes/<style>/index.html`——**完整可交互** UI 原型，**9:20 竖屏触控**，布局与玩法符合该类型
- 美术：`demo/assets/`（CC0 / CC-BY 等开放许可，见 `demo/assets/CREDITS.md`）
- **禁止**用「同一套页面换 CSS」或统一动作条作为风格验收标准；**禁止**商业游戏官方/Rip 素材
- **禁止**以键鼠快捷键为玩家主操作路径（调试捷径可保留）

```
游戏UI设计大全/
├── styles/                        ← 10 套风格 spec（含适用游戏类型）
├── demo/
│   ├── lib/                       ← 共享组件 + Token
│   └── scenes/                    ← 每风格独占主场景（竖屏）
│       ├── index.html
│       └── <nn-style>/<main>.html
├── research/                      ← 研究与互斥边界 / 竖屏准则
└── tools/                         ← 截图等工具
```

## Quickstart

### 1. 读 Spec

打开 `styles/01-cyberpunk-hud.md`，先看「适用游戏类型」再看色彩/几何/动效。

### 2. 用手机或 DevTools 竖屏玩场景

打开 `demo/scenes/index.html` → 某风格 `index.html`。优先用 **手机框 9:20 + 触控**；验收看该类型玩法是否成立，不要按「每套都是锁定开火」习惯验收。

### 3. 用组件库做建材

复制 `demo/lib/components.css` + 目标 `lib/styles/<name>.css`，按**该类型游戏**的信息架构写页面，复用类名即可；控件热区按触控尺寸设计。

## 10 套风格 × 锚定游戏类型

| # | 风格 | 适合的游戏类型 | 布局 / 玩法 | 主场景 |
|---|------|----------------|-------------|--------|
| 01 | Cyberpunk HUD | 赛博 RPG / 潜入 | 密 HUD + 口袋；扫描→开火/黑客 | `01-cyberpunk-hud/` |
| 02 | Dark Fantasy | 魂类 / 动作 RPG | 极简底栏 + 露滴；篝火/锁定/翻滚 | `02-dark-fantasy/` |
| 03 | Sci-Fi Space | 太空模拟 | 仪表+能量台；配电→锁定→射击 | `03-scifi-space/` |
| 04 | Pixel Retro | 2D 像素 RPG/平台 | 下半指令窗 | `04-pixel-retro/` |
| 05 | Hand-drawn | 叙事动作 / Roguelike | 三选一恩赐卡 | `05-hand-drawn/` |
| 06 | Cartoon Comic | 射击 / 节奏动作 | 单一大拍键 | `06-cartoon-comic/` |
| 07 | Survival Horror | 生存恐怖 | 稀疏 + 背包模态 | `07-survival-horror/` |
| 08 | Anime Colorful | 日式 JRPG / 社交 | 菜单栈 / 战斗指令 | `08-anime-colorful/` |
| 09 | Tactical Military | 战术射击 / 军事模拟 | 姿态+罗盘+开火分区 | `09-tactical-military/` |
| 10 | Synthwave Neon | 复古动作 / 街机 | 标题→得分 | `10-synthwave-neon/` |

代表作与互斥规则见各 Spec 与 `research/synthesis/style-boundaries.md`。  
9:20 + 类型矩阵见 `research/synthesis/mobile-portrait-first.md`。

## 组件库清单(35+)

| 类别 | 组件类 |
|------|-------|
| 按钮 | `.btn` + `.btn-primary/-secondary/-danger/-warning/-ghost` |
| 主菜单 | `.menu-item-large` `.menu-list` `.hero-logo` |
| 面板 | `.panel` `.panel-title` `.card` |
| 进度 | `.progress` `.progress-linear` `.hud-bar` |
| 圆环 | `.ring` (内联 SVG) |
| 弧形 | `.arc-bar` (魂类) |
| 脊柱 | `.spine-bar` `.spine-seg` (恐怖 diegetic) |
| 标签 | `.badge` `.tag` `.chip` |
| 数据 | `.stat-row` `.stat-key` `.stat-val` |
| 输入 | `.input` `.slider` `.toggle` |
| 容器 | `.dialogue` `.nav-item` `.tab-group` |
| 网格 | `.slot` `.store-item` `.skill-node` |
| 地图 | `.map` `.map-node` `.map-edge` |
| 反馈 | `.alert` `.toast` `.loading` `.tooltip` |
| 列表 | `.list-item` |
| 键盘 | `.kbd` |
| 媒体 | `.waveform` |
| 修饰 | `.diegetic` `.overlay` |
| 布局 | `.grid` `.grid-2/3/4/5/6/8` `.divider` |

## CSS 变量清单

每套风格通过覆写以下变量实现视觉差异（建材层）:

```css
:root {
  --bg, --surface, --surface-2
  --text, --text-muted
  --accent, --accent-2, --accent-soft
  --danger, --warning, --success
  --border, --border-strong
  --shadow-color, --glow
  --radius-sm, --radius, --radius-lg
  --font-display, --font-body, --font-mono
  --duration-fast, --duration-med, --duration-slow
  --easing, --uppercase, --letter-spacing
}
```

## 添加新风格

1. 写 `styles/<number>-<name>.md`（含适用游戏类型）
2. 写 `demo/lib/styles/<name>.css` 覆写 `:root`
3. 在 `demo/scenes/<number>-<name>/` 写**该类型**主场景 HTML（不要复用其他风格的 DOM 骨架）
4. 把入口加到 `demo/scenes/index.html`

## 许可

- 设计规范与示例代码：项目自有
- 第三方美术：见 `demo/assets/CREDITS.md`（CC0 / CC-BY 等）
- **不含**商业游戏官方素材或 Rip
