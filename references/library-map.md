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
│       ├── index.html
│       ├── scene.css           # 场景楼型私有样式（tokens 之后）
│       ├── *.css               # 额外私有（如 01 的 layout-9x20.css）
│       └── assets/             # 可空
├── examples/
│   └── generic/                # 无对应风格时的最小通用 HUD
│       ├── README.md
│       ├── tokens.css
│       └── index.html
└── assets/
    ├── CREDITS.md
    └── _shared/
```

Pack ID：`01-cyberpunk-hud` … `10-synthwave-neon`（见 `references/style-matrix.md`）。

**全部 pack（含 01–03）与 generic 使用同一套加载序。** 楼型写在 `scene.css`（tokens 之后）；额外私有 css 可选。

## 预览入口

- 总览：[`library/index.html`](../library/index.html)
- 单包：`library/packs/<id>/index.html`
- 通用：[`library/examples/generic/index.html`](../library/examples/generic/index.html)

## HTML 加载序（唯一标准）

```html
<link rel="stylesheet" href="../../components/components.css" />
<link rel="stylesheet" href="../../components/phone-frame.css" />
<link rel="stylesheet" href="../../components/game-feel.css" />
<link rel="stylesheet" href="./tokens.css" />
<link rel="stylesheet" href="./scene.css" />
<!-- 可选：额外私有 css，如 layout-9x20.css -->
<script src="../../components/scene-kit.js" defer></script>
```

根容器：优先 `.game-root`。历史场景可同时保留 `#viewport`（与 `.game-root` 同元素：`id="viewport" class="game-root"`），phone-frame 对两者几何一致。

## Agent 约束

- 有对应 → 每次只打开 **一个** pack；禁止扫齐 10 套 HTML
- 无对应 → 打开 `examples/generic/` + 硬规则，禁止为凑合打开「最近」pack 当皮肤
- 生成到用户项目时 **必须** 使用上表加载序，不得省略共享三件套或 `tokens.css`
