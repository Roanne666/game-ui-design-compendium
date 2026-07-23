# Game UI Design — Page Library v3

**核心原则:HTML 一次写完,换 CSS 换风格。**

## 架构(3 层)

```
demo/
├── lib/                              ← 共享层
│   ├── components.css                (neutral structural CSS, 35+ 组件类)
│   ├── styles/<name>.css × 10        (只覆写 :root CSS 变量)
│   └── README.md
├── scenes/                           ← 100 个场景 = 10 页面 × 10 风格
│   ├── index.html                     (总览入口)
│   ├── 01-main-menu/<style>.html × 10
│   ├── 02-gameplay-hud/<style>.html × 10
│   ├── 03-inventory/<style>.html × 10
│   ├── 04-map/<style>.html × 10
│   ├── 05-dialogue/<style>.html × 10
│   ├── 06-shop/<style>.html × 10
│   ├── 07-skill-tree/<style>.html × 10
│   ├── 08-settings/<style>.html × 10
│   ├── 09-pause/<style>.html × 10
│   └── 10-loading/<style>.html × 10
└── (其他 demo 目录)
```

## 10 个标准页面

| 页面 | 用途 | 主要组件 |
|------|------|---------|
| 01 main-menu | 标题屏 | `.hero-logo` `.menu-list` `.menu-item-large.primary` |
| 02 gameplay-hud | 游戏中 HUD | `.hud-bar` `.ring` `.map-node` `.alert` `.badge` |
| 03 inventory | 物品栏 | `.slot` `.card` `.stat-row` `.btn` |
| 04 map | 地图 | `.map` `.map-node` `.map-edge` `.stat-row` |
| 05 dialogue | 对话 | `.dialogue` `.choice` `.tooltip` |
| 06 shop | 商店 | `.store-item` `.slider` `.toggle` `.btn` |
| 07 skill-tree | 技能树 | `.skill-node` `.skill-icon` `.skill-edges` |
| 08 settings | 设置 | `.tab-group` `.slider` `.toggle` `.controls-grid` |
| 09 pause | 暂停 | `.menu-item-large` `.modal` |
| 10 loading | 加载 | `.loading` `.loading-fill` `.loading-tip` |

## 100 个场景生成原理

每个页面 HTML 模板使用**仅来自 components.css 的组件类** + 内联 `<style>` 只设置布局/位置。
换风格 = 换 `<link href="lib/styles/<style>.css">`。

`gen-pages.js` 用 Node 脚本批量生成:
- 10 个页面模板(每个 ~80-120 行)
- 10 个 style CSS 引用
- 100 个组合文件

## 使用方式

1. 打开 `demo/scenes/index.html` 查看 10×10 矩阵入口
2. 点击任意 (page, style) 组合 → 直接看效果
3. 想用某风格做某页 → 复制 `scenes/<page>/<style>.html` 作为模板
4. 改内容 = 改 HTML,改风格 = 换 `<link>`

## 添加新页面

1. 在 `gen-pages.js` 添加新 page builder 函数
2. 引用 `../../lib/components.css` + `../../lib/styles/<style>.css`
3. 脚本自动生成 10 份(每个风格一份)

## 添加新风格

1. 在 `lib/styles/<name>.css` 写 `:root { ... }` 覆写变量
2. 脚本自动生成 10 份(每个页面一份)

## 组件库 v2 速查(35+ 类)

| 类别 | 类名 |
|------|------|
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
