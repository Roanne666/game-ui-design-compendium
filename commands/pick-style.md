# /pick-style

判断目标游戏能否对应本库 10 套风格：有则推荐 **一个** pack；无则给出 **通用 UI** 路径（不硬套 pack）。

## 用法

用户提供：游戏大类、核心玩法、或参考作品。

## 步骤

1. 读 `references/style-matrix.md` + `references/hard-rules.md`
2. 对照「类型 / 布局原型 / 核心玩法循环」
3. **有明确匹配** → 输出单个 pack 推荐  
   **无匹配 / 强行套用会扭曲玩法** → 输出「通用 UI」，说明为何不套 pack

## 输出格式（有对应）

```markdown
## 判定：有对应风格

- **Pack ID**：`NN-style-name`
- **路径**：`library/packs/NN-style-name/`
- **理由**：（一句话：布局与玩法为何匹配）
- **核心循环**：（矩阵该行玩法）

下一步：`/apply-style NN-style-name`
```

## 输出格式（无对应）

```markdown
## 判定：无对应风格 → 通用 UI

- **原因**：（为何 10 套均不合适，或硬套会破坏玩法）
- **楼型建议**：（按目标游戏类型简述信息架构，不绑定某 pack 视觉）
- **依据**：`docs/rules/mobile-portrait-first.md` + `docs/rules/game-feel-vs-web.md` + `library/components/`

下一步：`/apply-style generic`
```

## 约束

- 有对应时只推荐一个 pack；不要为「总要给一个皮肤」而凑合
- 多行都沾边时选最贴近核心玩法的一行并说明取舍；若仍会扭曲玩法 → 改判通用
- 不推荐 `research/raw` 作为依据
