# /apply-style

在用户项目中生成或改造移动端竖屏游戏 UI：有 pack 则套用；无对应则按该游戏类型自建。

## 用法

```
/apply-style <pack-id>
/apply-style custom
```

例：`/apply-style 04-pixel-retro`　或　`/apply-style custom`

若用户未指定：先 `/pick-style`（或按 `game-ui-style` 做分支判定）再继续。

## 步骤 — pack 模式

1. 确认 pack id 有效（`01-cyberpunk-hud` … `10-synthwave-neon`）
2. 遵循 `skills/game-ui-style/SKILL.md` **路径 A**
3. 读该 pack 的 `SPEC.md`、`tokens.css`、`scene.css`、`scene.js`、`index.html`；按 `library-map` 加载序落地
4. 文案中文；触控语义；可选 `/audit-hud`

## 步骤 — custom 模式（无对应 pack）

1. 确认目标游戏**无合适 pack**（或用户显式要求自建）
2. 遵循 `skills/game-ui-style/SKILL.md` **路径 B**
3. 必读硬规则；只用共享 `library/components/`；**自拟** tokens / scene 样式与逻辑
4. 楼型必须服务**该游戏**的类型与核心循环（可用矩阵作分区参考，不抄 pack DOM/视觉）
5. 可选 `/audit-hud`（报告须写明路径 B / `custom` 与约定循环）

## 约束

- 禁止无对应时偷偷改用「最近的」pack 换皮
- 禁止一次加载多个 pack 的全量 HTML
- 禁止统一锁定开火模板覆盖类型不允许的玩法
- 禁止假设有仓库内「通用场景」可复制
