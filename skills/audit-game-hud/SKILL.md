---
name: audit-game-hud
description: >-
  验收移动端竖屏游戏 HUD：9:20 画幅、矩阵玩法可辨、触控热区、中文文案、反网页壳。
  触发：验收 HUD、盲测、audit、检查游戏 UI 是否符合本库规则。
---

# audit-game-hud

对照本库硬规则与风格矩阵，对场景或用户项目中的游戏 HUD 做清单验收。

## 验收清单

对每一项给出 **通过** 或 **失败**，失败须附具体改法。

| # | 检查项 | 失败时怎么改 |
|---|--------|-------------|
| 1 | **画幅 9:20** — `.game-root` / `#viewport` 为竖屏 9:20 手机框 | 设 `aspect-ratio: 9 / 20`；用 phone-frame 壳 |
| 2 | **共享栈** — 加载序为 components → phone-frame → game-feel → tokens →（可选私有）→ scene-kit | 按 `references/library-map.md` 补全；禁止省略共享栈 |
| 3 | **玩法可辨** — **有 pack**：符合矩阵该行；**generic**：符合自述循环与类型楼型 | 禁止换皮统一锁定开火 |
| 4 | **可见触控热区** — 主操作 ≥44×44 CSS px 可见控件 | 加大热区；补图标/物件键 |
| 5 | **中文文案** — 玩家可见 UI 与 `aria-label` 中文 | 替换英文主文案 |
| 6 | **无键鼠主路径** — 主流程非 LMB/WASD/Tab | 改触控语义 |
| 7 | **非网页壳** — 非卡片柱 / Material 底栏 | 见 `game-feel-vs-web.md` |
| 8 | **风格边界** — pack：互斥可辨；generic：未冒充某 pack 专有视觉 | 还原独有楼型或保持中性自拟 |

报告开头必须写明：**路径 A（pack id）或路径 B（generic）**，以及**约定核心循环**一句话。

## 输出格式

```markdown
## HUD 验收报告

**路径**：（A / `NN-id` 或 B / `generic`）  
**约定循环**：（一句话）

| 检查项 | 结果 | 说明 |
|--------|------|------|
| 画幅 9:20 | 通过/失败 | … |
| 共享栈 | 通过/失败 | … |
| 玩法可辨 | 通过/失败 | … |
| 可见触控热区 | 通过/失败 | … |
| 中文文案 | 通过/失败 | … |
| 无键鼠主路径 | 通过/失败 | … |
| 非网页壳 | 通过/失败 | … |
| 风格边界 | 通过/失败 | … |

**总结**：通过 N/8 — （一句结论）

**建议改法**：（仅列失败项的具体修改步骤）
```

## 参考

- 硬规则摘要：`references/hard-rules.md`
- 玩法矩阵：`references/style-matrix.md`
- 权威稿：`docs/rules/mobile-portrait-first.md`、`docs/rules/game-feel-vs-web.md`
