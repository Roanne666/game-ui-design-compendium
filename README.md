# Game UI Design Encyclopedia

10 套游戏 UI 风格的可落地设计系统。每套风格 = 1 份 spec 文档 + 1 套 CSS token + 1 份参考场景。

```
游戏UI设计大全/
├── styles/                        ← 10 套风格 spec
│   ├── 01-cyberpunk-hud.md       (Deus Ex / CP2077)
│   ├── 02-dark-fantasy.md        (FromSoftware)
│   ├── 03-scifi-space.md         (Elite Dangerous / EVE)
│   ├── 04-pixel-retro.md         (NES / PICO-8)
│   ├── 05-hand-drawn-illustrative.md (Hades)
│   ├── 06-cartoon-comic.md       (Borderlands)
│   ├── 07-survival-horror.md     (Dead Space / RE)
│   ├── 08-anime-colorful.md      (Persona 5)
│   ├── 09-tactical-military.md   (Tarkov / ARMA)
│   └── 10-synthwave-neon.md      (Hotline Miami / Outrun)
├── demo/                          ← 共享组件库 + 1 参考 demo
│   ├── lib/
│   │   ├── components.css         (35+ 共享组件类,neutral structural)
│   │   ├── styles/<name>.css ×10 (每套只覆写 :root 变量)
│   │   └── README.md              (组件库使用文档)
│   └── 01-cyberpunk-hud/         (10 套各 1 个参考场景)
│       ├── scene.html
│       └── scene.png
└── research/                      ← 原始研究材料
    ├── raw/                       (anysearch 搜索结果)
    ├── synthesis/style-boundaries.md (10 套风格互斥边界)
    └── references.md              (引用来源)
```

## 核心原则

**HTML 一次写完,换 CSS 换风格。**

所有 demo HTML 只引用两个 link:
```html
<link rel="stylesheet" href="lib/components.css">
<link rel="stylesheet" href="lib/styles/cyberpunk.css">
```

每套风格的差异完全在 `lib/styles/<name>.css` 的 `:root` 变量覆写里。

## Quickstart

### 1. 查看风格 spec

打开 `styles/01-cyberpunk-hud.md` 看该风格的设计原则、色彩、字体、几何、动效。

### 2. 查看参考场景

打开 `demo/01-cyberpunk-hud/scene.html` 在浏览器看该风格在游戏场景中的实际效果。

### 3. 用组件库

复制 `demo/lib/components.css` + `demo/lib/styles/<name>.css` 到项目,写 HTML 时使用对应类名(35+):

```html
<button class="btn btn-primary">[ CONFIRM ]</button>

<div class="hud-bar">
  <span class="hud-bar-label">HP</span>
  <div class="hud-bar-track">
    <div class="hud-bar-fill" style="width:75%"></div>
  </div>
  <span class="hud-bar-value">780</span>
</div>

<div class="dialogue">
  <div class="dialogue-portrait">♛</div>
  <div>
    <div class="dialogue-name">▣ FIXER</div>
    <div class="dialogue-text">Meet me at the ripper.</div>
  </div>
</div>
```

### 4. 切换风格

把 `<link>` 换到 `lib/styles/<other-style>.css`,组件自动适配,无需改 HTML。

## 组件库清单(35+)

| 类别 | 组件类 |
|------|-------|
| 按钮 | `.btn` + `.btn-primary/-secondary/-danger/-warning/-ghost` |
| 主菜单 | `.menu-item-large` `.menu-list` `.hero-logo` |
| 面板 | `.panel` `.panel-title` `.card` |
| 进度 | `.progress` `.progress-linear` `.hud-bar` |
| 圆环 | `.ring` (内联 SVG) |
| 弧形 | `.arc-bar` (Elden Ring 风格) |
| 脊柱 | `.spine-bar` `.spine-seg` (Dead Space 风格) |
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

每套风格通过覆写以下变量实现视觉差异:

```css
:root {
  --bg, --surface, --surface-2     /* 底色 */
  --text, --text-muted             /* 文本 */
  --accent, --accent-2, --accent-soft /* 强调色 */
  --danger, --warning, --success  /* 状态色 */
  --border, --border-strong       /* 边框 */
  --shadow-color, --glow           /* 阴影/辉光 */
  --radius-sm, --radius, --radius-lg /* 圆角 */
  --font-display, --font-body, --font-mono /* 字体族 */
  --duration-fast, --duration-med, --duration-slow /* 动效时长 */
  --easing, --uppercase, --letter-spacing /* 动效曲线 + 文字处理 */
}
```

## 添加新风格

1. 写 `lib/styles/<name>.css`:
```css
:root {
  --bg: #...;
  --accent: #...;
  /* 覆写需要差异化的变量 */
}
```
2. 写 `styles/<number>-<name>.md` (12 章节 spec 模板)
3. 写 `demo/<number>-<name>/scene.html` (1 个参考场景)

无需改 components.css 或任何现有 HTML。

## 添加新页面

1. 在 `demo/<style>/scene.html` 追加新 HTML(复用现有组件类)
2. 切到另一风格:改 `<link>` 即可

## 10 套风格来源(真实游戏 UI)

| # | 风格 | 来源 |
|---|------|------|
| 01 | Cyberpunk HUD | Deus Ex / Cyberpunk 2077 |
| 02 | Dark Fantasy | Dark Souls / Elden Ring / Bloodborne |
| 03 | Sci-Fi Space Sim | Elite Dangerous / EVE / Star Citizen |
| 04 | Pixel Retro | NES / PICO-8 |
| 05 | Hand-drawn | Hades / Sea of Stars |
| 06 | Cartoon Comic | Borderlands / Hi-Fi Rush |
| 07 | Survival Horror | Dead Space / Resident Evil |
| 08 | Anime Colorful | Persona 5 |
| 09 | Tactical Military | Tarkov / ARMA / SOCOM |
| 10 | Synthwave Neon | Hotline Miami / Outrun |

## 风格边界(互斥规则)

详见 `research/synthesis/style-boundaries.md`。

**简版**:
- Cyberpunk vs Synthwave:共享霓虹+扫描线,前者冷(青/红/黑),后者暖(粉/紫/橙)
- Dark Fantasy vs Anime Colorful:都强对比,前者暗金古朴,后者红黑白现代
- Pixel Retro vs 其他:唯一硬性网格对齐,抗锯齿=0
- Glassmorphism 已删除(OS 设计系统,非游戏专属)

## 引用

- [Cyberpunk 2077 UX Analysis - Protypr](https://prototypr.io/post/a-ux-analysis-of-cyberpunk-2077s-hud)
- [FromSoftware UI/UX Discussion - Kotaku](https://kotaku.com/elden-ring-ui-ux-user-experience-interface-fromsoftware-1848637410)
- [Borderlands Art Style - Destructoid](https://www.destructoid.com/borderlands-explains-its-not-cel-shaded-actually-art-style/)
- [Persona 5 UI Secrets - Siliconera](https://www.siliconera.com/atlus-reveals-design-secrets-behind-persona-5s-distinctive-ui/)
- [interfaceingame.com](https://interfaceingame.com/) - 12 个标准 UI 元素分类
- [gameui.net](https://www.gameui.net/) - 中国游戏 UI 设计师社区

## 许可

本项目仅含设计规范和示例代码,不含任何受版权保护的游戏资产(logo、icon、screenshot)。
