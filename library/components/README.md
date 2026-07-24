# Components — 共享建材层

**角色：建材层。** 场景布局在 `library/scenes/<style>/`，按游戏类型独占编写。

**交付形态：移动端竖屏 + 触控**（见仓库根 `docs/rules/mobile-portrait-first.md`）。共享组件的热区与状态应以触控为准，不依赖 hover。

## 模块

```
components/
├── components.css           # 35+ 中性结构组件（吃 CSS 变量）
├── phone-frame.css          # 9:20 手机壳 + bezel + 9:20 锁帧（可主题化）
├── game-feel.css            # HUD 层 / vignette / 锚点 / reticle
├── scene-kit.js             # 交互 helper（toast / modal / pulse / 锚点）
├── styles/<name>.css ×10    # 10 套 token 覆写 :root
└── README.md
```

## 加载顺序

```html
<link rel="stylesheet" href="../../components/components.css" />
<link rel="stylesheet" href="../../components/phone-frame.css" />
<link rel="stylesheet" href="../../components/game-feel.css" />
<link rel="stylesheet" href="../../components/styles/<name>.css" />
<script src="../../components/scene-kit.js"></script>
```

## 自建页面

1. 打开 `library/scenes/index.html` 选风格 → 用手机或 DevTools **竖屏**进入主场景
2. 自建页面：引用上面四个 CSS + scene-kit.js，按 Spec「适用游戏类型」设计信息架构；控件 ≥44px 热区
3. 新风格：加 Token + 新场景目录 + 登记 index；**不要**复制其他风格的整页 DOM 再换 link

## phone-frame.css 可覆写变量

标准几何对齐 **02 Dark Fantasy**：`min(92vw, 96dvh×9/20)`、圆角 28、双层阴影。  
`#viewport`（01–03）与 `.game-root`（04–10）共用同一套壳。

```css
:root {
  --phone-border-color:  rgba(255, 255, 255, 0.08);  /* bezel 边框色 */
  --phone-shadow-ring:   0 0 0 1px rgba(0, 0, 0, 0.85); /* 外黑环 */
  --phone-shadow-drop:   0 24px 64px rgba(0, 0, 0, 0.65); /* 落影 */
  --phone-shadow-inset:  inset 0 0 0 1px rgba(255, 255, 255, 0.04); /* 内描边 */
  --phone-border-radius: 28px;
}
```

例：02 金边在 `hud.css` 的 `:root` 覆写 `--phone-border-color` / `--phone-shadow-inset`。

## 组件速查(35+)

| 类别 | 类名 |
|------|------|
| 按钮 | `.btn` + `.btn-primary/-secondary/-danger/-warning/-ghost` |
| 主菜单 | `.menu-item-large` `.menu-list` `.hero-logo` |
| 面板 | `.panel` `.panel-title` `.card` |
| 进度 | `.progress` `.hud-bar` `.arc-bar` `.spine-bar` `.spine-seg` |
| 圆环 | `.ring` (内联 SVG) |
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

完整类名以 `components.css` 为准。