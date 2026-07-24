# /apply-style

按指定 pack 在用户项目中生成或改造移动端竖屏游戏 UI。

## 用法

```
/apply-style <pack-id>
```

例：`/apply-style 04-pixel-retro`

若用户未指定 pack，先运行 `/pick-style` 或询问游戏类型后再继续。

## 步骤

1. 确认 pack id 有效（`01-cyberpunk-hud` … `10-synthwave-neon`）
2. 遵循 `skills/game-ui-style/SKILL.md` 工作流：
   - 读 `references/style-matrix.md`、`references/hard-rules.md`
   - 读 `library/packs/<id>/SPEC.md`、`tokens.css`、`index.html`
   - 按 `references/library-map.md` 加载序生成 HTML/CSS
3. 界面文案中文；触控语义；单 pack 单场景参考
4. 可选：完成后建议用户运行 `/audit-hud` 验收

## 约束

- 必须指定 pack id（或经 pick-style 选定）
- 禁止一次加载多个 pack 的全量 HTML
- 禁止统一锁定开火模板覆盖矩阵不允许的类型
