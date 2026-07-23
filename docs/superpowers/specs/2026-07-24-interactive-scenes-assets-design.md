# Interactive Genre Scenes + Open Art Assets — Design Spec

日期：2026-07-24  
状态：已确认  
许可策略：选项 2 — CC0 / CC-BY / itch 免费包可署名；禁止商业游戏原素材

## 目标

每风格一个**完整可交互 UI 原型**（≥5 次有意义点击产生状态变化），并挂载真实 PNG/SVG 美术；共享 `scene-kit.js`；`assets/CREDITS.md` 记录来源。

## 非目标

- 真实战斗循环 / 存档 / 物理
- 付费素材
- 正版游戏 Rip / 官方素材
- 10×N 换皮矩阵

## 目录

```
demo/
  lib/
    components.css
    styles/*.css
    scene-kit.js          # 新建：面板/槽位/数值/toast/模态
  assets/
    CREDITS.md
    _shared/              # Kenney 等通用
    01-cyberpunk-hud/ …
  scenes/
    index.html
    <nn-style>/index.html # 完整交互主场景（取代单薄单页）
```

旧的单文件主场景（如 `gameplay-hud.html`）改为 redirect 到 `index.html`，或删除并由 index 入口统一。

## 交互范围

见会话已确认表（Cyberpunk HUD / 魂类篝火 / 舰桥功率 / 像素战斗指令 / Boon 选择 / 漫画商店 / 脊柱背包 / 斜切菜单 / 战术 HUD / 霓虹标题）。

## 美术

- 优先 Kenney UI Pack + Game Icons（CC0）
- 风格向补充：CC-BY / Name-your-price 免费包；无法稳定下载时用 CC0 子集 + CSS 着色，并在 CREDITS 注明
- 每风格至少 6 个可见 icon/装饰图，非纯色块

## 验收

1. `demo/scenes/index.html` → 10 入口均可进完整场景  
2. 每场景 ≥5 次交互有反馈  
3. 可见真实素材；`CREDITS.md` 完整  
4. README / 许可段更新  

## 实现顺序

1. Spec/README/CREDITS 骨架  
2. 下载并整理 assets  
3. `scene-kit.js`  
4. 十套 `scenes/*/index.html`  
5. 更新入口与 shoot.js；commit push  
