# /audit-hud

对当前场景或用户项目中的游戏 HUD 执行验收清单。

## 用法

```
/audit-hud
```

可选：附带 pack id 或截图/文件路径，便于对照矩阵对应行。

## 步骤

1. 读 `skills/audit-game-hud/SKILL.md`
2. 读 `references/hard-rules.md` 与 `references/style-matrix.md`（已知 pack 时只读对应行）
3. 逐项检查清单（9:20、矩阵玩法、触控热区、中文、无键鼠主路径、反网页壳、风格互斥）
4. 按 Skill 规定的输出格式返回 **通过/失败列表 + 建议改法**

## 输出

使用 `audit-game-hud` Skill 中的 Markdown 表格模板；全部通过时总结「7/7 通过」，否则列出失败项的具体修改步骤。
