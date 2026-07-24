# /apply-style

在用户项目中生成或改造移动端竖屏游戏 UI：有 pack 则套用；无对应则走通用路径。

## 用法

```
/apply-style <pack-id>
/apply-style generic
```

例：`/apply-style 04-pixel-retro`　或　`/apply-style generic`

若用户未指定：先 `/pick-style`（或按 `game-ui-style` 做分支判定）再继续。

## 步骤 — pack 模式

1. 确认 pack id 有效（`01-cyberpunk-hud` … `10-synthwave-neon`）
2. 遵循 `skills/game-ui-style/SKILL.md` **路径 A**
3. 读该 pack 的 `SPEC.md`、`tokens.css`、`index.html`；按 `library-map` 加载序落地
4. 文案中文；触控语义；可选 `/audit-hud`

## 步骤 — generic 模式

1. 确认目标游戏**无合适 pack**（或用户显式要求通用）
2. 遵循 `skills/game-ui-style/SKILL.md` **路径 B**
3. 对照 `library/examples/generic/`；必读硬规则；共享栈 + 自拟/复制 generic tokens
4. 楼型按该游戏自身类型设计；可选 `/audit-hud`（报告须写明路径 `generic` 与约定循环）

## 约束

- 禁止无对应时偷偷改用「最近的」pack 换皮
- 禁止一次加载多个 pack 的全量 HTML
- 禁止统一锁定开火模板覆盖类型不允许的玩法
