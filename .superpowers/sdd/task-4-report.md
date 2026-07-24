# Task 4 报告：入口与旧路径收尾（P2b）

## 状态

DONE

## 完成内容

- 将 `library/index.html` 重写为 10 套风格包的中文主入口，主场景与 Spec 均直接链接到 `library/packs/<id>/`。
- 将 `library/assets/CREDITS.md` 的项目素材路径全部更新为各 pack 的 `assets/`。
- 更新共享组件说明、根 README、CLAUDE.md 与玩法规则中的目录叙事和加载示例。
- 删除旧 `library/scenes/`、`styles/`、`library/components/styles/` 与 `library/assets/project/`。

## 验证

- 残留路径搜索：`library/`、根文档及 `docs/rules/` 中无 `library/scenes/`、`styles/0N-`、`components/styles/`、`assets/project/` 命中；历史计划与 research 按要求排除。
- 入口存在性：检查 10 个 pack 的 `index.html` 与 `SPEC.md`，共 20 个目标，缺失 0。
- 场景抽查：直接读取 01、04、07、10 的入口；共享样式、pack Token、专属素材链接均指向现有新路径，中文正常。
- IDE Lint：本次修改文件无诊断错误。

## 备注

- 未改动任何 pack 的玩法实现。
- `.superpowers/sdd/` 内其他任务产物为既有未跟踪文件，本任务提交仅包含本报告。

## FIX（Task 4 复审）

- 更新 `tools/README.md`：`shoot.js` 输入路径由 `library/scenes/` 改为 `library/packs/<id>/index.html`。
- 简化 `tools/shoot.js`：移除已删除 `library/scenes/` 的回退逻辑，仅读取 pack 入口；变量 `scenes` 重命名为 `packs`。
- 修正 `tools/chroma_key.py` 示例输出路径，去除 `demo/scenes/` 残留。
- `tools/` 内 `scenes` 残留搜索：0 命中。
