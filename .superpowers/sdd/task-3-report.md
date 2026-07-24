# Task 3 报告：批量迁移其余 9 个 pack（P2a）

## 状态

DONE

## 完成内容

- 将 `01-cyberpunk-hud`、`02-dark-fantasy`、`03-scifi-space`、`05-hand-drawn`、`06-cartoon-comic`、`07-survival-horror`、`08-anime-colorful`、`09-tactical-military`、`10-synthwave-neon` 迁入 `library/packs/`。
- 每个 pack 都包含 `tokens.css`、`SPEC.md` 与 `index.html`；有专属资产的 pack 已将完整资产树迁入本地 `assets/`。
- `05-hand-drawn` 与 `06-cartoon-comic` 按要求未创建伪造的 `assets/` 目录。
- 将所有场景内 Token 引用改为 `./tokens.css`，专属资产引用改为 `./assets/`；`01–03` 保持其历史定制的本地 HUD 样式与共享手机壳深度。
- 将 9 份 SPEC 的主场景路径改为 `library/packs/<id>/index.html`。
- 更新 `library/scenes/index.html`、`styles/README.md`，使 10 个风格入口都指向 pack 路径。
- 更新 `library/packs/README.md` 为含全部 10 个风格的索引表。

## 验证

- 全量静态搜索：`library/packs/` 内没有 `assets/project`、`components/styles`，也没有本任务 9 个风格的旧 `library/scenes/` 路径。
- 文件存在性：10 个 pack 均有 `tokens.css`、`SPEC.md`、`index.html`；7 个带资产的 pack 均有 `assets/`，05/06 无该目录。
- 编码抽查：直接读取 `08-anime-colorful/index.html` 与 `library/packs/README.md`，中文 UI 文案与索引均为正常 UTF-8 汉字。
- IDE Lint：本次修改的 HTML、CSS 与 Markdown 路径未报告错误。

## 提交

- `d3e3bbf` — 首批迁移 01–03。
- `87de4a8` — 中批迁移 05–07。
- 末批 08–10、完整 pack 索引与本报告随最终提交推送。

## 备注

- `07-survival-horror` 的目录级 `git mv` 受 Windows 权限限制；已改用逐文件 `git mv`，所有 9 个资产均完成 Git 追踪重命名。
