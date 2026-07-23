# Game UI Design — Shared Component Library

**角色：建材层。** 场景布局在 `demo/scenes/<style>/`，按游戏类型独占编写。

## 架构

```
demo/
├── lib/
│   ├── components.css           # 中性结构组件（吃 CSS 变量）
│   ├── styles/<name>.css ×10    # 只覆写 :root
│   └── README.md
└── scenes/
    ├── index.html               # 风格入口
    └── <nn-style>/<main>.html   # 每风格类型正确的主场景
```

不要生成或维护「10 页面 × 10 风格」矩阵。换 Token 仅用于调试建材，不能代替类型正确的场景。

## 使用方式

1. 打开 `demo/scenes/index.html` 选风格 → 进入该类型主场景
2. 自建页面：引用 `components.css` + 一套 `styles/<name>.css`，按 Spec「适用游戏类型」设计信息架构
3. 新风格：加 Token + 新场景目录 + 登记 index；**不要**复制其他风格的整页 DOM 再换 link

## 组件速查(35+)

| 类别 | 类名 |
|------|------|
| 按钮 | `.btn` + variants |
| 主菜单 | `.menu-item-large` `.menu-list` `.hero-logo` |
| 面板 | `.panel` `.panel-title` `.card` |
| 进度 | `.progress` `.hud-bar` `.arc-bar` `.spine-bar` |
| 其他 | `.dialogue` `.slot` `.store-item` `.skill-node` `.map` `.alert` `.loading` …

完整类名以 `components.css` 为准。
