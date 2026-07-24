# Library 目录与加载序

## 目录树

```
library/
├── components/                 # 共享建材（跨风格）
│   ├── components.css
│   ├── phone-frame.css
│   ├── game-feel.css
│   ├── scene-kit.js
│   └── README.md
├── packs/
│   └── <id>/                   # 每风格一个 pack（01–10 同构）
│       ├── SPEC.md
│       ├── tokens.css
│       ├── scene.css
│       ├── scene.js
│       ├── index.html
│       └── assets/             # 可空
└── assets/
    ├── CREDITS.md
    └── _shared/
```

Pack ID：`01-cyberpunk-hud` … `10-synthwave-neon`（见 `references/style-matrix.md`）。

**有对应风格 → 打开单个 pack。**  
**无对应 → 无仓库内通用场景**；按该游戏类型自建 `tokens.css` / `scene.css` / `scene.js`，仍用下方加载序 + 硬规则。

## 预览入口

- 总览：[`library/index.html`](../library/index.html)
- 单包：`library/packs/<id>/index.html`

## HTML 加载序（唯一标准）

```html
<link rel="stylesheet" href="../../components/components.css" />
<link rel="stylesheet" href="../../components/phone-frame.css" />
<link rel="stylesheet" href="../../components/game-feel.css" />
<link rel="stylesheet" href="./tokens.css" />
<link rel="stylesheet" href="./scene.css" />
<script src="../../components/scene-kit.js"></script>
<script src="./scene.js"></script>
```

根容器：优先 `.game-root`。历史场景可同时保留 `#viewport`（与 `.game-root` 同元素：`id="viewport" class="game-root"`），phone-frame 对两者几何一致。

## Agent 约束

- 有对应 → 每次只打开 **一个** pack；禁止扫齐 10 套 HTML
- 无对应 → 只读硬规则 + `library/components/` + 本加载序；禁止为凑合打开「最近」pack 当皮肤或楼型源
- 生成到用户项目时 **必须** 使用上表加载序
