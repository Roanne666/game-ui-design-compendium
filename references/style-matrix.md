# 风格 × 类型矩阵（短表）

画幅一律 **9:20 竖屏**。下表为楼型与玩法的默认对应；完整硬规则见权威稿。

## 如何使用本表

1. **有对应**：目标游戏的类型与核心玩法明显落在某一行 → 使用该行 `pack`（路径 A）。
2. **无对应**：对不上任何一行，或命中下方否决条件 → **不要选 pack**，按该游戏类型自建楼型与视觉（路径 B：硬规则 + `library/components/` + 自拟 tokens/scene；**无**仓库内通用场景可抄）。
3. 矩阵也可在路径 B 下作「同类游戏怎么分区」的参考，但**不绑定**该行的色板 / 几何 / 动效 / DOM。

## 强制改判「无对应 → 自建」的否决条件（命中任一条 → 路径 B）

1. **玩法循环对不上**：用户核心循环与候选行「核心玩法循环」列无法逐项对应（仅气质像、品类名像不够）。
2. **楼型冲突**：用户需要的主布局与该行「布局原型」冲突（例：要 JRPG 菜单栈却选街机标题分；要能量台却选魂类极简底栏）。
3. **多行均沾边但无一主导**：没有一行在「类型 + 玩法」上同时领先 → 自建，勿平均凑合。
4. **用户只要中性/品牌自研视觉**：明确不要本库 10 套专有视觉语汇 → 自建。
5. **会引入禁止模板**：套用该 pack 会把统一锁定开火条塞进矩阵不允许的类型 → 自建或另选真正匹配行。

| # | 风格 | 类型 | 布局原型 | 核心玩法循环（须可盲测） | pack |
|---|------|------|----------|-------------------------|------|
| 01 | Cyberpunk | 赛博 RPG/潜入 | 顶任务+小地图；中世界；底武器口袋；左右冲刺/开火/黑客 | 扫描 → 标记 → 口袋切武器 → 开火/黑客 | `library/packs/01-cyberpunk-hud/` |
| 02 | Dark Fantasy | 魂类 | 顶弱地名；中空；底极少键 + 露滴侧置 | 靠近篝火休息；锁定；翻滚/攻击；喝露滴 | `library/packs/02-dark-fantasy/` |
| 03 | Sci-Fi Space | 太空模拟 | **仪表型**：上航向/系统；中大瞄准环+目标卡；**下半能量分配台**；导航纸片 | **调能量**（总和守恒）→ 点环锁定进度 → 武器能量够才可射击；导航改模式 | `library/packs/03-scifi-space/` |
| 04 | Pixel Retro | 2D RPG | 上半战场；**下半指令窗** | 点指令：攻击/技能/道具/逃跑 | `library/packs/04-pixel-retro/` |
| 05 | Hand-drawn | Roguelike 叙事 | 中部三选一恩赐卡；底确认 | 选一张卡带走 | `library/packs/05-hand-drawn/` |
| 06 | Cartoon Comic | 射击/节奏 | 顶连击；底**单一大拍键** | 点按开火/打拍，无锁定键 | `library/packs/06-cartoon-comic/` |
| 07 | Survival Horror | 恐怖 | 几乎无常驻条；底一枚背包入口 | 打开 spine/背包管理；世界内探索 | `library/packs/07-survival-horror/` |
| 08 | Anime Colorful | JRPG | **半屏/全屏菜单栈**；战斗时底指令条 | 菜单导航；战斗选指令 | `library/packs/08-anime-colorful/` |
| 09 | Tactical Military | 战术 | 顶罗盘短讯；角小雷达；姿态/掩体 + 开火分区 | 切姿态 → 瞄准辅助 → 开火 | `library/packs/09-tactical-military/` |
| 10 | Synthwave Neon | 街机 | 标题层 → 一局；HUD 几乎只有分数 | 开始 → 得分 → 结束重开 | `library/packs/10-synthwave-neon/` |

验收：任意两套并排，**一眼看出玩法不同**，不能只靠换色/换图标。

## 权威与延伸阅读

- 竖屏、触控、矩阵全文：[`docs/rules/mobile-portrait-first.md`](../docs/rules/mobile-portrait-first.md)
- 反网页壳、控件同语汇：[`docs/rules/game-feel-vs-web.md`](../docs/rules/game-feel-vs-web.md)
