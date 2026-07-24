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
│   └── <id>/                   # 每风格一个 pack（例：01-cyberpunk-hud）
│       ├── SPEC.md             # 风格规格（参数化规则）
│       ├── tokens.css          # 该风格 token 覆写
│       ├── index.html          # 主场景（竖屏 9:20 触控）
│       ├── *.css               # 场景私有样式（如有）
│       └── assets/             # 风格专属位图（可空）
└── assets/
    ├── CREDITS.md
    └── _shared/                # 第三方共享素材
```

Pack ID 列表：`01-cyberpunk-hud` … `10-synthwave-neon`（见 `references/style-matrix.md`）。

## HTML 加载序

场景 `<head>` 中 CSS / JS 必须按此顺序：

```html
<link rel="stylesheet" href="../../components/components.css" />
<link rel="stylesheet" href="../../components/phone-frame.css" />
<link rel="stylesheet" href="../../components/game-feel.css" />
<link rel="stylesheet" href="./tokens.css" />
<!-- 可选：场景私有 css，如 hud.css / layout-9x20.css -->
<script src="../../components/scene-kit.js" defer></script>
```

路径相对各 pack 的 `index.html` 调整；共享层始终先于 pack token，token 先于场景私有覆写。

## Agent 约束

**Agent 每次只打开一个 pack；禁止扫齐 10 套场景 HTML。**
