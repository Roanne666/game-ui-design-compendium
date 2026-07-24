# Design: Agent Plugin + library/packs 收拢

日期: 2026-07-25  
状态: 已确认；实施计划见同目录 implementation 文档  
形态: Claude / Cursor **Agent Plugin**（对标 `incremental-game-framework`）

---

## 1. 目标

把本仓库改造成可安装的 Agent Plugin：装上后 Agent 能按游戏类型选型、读硬规则、对照实践实现生成 **移动端竖屏 9:20 + 触控 + 中文文案** 的游戏 UI。

同时把「一套风格」的全部内容收进 `library/packs/<id>/`，使 Spec、token、场景、风格专属素材同目录，共享层只留真正跨风格的建材。

**非目标（第一期）**

- 不做 npm 前端包单独发布
- 不重写各风格玩法 / 不重做场景美术
- 不把 `research/raw` 打进 Skill 默认触发链

---

## 2. 决策摘要（已确认）

| 决策 | 选择 |
|------|------|
| 交付形态 | A：Claude / Cursor Agent Plugin（`.claude-plugin` + `skills/` + `commands/`） |
| 架构 | 分层：Skill 路由 + references 短索引 + 完整 library 实践 |
| `library/` | **完整保留并升级为样式库主体**（实践一等公民） |
| Spec 位置 | 根 `styles/` **并入** `library/packs/<id>/SPEC.md` |
| Pack 粒度 | 每风格对应内容 **全部** 收进该 pack（SPEC + tokens + 场景 + 专属 assets） |
| 共享层 | 仅 `library/components/`（中性组件）+ `library/assets/_shared/` + `CREDITS.md` |

---

## 3. 目标目录

```
游戏UI设计大全/
├── .claude-plugin/
│   └── plugin.json                 # name, skills, commands
├── skills/
│   ├── game-ui-style/
│   │   └── SKILL.md                # 主路由：选型 → 读 pack → 生成
│   └── audit-game-hud/
│       └── SKILL.md                # 验收：9:20 / 玩法互斥 / 反网页壳
├── commands/
│   ├── pick-style.md
│   ├── apply-style.md
│   └── audit-hud.md
├── references/
│   ├── hard-rules.md               # 摘要 + 链到 docs/rules/*
│   ├── style-matrix.md             # 类型→布局→玩法短表 → packs
│   └── library-map.md              # components 加载序 + pack 约定
├── library/
│   ├── index.html                  # 风格入口 → 各 pack/index.html
│   ├── components/                 # 仅共享建材（无 per-style token）
│   │   ├── components.css
│   │   ├── phone-frame.css
│   │   ├── game-feel.css
│   │   ├── scene-kit.js
│   │   └── README.md
│   ├── packs/
│   │   ├── README.md               # 原 styles/README + 索引
│   │   ├── 01-cyberpunk-hud/
│   │   │   ├── SPEC.md
│   │   │   ├── tokens.css
│   │   │   ├── index.html
│   │   │   ├── *.css               # 场景私有（如有）
│   │   │   └── assets/             # 风格专属位图（可空）
│   │   └── 02..10/                 # 同构
│   └── assets/
│       ├── CREDITS.md
│       └── _shared/                # 仅第三方共享素材
├── docs/
│   ├── rules/                      # 硬规则权威稿（保留）
│   └── plans/                      # 本设计与后续实施计划
├── research/                       # 调研底稿；Skill 默认不读 raw
├── tools/                          # shoot 等维护工具
├── README.md
├── INSTALL.md
└── CLAUDE.md                       # 更新为 pack 路径约定
```

**迁完后删除（空壳）**

- 根目录 `styles/`
- `library/scenes/`
- `library/components/styles/`
- `library/assets/project/`（内容已迁入各 pack 的 `assets/`）

---

## 4. Pack 约定

### 4.1 十套 ID（不变）

| ID | tokens 源文件（现名） | 场景源 | project 资产 |
|----|----------------------|--------|--------------|
| `01-cyberpunk-hud` | `cyberpunk.css` | `scenes/01-cyberpunk-hud/` | `assets/project/01-cyberpunk-hud/`（若有） |
| `02-dark-fantasy` | `dark-fantasy.css` | `scenes/02-dark-fantasy/` | 同左 |
| `03-scifi-space` | `scifi-space.css` | `scenes/03-scifi-space/` | 同左 |
| `04-pixel-retro` | `pixel-retro.css` | `scenes/04-pixel-retro/` | 同左 |
| `05-hand-drawn` | `hand-drawn.css` | `scenes/05-hand-drawn/` | 可无 → 空 `assets/` 或不建 |
| `06-cartoon-comic` | `cartoon-comic.css` | `scenes/06-cartoon-comic/` | 可无 |
| `07-survival-horror` | `survival-horror.css` | `scenes/07-survival-horror/` | 同左 |
| `08-anime-colorful` | `anime-colorful.css` | `scenes/08-anime-colorful/` | 同左 |
| `09-tactical-military` | `tactical-military.css` | `scenes/09-tactical-military/` | 同左 |
| `10-synthwave-neon` | `synthwave-neon.css` | `scenes/10-synthwave-neon/` | 同左 |

### 4.2 Pack 内文件职责

| 路径 | 职责 |
|------|------|
| `SPEC.md` | 原 13 章风格 Spec（内容不砍章节；仅改相对链接） |
| `tokens.css` | 该风格 `:root` 变量覆写 |
| `index.html` | 9:20 主场景（完整可交互） |
| 其它本地 `*.css` / 辅助文件 | 仅本风格楼型（如 `hud.css`、`layout-9x20.css`） |
| `assets/**` | 仅本风格位图/图标；引用改为 pack 相对路径 |

### 4.3 统一加载顺序

```html
<link rel="stylesheet" href="../../components/components.css" />
<link rel="stylesheet" href="../../components/phone-frame.css" />
<link rel="stylesheet" href="../../components/game-feel.css" />
<link rel="stylesheet" href="./tokens.css" />
<!-- 可选：本 pack 私有 css -->
<script src="../../components/scene-kit.js"></script>
```

文档与 10 个 `index.html` **只描述这一套**加载序。01–03 现有旁路（独立 hud / 本地 9:20 壳）在迁入时收进该 pack 的本地 css，不再作为全局第二种架构对外叙事。

### 4.4 路径迁移映射

| 现路径 | 新路径 |
|--------|--------|
| `styles/NN-*.md` | `library/packs/NN-*/SPEC.md` |
| `styles/README.md` | `library/packs/README.md`（合并更新） |
| `library/components/styles/<name>.css` | `library/packs/NN-*/tokens.css` |
| `library/scenes/NN-*/**` | `library/packs/NN-*/**`（除需改名的入口约定外原样） |
| `library/scenes/index.html` | 并入 `library/index.html` 或改为指向 packs 的薄跳转后删除 |
| `library/assets/project/NN-*/**` | `library/packs/NN-*/assets/**` |
| `library/assets/_shared/**` | 不动 |
| `library/assets/CREDITS.md` | 不动（更新内部路径说明） |

---

## 5. Plugin 行为

### 5.1 `plugin.json`（示意）

```json
{
  "name": "game-ui-encyclopedia",
  "version": "1.0.0",
  "description": "10 procedural mobile-portrait game UI styles: specs, shared components, per-style packs.",
  "skills": "./skills/",
  "commands": "./commands/"
}
```

### 5.2 Skill 工作流

**`game-ui-style`（主）**

1. 触发：游戏 HUD / UI 风格 / 竖屏触控界面 / 选风格  
2. 读 `references/style-matrix.md` + `references/hard-rules.md`（或直接 `docs/rules/*`）  
3. 选定 **一个** `library/packs/<id>/`  
4. 读该 pack 的 `SPEC.md` + `tokens.css` + `index.html`（需要时再读本地 css / assets）  
5. 在用户项目中按同一加载序与楼型生成；文案中文；触控语义；禁止统一锁定开火模板  

**`audit-game-hud`（验收）**

- 对照 `docs/rules/mobile-portrait-first.md` 矩阵与 `game-feel-vs-web.md`  
- 输出盲测清单：画幅、玩法循环、热区、中文、反网页壳、风格互斥  

### 5.3 Commands

| 命令 | 作用 |
|------|------|
| `/pick-style` | 按游戏类型输出推荐 pack id + 理由 |
| `/apply-style` | 按指定 pack 生成或改造 UI |
| `/audit-hud` | 跑验收清单 |

### 5.4 references 原则

- **短**：可进上下文的索引与硬约束摘要  
- **不代替** `docs/rules` 权威稿与 pack 内 `SPEC.md` / 场景  
- `library-map.md` 只说明目录约定与加载序  

---

## 6. 清理范围

### 6.1 做

- 迁完删除空目录：`styles/`、`library/scenes/`、`library/components/styles/`、`library/assets/project/`  
- 全库链接更新：根 README、CLAUDE.md、`docs/rules` 内链、入口 HTML、CREDITS、pack 内相对路径  
- `research/raw/**`：保留在仓，但 Skill / references **默认不链**  
- 去掉文档中「根 styles + scenes 分置」的旧叙事；统一为 pack  

### 6.2 不做（本设计范围外）

- 删除或重做 `library/packs/*/assets` 位图  
- 删除 `tools/`、`research/synthesis`（可保留供人类）  
- 改变 10 套锚定游戏类型或矩阵玩法  

---

## 7. 分期实施

| 阶段 | 内容 | 完成标准 |
|------|------|----------|
| **P0** | `.claude-plugin`、skills/commands 骨架、`references/*`（按 pack 路径书写） | 可安装；Skill 文案路径正确（即使 pack 尚未迁完可先写目标路径并在 P2 对齐） |
| **P1** | 迁 **1** 个 pack 试点（建议 `04-pixel-retro` 或结构简单者）：SPEC + tokens + scene + assets + 链接 | 浏览器打开该 pack `index.html` 正常；中文无乱码 |
| **P2** | 迁完 10 pack；删旧目录；修全库链接；更新 CLAUDE/README/INSTALL | 入口可进全部 pack；旧路径无残留引用 |
| **P3** | Skill/commands 接真实 pack；安装说明；可选一次交叉盲测清单 | `/pick-style`→打开正确 pack；audit 清单可用 |

推荐试点：优先 **已走共享栈且依赖清晰** 的 `04–10` 之一（如 `04-pixel-retro`）；`01–03` 放在同批后半，顺带收拢本地 hud 叙事。

---

## 8. 风险与约束

| 风险 | 缓解 |
|------|------|
| 相对路径深度变化导致 CSS/图裂 | P1 单 pack 验收后再批量；用入口页点开检查 |
| Windows 下中文路径/编码 | 迁移用编辑器 Write/StrReplace 或 `git mv`；禁止 PowerShell 重写含中文源文件 |
| CREDITS / 素材路径失效 | 迁 assets 时同步改 HTML `src` 与 CREDITS |
| Agent 一次读太多 pack | Skill 强制「只打开选定的一个 pack」 |
| 双轨文档（旧 styles 路径） | P2 用搜索清残留 `styles/0`、`scenes/0`、`components/styles` |

硬约束（不变）：9:20、触控主路径、中文 UI、楼型按类型、反网页壳、禁止统一锁定开火模板。

---

## 9. 成功标准

1. 仓库可作为 Agent Plugin 安装（`plugin.json` + 至少主 Skill 可触发）。  
2. 每套风格内容仅出现在 `library/packs/<id>/`（SPEC、tokens、场景、专属资产）。  
3. 共享组件仍在 `library/components/`，无 per-style token 残留。  
4. 打开任意 pack 主场景，类型与玩法仍可盲测辨认。  
5. 根 `styles/` 与 `library/scenes/` 不再存在；文档无旧路径作为主叙事。  

---

## 10. 审阅后下一步

用户确认本 design 后：用 writing-plans 流程产出 `docs/plans/2026-07-25-agent-plugin-pack-implementation.md`（按 P0–P3 拆可执行任务），再动手迁移。
