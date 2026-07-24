# 硬规则摘要（短读）

> **权威在 `docs/rules/`**；本文件仅作 Skill 快速索引。细节与验收表以权威稿为准。

## 画幅与输入

1. **竖屏 9:20 定死** — Demo `#viewport` 默认 `aspect-ratio: 9 / 20`；禁止横屏当主场景。→ [`mobile-portrait-first.md` §1–§2](../docs/rules/mobile-portrait-first.md)
2. **触控为主** — 主操作须有可见控件；文案写「点按 / 拖动 / 长按」，不以 LMB/RMB/WASD/Tab 作主路径。→ [`mobile-portrait-first.md` §1–§2](../docs/rules/mobile-portrait-first.md)
3. **热区 ≥44×44 CSS px**（推荐 ≥48）。→ [`mobile-portrait-first.md` §2](../docs/rules/mobile-portrait-first.md)

## 类型与玩法

4. **类型正确的楼型** — 打开界面应能辨认游戏大类。**有对应 pack** 时须符合矩阵该行；**通用路径**时按目标游戏自身类型设计楼型（矩阵可作分区参考，不绑 pack 视觉）。→ [`mobile-portrait-first.md` §4](../docs/rules/mobile-portrait-first.md)、[`style-matrix.md`](./style-matrix.md)
5. **禁止统一锁定开火模板** — 不得把「左辅圆键 + 右主开火 + 中口袋」套到不需要该玩法的类型（03/04/05/07/08/10 等）。→ [`mobile-portrait-first.md` §3–§4.2](../docs/rules/mobile-portrait-first.md)
6. **无对应不硬套** — 目标游戏对不上 10 套时按该游戏类型自建楼型与视觉（硬规则 + `library/components/` + 自拟 tokens/scene），禁止为凑合选最近 pack 换皮，也无仓库内「通用场景」可抄。→ [`skills/game-ui-style/SKILL.md`](../skills/game-ui-style/SKILL.md)

## 文案与语言

7. **界面文案一律中文** — 玩家可见标签、任务、提示、日志均为中文；`aria-label` 同步中文。→ [`mobile-portrait-first.md` §1、§7](../docs/rules/mobile-portrait-first.md)

## 观感与控件

8. **反网页壳** — HUD 须像盖在游戏世界上的操作层，禁止居中卡片柱、Material 双栏底栏、光泽圆 CTA 混进风格场。→ [`game-feel-vs-web.md` §3–§4](../docs/rules/game-feel-vs-web.md)
9. **认形交互** — 常驻触控用风格化图标/物件/仪表/指令条；中文留给情境、菜单与 `aria-label`。→ [`mobile-portrait-first.md` §5](../docs/rules/mobile-portrait-first.md)、[`game-feel-vs-web.md` §1–§2](../docs/rules/game-feel-vs-web.md)
10. **不依赖 hover** — `:hover` 仅增强；以 `active` / `pressed` / 选中为准。→ [`mobile-portrait-first.md` §2](../docs/rules/mobile-portrait-first.md)

## 验收

11. **盲测** — 隐藏帮助后仍能完成约定的核心玩法循环（pack 路径用矩阵该行；通用路径用该游戏自述循环）；pack 路径并排两套须一眼可辨玩法差异。→ [`mobile-portrait-first.md` §2、§9](../docs/rules/mobile-portrait-first.md)
