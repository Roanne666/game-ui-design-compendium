# 游戏 UI 设计大全 — 项目规范

## 目标

蒸馏多套**可程序化生成**的游戏 UI 风格文档。每套风格绑定**适合该风格的游戏类型**：参数化规则 + 类型正确的参考场景。工程师拿规则可生成按钮/面板/血条等。**只定义风格,不涉及具体美术素材**(icon、character art、logo)。

**Agent 路由**：目标游戏有对应风格 → 套用 `library/packs/<id>/`；无对应 → 走通用竖屏游戏 UI 思路（`docs/rules` + `library/components`，不硬套 pack）。见 `skills/game-ui-style/SKILL.md`。

**本项目为移动端竖屏服务**（画幅 **9:20 定死**，主输入为触控）。桌面浏览器仅作预览壳。  
**楼型与玩法循环按游戏类型区分**，禁止全库套同一套「锁定 + 开火」动作条。见 `docs/rules/mobile-portrait-first.md`。  
**控件同语汇、反网页壳**：见 `docs/rules/game-feel-vs-web.md`。

## 核心原则

**建材共享,楼型按游戏类型分；画幅统一竖屏 9:20，玩法不统一。**

- `library/components/`：共享建材（components.css / phone-frame.css / game-feel.css / scene-kit.js）
- `library/packs/<id>/`：每风格独立包（Spec + Token + 场景 + 专属素材）；场景楼型与**核心玩法**必须符合该类型游戏,禁止「同一套 DOM 换皮」或统一锁定开火模板
- **栈约定（全库统一）**：主场景必须挂共享栈（components → phone-frame → game-feel → pack 内 `tokens.css` → 可选私有 css → scene-kit）。根容器 `.game-root`（可与历史 `#viewport` 同元素）。禁止旁路省略共享栈
- 调试时仍可用换 Token 对比建材,但**不得**作为对外主叙事
- **竖屏硬规则**：场景 `#viewport` 默认 9:20；操作必须有可见触控控件；禁止以键鼠快捷键为唯一操作路径
- **触控语义**：提示文案用点按/拖动/长按，不用 LMB/RMB/WASD 作为主说明
- **认形交互**：图标/物件/仪表格/指令窗等按类型选用；中文留给情境提示、菜单与 `aria-label`
- **界面文案一律中文**：玩家可见的标签、任务、提示、日志、帮助均为中文；专有名词可保留原文但须有中文主文案（如「霓虹方言 / NOIR」）

## 目录约定

```
游戏UI设计大全/
├── CLAUDE.md
├── README.md
├── library/                         # UI 组件库 + 范例（其他游戏参考用）
│   ├── index.html                   # 风格入口表
│   ├── components/                  # 共享建材层
│   │   ├── README.md
│   │   ├── components.css           # 35+ 通用组件类
│   │   ├── phone-frame.css          # 9:20 手机壳（CSS 变量可主题化）
│   │   ├── game-feel.css            # HUD 层 / vignette / 锚点
│   │   └── scene-kit.js             # 交互 helper
│   ├── packs/                       # 每风格独立包
│   │   └── <nn-style>/
│   │       ├── SPEC.md              # 参数化风格规范
│   │       ├── tokens.css           # 风格 token 覆写
│   │       ├── index.html           # 竖屏触控主场景
│   │       └── assets/              # 该风格专属素材
│   ├── assets/
│   │   ├── CREDITS.md
│   │   └── _shared/                 # 第三方 CC0 / CC-BY 素材
│   └── previews/                    # shoot.js 输出（gitignored）
├── research/
│   ├── README.md
│   ├── references.md
│   ├── raw/                         # 原始调研笔记
│   └── synthesis/                   # 提炼的设计原则（不含 hard rules）
├── docs/
│   ├── README.md
│   ├── rules/                       # 实践得出的硬规则
│   │   └── mobile-portrait-first.md # 9:20 + 玩法矩阵（权威）
│   ├── plans/                       # 实施计划
│   └── specs/                       # 设计规格
└── tools/                           # shoot.js / chroma_key.py
```

## 风格文档模板

每个 `library/packs/<id>/SPEC.md` 必须包含以下章节(顺序固定):

1. **风格定位** — 一句话定位 + 代表作参考
2. **适用游戏类型** — 适合 / 不适合(≥3) / 推荐场景包
3. **视觉关键词** — 10-15 个核心形容词
4. **色彩系统** — 主色/辅色/强调色/语义色(HEX 或 HSL),含配色原则
5. **几何与构图** — 圆角、间距、对齐、网格、比例（须含竖屏锚点意识）
6. **边框与容器** — 面板、按钮、卡片的具体构造规则(参数化)
7. **文字与排版** — 字体倾向、字重、间距、对齐
8. **光影与质感** — 阴影、辉光、纹理、噪点、渐变
9. **动效原则** — 入场/退出/状态切换的曲线与时长
10. **状态语义** — normal/hover/active/disabled 的视觉差（移动端以 pressed/选中为主，不依赖 hover）
11. **可程序化生成参数表** — 一张表,列名/类型/范围/默认值/说明
12. **不做什么** — 反例,避免风格跑偏
13. **可生成部件清单** — 该风格下哪些 UI 部件用此风格渲染

## 约束

- 风格文档必须**纯参数化**:不引用具体素材文件名、不嵌入位图、不依赖字体文件路径
- 任何颜色用 HSL 或 HEX 数值,不写"红色"这种模糊描述
- 任何动效用曲线名(ease-in-out) + 秒数,不写"流畅"
- 每套风格至少给出 5 个**反例**(不要做什么)
- 反例的目的是划定边界,避免风格相互污染
- Demo 场景必须类型正确:打开主场景应能辨认游戏大类与**玩法循环**,而非「换了颜色的同一锁定开火页」
- Demo 默认 **移动端竖屏 9:20 + 触控**；键鼠仅调试捷径，不得作为玩家主路径
- Demo / Spec 示例中**玩家可见 UI 文案必须为中文**
- Spec「适用游戏类型」须写明**布局原型 + 核心玩法**（与 `docs/rules/mobile-portrait-first.md` §4 矩阵一致）

## 验证

- 跑过不验证 = 没做
- 每写完 3 套风格,回头检查模板完整性
- 写完所有风格,做一次交叉对比,确保风格之间**互斥不重叠**（含玩法互斥）
- 每风格至少 1 个可打开主场景通过类型盲测
- 竖屏触控盲测：隐藏帮助文案后，仍可完成**该类型矩阵规定的**核心循环
