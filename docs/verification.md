# 本轮验收记录

2026-09-10。本轮交付范围为首页与独立部署项目，桌面端为验收重点。

## 桌面浏览器

- 对照参考页检查首屏字体、深色底色、倾斜工作台、卡片配色、左右交替的演示区域和页面间距。
- 约 1348px 内容视口没有页面横向溢出，已加载图片无失效资源。
- Get started 打开工作台弹窗；任务输入、提交与任务切换可用。
- 研究文件打开文档预览；关闭按钮和 Escape 可关闭弹窗，页面滚动恢复。
- 模型选择会切换当前项和说明。
- LaTeX 的 Source / Split / PDF 分别显示对应内容。
- 图表修改切换到 v2，标记大小和图例位置变化；Code / Environment 标签可用。
- GPU 演示的暂停与继续按钮改变播放状态。
- 全页动效暂停能停止连续滚动的标识和其他循环动画。
- 应用场景卡片打开对应的研究文档。
- 原文档中心可进入，Codex 教程的下一步按钮已确认从第 1 步进入第 2 步。
- 发现并修复了悬浮工作台变化角度时控制按钮随之位移的问题；可交互演示保持稳定的点击位置。

## 构建与独立服务端

`npm run typecheck`、`npm run build`、`npm run test:server` 均通过。

服务端测试覆盖：首页与编译资源、图片与下载文件响应、资源 MIME 和缓存头、健康检查、管理员密码验证、伪造身份头拒绝、跨来源保存拒绝、目录保存、公开目录读取、并发版本冲突以及数据库关闭后重新读取的持久化。

Dockerfile 与 Compose 配置随项目提供；本环境未执行 Docker 容器构建。独立 Node 服务已经通过实际 HTTP 请求与 SQLite 读写测试。

## 交付边界

首页的研究执行、LaTeX 页面、图表及终端为交互演示。文档、模型广场、Gallery 和 Skills 保留原有页面；后续可按新视觉体系继续重构。按最终要求交付源码和预构建页面，不进行网站发布。


## 2026-09-10 · Portal integration

- New React hash routes: models, docs and eight document pages, gallery and six details, eight Skill details, catalog administration. Legacy deep links forward to these routes.
- Price audit: all 166 usage-log entries matched source RMB/token × 1,000,000; two configured entries matched ¥1.92 / ¥0.48 / ¥6.72. Zero and null remain distinct, including ¥0.00014 cache-read.
- Shared calculation verified for imported multiplier changes and original USD ÷ 35 mode; import keeps custom models/groups and respects owner edits after saving.
- Desktop browser: navigation, model search and group switching, Windows six-step Next flow, Mac hidden-directory demonstration, dummy-key local auth.json download, gallery category/detail/template preview/Skill navigation.
- Administration browser: modified plus multiplier from 1.05 to 1.5 and confirmed Astra ¥3 / ¥15 / ¥0.3 after reload; restored 1.05. Edited input RMB to 3.14, confirmed front-end save, restored 2.1. Added a temporary group and model, verified USD 3.5 ÷ 35 × 1.5 = RMB 0.15, then deleted both and saved.
- Self-hosted server test passed: authenticated CRUD, rejection of forged identity and cross-origin writes, optimistic revision conflict, and SQLite persistence across reopening.
- Browser testing uses only a separate local catalog. Test records and dummy keys are excluded from source and deployment archives.

- Final regression fixes: imported group-name collisions retain the owner group; toggling a model off/on before applying a group edit keeps its prices; delayed saves retain newer local drafts. Browser retest confirmed Astra remains ¥2.1 / ¥10.5 / ¥0.21 after membership toggling.
