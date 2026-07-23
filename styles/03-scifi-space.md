# Style 03 — Sci-Fi Space Sim

## 1. 风格定位

**全息仪表、空间感、深空空灵、信息超密**。代表作:Elite Dangerous、EVE Online、Star Citizen、No Man's Sky、Starfield、X4: Foundations、Hardspace: Shipbreaker。

UI 是飞行器/头盔内置的仪表显示系统。所有面板看似"投射在驾驶舱玻璃上",带网格、刻度、目标锁定环。多层叠加,大量数据并行展示,但靠留白和分层避免拥挤。

## 2. 适用游戏类型

**适合**
- 类型:太空飞行模拟、银河沙盒、硬科幻舰船经营
- 典型玩法:舰桥读数、导航环、货舱/能量分配、目标锁定
- 代表作:见风格定位

**不适合**
- 80s 街机 Synthwave 标题屏
- 魂类极简黑暗奇幻
- 像素复古 JRPG 指令窗

**本风格推荐场景包**
- 主场景:`index.html`(竖屏 9:20 舰桥 HUD：锁定 / 开火 / 能量分配)
- 扩展:星图导航、货舱清单

## 3. 视觉关键词

全息、空间、深空、仪表、刻度、目标锁定、reticle、能量环、hexagon、薄线、淡蓝、cyan、星图、diegetic(部分)、冷静、未来、硬科幻。

## 4. 色彩系统

**默认冷色调色板(Elite Dangerous 风)**:

| 角色 | 颜色 | HEX | 用法 |
|------|------|-----|------|
| 主色 1 | Deep Void | `#020817` | 屏幕底(纯黑偏蓝) |
| 主色 2 | Space Blue | `#0A1E3F` | 面板底 |
| 主色 3 | Holo Cyan | `#5BD9FF` | 主交互、面板边、文本 |
| 主色 4 | Holo White | `#E8F4FF` | 主文本 |
| 辅色 1 | Holo Blue | `#3DA9FF` | 信息、次级 |
| 辅色 2 | Amber | `#FFA940` | 警告、热信号 |
| 辅色 3 | Plasma Magenta | `#FF5BD9` | 目标锁定、友军 |
| 辅色 4 | Plasma Green | `#5BFF9F` | 成功、安全 |
| 语义 | Danger Red | `#FF4848` | 危险、敌对 |
| 辅色 5 | Steel Grey | `#7A8FA8` | 边框、次要文本 |
| 辅色 6 | Dim Blue | `#2A4A78` | 网格、暗化背景 |

**配色原则**:
- 全局冷色(90% 视觉面积),暖色仅用于危险/警告
- 蓝/cyan/white 三色占主导,饱和度中等
- 全息感靠半透明 + 细线 + 微辉光,不是厚边
- 红色仅用于"威胁"(敌人、低生命、警告)
- 绿色仅用于"安全"(友军、护盾满)

## 5. 几何与构图

- **圆角**: 0-4px(锐利为主)
- **边框**: 1px 细线 Holo Cyan 或 Holo Blue
- **网格**: 8px 基线,所有 UI 元素对齐
- **HUD 锚点**: 三维空间感,顶部目标、左右控制台、底部能量环
- **面板**: 倾斜 5-10° 平行四边形(模拟投影到曲面玻璃),也允许正交
- **刻度**: 圆形能量环、弧形进度条、扇形雷达
- **中心**: 目标锁定 reticle(同心圆 + 十字 + 角部三角)
- **角落**: 坐标显示、俯仰/偏航指示器

## 6. 边框与容器

**面板**:
- 背景 `rgba(10, 30, 63, 0.45)`(半透明,让背景星空透过来)
- 1px Holo Cyan 边框
- 角部切角:`clip-path: polygon(0 12px, 12px 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))`
- 角部小三角装饰(模拟仪表角部固定螺栓)

**按钮**:
- 默认: 透明底 + 1px Holo Cyan 边 + Holo Cyan 文本
- 悬浮: 背景 Holo Cyan 15% + 文本 Holo White
- 按下: 背景 Holo Cyan 30%
- 禁用: 边框/文本 Steel Grey

**进度条/能量环**:
- 线性: 4-6px 高,1px Holo Cyan 边,填充 Holo Cyan + 弱辉光
- 环形(SVG `stroke-dasharray`): 16-32px 半径,1-2px stroke Holo Cyan,中心显示数值
- 弧形: 270° 扇形进度,刻度分 10 段

**卡片(目标锁定)**:
- 背景 `rgba(10, 30, 63, 0.6)`
- 1px Holo Magenta 边(锁定目标)/ Holo Cyan(普通目标)
- 角部切角
- 文本: 名称 Holo White + 数值 Holo Cyan

## 7. 文字与排版

- **字体族**: Sans(`Inter`、`Rajdhani`、`Eurostile`) + Mono 数字(`JetBrains Mono`)
- **Display**: `Rajdhani`/`Eurostile`,weight 500-600,letter-spacing: 0.08em,uppercase
- **正文**: `Inter` weight 400-500,line-height 1.5
- **HUD 标签**: Mono,weight 400,uppercase,字号 10-12px
- **数字**: Mono,tabular-nums,大字号时 weight 700
- **大小**: HUD 10-12px / 正文 13-15px / 标题 18-24px / 大数字 36-72px / Hero 96-144px
- **大小写**: HUD 标签全大写,正文小写
- **字符限制**: HUD 短,信息密集但不堆文字

## 8. 光影与质感

- **辉光(微)**: Holo Cyan 文本/边框 `text-shadow: 0 0 6px #5BD9FF`,仅关键激活态
- **边框辉光**: `box-shadow: 0 0 8px rgba(91, 217, 255, 0.5)`
- **玻璃**: 不用 backdrop-filter(用半透明 + 星空背景自然有空间感)
- **噪点**: 极轻,opacity 0.02-0.04,模拟太空尘埃
- **渐变**: 中心向外辐射渐变(模拟能量核心)
- **纹理**: 网格线(模拟 HUD 网格)、扫描线(可选)
- **深度感**: 通过明度差异(背景更暗,前景更亮)分层
- **星空背景**: 实际游戏中是 3D 星空,程序生成可用 SVG noise + 随机白点

## 9. 动效原则

| 动作 | 时长 | 曲线 | 备注 |
|------|------|------|------|
| 面板入场 | 320ms | ease-out,opacity + translateY(8px) + scale(0.98→1) | 像 hologram 投影出来 |
| 按钮悬浮 | 160ms | ease-out | 颜色 |
| 状态切换 | 240ms | ease-in-out | 颜色和辉光 |
| 数值变化 | 360ms | ease-out | 滚动到位 |
| 目标锁定 | 480ms | ease-out | 边框从 cyan 切到 magenta,角部三角放大 |
| 扫描环 | 2000ms | linear infinite | 圆环从中心向外扩散 |
| 旋转 reticle | 8000ms | linear infinite | reticle 缓慢旋转(模拟雷达扫描) |
| 能量脉冲 | 1600ms | ease-in-out infinite | 能量环辉光呼吸 |

**原则**: 中等时长 + 持续背景动画(reticle 旋转、扫描环)。让 HUD 感觉"活着"但不喧宾夺主。

## 10. 状态语义

| 状态 | 视觉差 |
|------|--------|
| Normal | Holo Cyan 边 + Holo Cyan 文本 |
| Hover | Holo Cyan 边 + 背景 Holo Cyan 15% + Holo White 文本 |
| Active | Holo Cyan 边 + 背景 Holo Cyan 25% + scale(0.98) |
| Disabled | Steel Grey 边 + Steel Grey 文本 |
| Selected | Holo White 边 + Holo White 文本 + 微辉光 |
| Target Locked | Plasma Magenta 边 + 角部三角动画 + Plasma Magenta 文本 |
| Warning | Amber 边 + Amber 文本 |
| Danger | Danger Red 边 + Danger Red 文本 + 0.6s 闪烁 |

## 11. 可程序化生成参数表

| 参数 | 类型 | 范围 | 默认值 | 说明 |
|------|------|------|--------|------|
| `voidColor` | HEX | 近黑 | `#020817` | 屏幕底 |
| `panelBg` | rgba | - | `rgba(10,30,63,0.45)` | 面板底 |
| `primaryHolo` | HEX | - | `#5BD9FF` | 主交互色 |
| `secondaryHolo` | HEX | - | `#3DA9FF` | 副交互色 |
| `textMain` | HEX | - | `#E8F4FF` | 主文本 |
| `textMuted` | HEX | - | `#7A8FA8` | 次要文本 |
| `lockColor` | HEX | - | `#FF5BD9` | 锁定目标色 |
| `danger` | HEX | - | `#FF4848` | 危险色 |
| `warning` | HEX | - | `#FFA940` | 警告色 |
| `success` | HEX | - | `#5BFF9F` | 成功色 |
| `borderWidth` | int px | 1-2 | 1 | 边框粗细 |
| `panelCornerClip` | int px | 0-20 | 12 | 切角大小 |
| `panelSkew` | float deg | -10 to 10 | 0 | 平行四边形倾斜 |
| `fontDisplay` | string | - | `Rajdhani, sans-serif` | Display 字体 |
| `fontBody` | string | - | `Inter, sans-serif` | 正文字体 |
| `fontMono` | string | - | `JetBrains Mono, monospace` | Mono 字体 |
| `glowIntensity` | float | 0-1 | 0.4 | 辉光强度 |
| `scanlineOpacity` | float | 0-0.15 | 0.05 | 扫描线透明度 |
| `enableReticleSpin` | bool | - | true | reticle 旋转 |
| `reticleSpinDuration` | int ms | 4000-12000 | 8000 | reticle 旋转周期 |
| `enableScanRing` | bool | - | true | 扫描环动画 |
| `enableBreathingGlow` | bool | - | true | 能量脉冲 |
| `breathDuration` | int ms | 1200-2400 | 1600 | 脉冲周期 |
| `starFieldDensity` | int | 50-300 | 150 | 背景星点数 |
| `gridOpacity` | float | 0-0.2 | 0.08 | HUD 网格透明度 |

## 12. 不做什么(反例)

1. ❌ **不要** 用饱和暖色(红/橙/黄)作主色 — 必须冷色主导
2. ❌ **不要** 用厚边框 (> 2px) — 必须细线 + 辉光
3. ❌ **不要** 用 box-shadow blur > 4px — 必须锐利辉光
4. ❌ **不要** 用 Serif 字体 — 全局 sans + mono
5. ❌ **不要** 用像素风/手绘/卡通 — 必须干净几何
6. ❌ **不要** 用玻璃模糊 — 用半透明 + 星空背景自然产生空间感
7. ❌ **不要** 用 neon 紫色作主色 — 是 Cyberpunk/Synthwave 风,不是 Space Sim
8. ❌ **不要** 用 80s 复古元素 — 必须现代/未来
9. ❌ **不要** 用纹理/纸纹 — 必须纯色 + 网格
10. ❌ **不要** 让 reticle/scanner 静止 — 必须持续动画

## 13. 可生成部件清单

- HUD 元素:目标锁定 reticle(中心十字 + 角部三角)
- HUD 元素:能量环(圆形 SVG stroke-dasharray)
- HUD 元素:护盾环(双层 SVG 圆环)
- HUD 元素:速度/高度表(垂直刻度条)
- HUD 元素:坐标显示(XYZ 数字 + 等宽)
- HUD 元素:俯仰/偏航指示器(小圆形仪表)
- HUD 元素:雷达/扫描(SVG 极坐标 + 圆点)
- HUD 元素:小地图(星图 + 导航路径线)
- HUD 元素:信号列表(友军/敌军/中立,左/右滑入)
- 按钮:主/次/危险/图标按钮
- 面板:舰船状态(护盾/护甲/反应堆 三环)
- 面板:目标信息(距离 + 速度 + 名称)
- 面板:库存(3D 旋转物品模型位)
- 菜单:星图全屏(hex 网格 + 节点连接)
- 模态:确认对话框
- 数值:扫描结果 / 距离 / 时间
- 加载:扫描线扫过 + 文本 typewriter
- 警告:接近警告(amber 闪烁) / 锁定警告(red 闪烁)

---

**使用提示**: 此风格核心是"沉浸"。HUD 应该是玩家眼中"头盔/驾驶舱显示"的视觉等价物。所有元素都像被投射到曲面上,有空间感和层次感。持续背景动画(reticle 旋转、扫描环)让 UI 感觉"活着"。