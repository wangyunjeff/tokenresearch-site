# 词元智研 — 官网入口与科研工作流

参考 [ClawsGO](https://clawsgo.ai/) 的视觉与页面节奏，独立实现的研究产品网站，包含模型广场、文档、科研展柜和价格管理。使用 React、TypeScript、Vite、Motion；桌面端为本轮验收重点。

## 下载后直接启动

项目压缩包包含已经构建好的 `dist/client`。安装 **Node.js 24 或更新版本** 后，在项目目录执行：

```bash
npm start
```

默认端口为 `3000`，浏览器打开 `http://你的服务器IP:3000`。运行已构建的版本不需要安装前端依赖；服务端使用 Node.js 内置模块。

## 用 Docker 部署

```bash
cp .env.example .env
docker compose up -d --build
```

查看状态、日志与更新：

```bash
docker compose ps
docker compose logs -f web
docker compose up -d --build
```

默认映射 `3000:3000`。修改 `.env` 的 `PORT` 可以更换宿主机端口。模型目录保存在 `research-data` 命名卷；更新镜像不会覆盖目录数据。

## 修改页面

```bash
npm ci
npm run dev
```

开发地址以终端输出为准，默认是 `http://localhost:5173`。修改后重新构建：

```bash
npm run typecheck
npm run build
npm start
```

`npm run format` 格式化 React 源码。`npm run test:pricing` 对照上传价格表验证全部价格、参考倍率换算、缺失值与导入兼容。`npm run test:server` 检查独立服务端的鉴权、静态资源与目录持久化，需要先执行 `npm run build`。

## 绑定域名

在 Nginx 或服务器面板中，将域名反向代理到 `http://127.0.0.1:3000`。可参考 `deploy/nginx.conf.example`。

在 `.env` 中设置访问域名，不加末尾斜杠：

```dotenv
PUBLIC_ORIGIN=https://research.example.com
```

使用域名的 HTTPS 证书配置。反向代理保留 `Authorization` 请求头，模型管理使用浏览器标准账号密码验证。修改环境变量后重启 Node 服务或重新运行 `docker compose up -d`。

## 页面入口

| 页面               | 路径                            |
| ------------------ | ------------------------------- |
| 首页               | `/`                             |
| API 中转站         | `https://tokenresearch.com.cn/` |
| 网页 App（开发中） | `/#/app`                        |
| 模型广场           | `/#/models`                     |
| 文档中心           | `/#/docs`                       |
| Codex 安装教程     | `/#/docs/codex`                 |
| 科研展柜           | `/#/gallery`                    |
| Skills             | `/#/skills`                     |
| 管理界面           | `/#/admin`                      |
| 管理员登录         | `/admin`                        |

首页导航直接进入三个新页面，使用相同的深色组件体系。旧的 `/legacy.html#/docs` 等地址也会转到对应的新页面。文档按 10 个 Agent 工具分类（美国工具、国产工具、开放生态），Codex 保留完整交互教程和配置参考，其余工具提供官网链接并标记「教程筹备中」。`src/portal/agent-tools.ts` 维护工具索引。展柜包含 6 个可展开的工作流示例、模板预览与下载，以及 8 个可下载的科研 Skills。

## 模型管理与数据

首次部署时，将 `.env.example` 复制为 `.env`，设置管理员：

```dotenv
ADMIN_USER=admin
ADMIN_PASSWORD=替换为至少16个字符的独立密码
```

重启后打开 `/admin`，输入账号密码。未设置密码时，前台模型广场可读取，管理写入保持关闭。开发模式在本机使用单独的预览管理员，数据保存在 `.local-data`，不会带入正式部署。

后台支持新增、编辑和删除模型与分组，修改倍率、输入/输出/缓存价格、简介、成员与展示状态。点击“应用修改”后，再点击“保存并更新前台”；保存成功后，各客户端会从同一份目录读取价格。多人编辑发生版本冲突时不会覆盖他人的更新，可以先导出当前目录备份。

首次启动包含 2026-09-10 的 Sub2API 价格快照：83 个原始模型名称。原始快照保留 13 个分组的历史记录用于追溯；本版前后台默认保留 10 个分组，移除 `国产模型-openai协议`、`国产模型-anthropic协议`、`kiro快速通道（测试中）`。大小写、空格与版本不同的模型名保留为独立 ID。已有数据库升级时，会补充本次导入的分组及缺失模型，保留原有自定义内容；首次保存之后，不会重新导入已经删除的记录。

两种计价方式分别处理：

```text
导入的人民币价：参考人民币单价 × 当前倍率 ÷ 参考倍率
统一美元基准价：美元原价 ÷ 折算系数 × 分组倍率（系数初始为 35）
```

附件中的数值已经是人民币/token，已乘以 1,000,000 转为前台的人民币/百万 token，没有再次除以 35。缓存缺失保留为 null，显示“—”；记录中的 0 保留为 0。美元划线原价按来源记录的「人民币价 × 5 ÷ 参考倍率」还原，独立存入组内价格的 `originalUsd`，它是来源计价基准，不表示当前官方 API 官网定价或外汇汇率。修改人民币价格或倍率不改变该美元原价，管理者也可分别修改原价与现价。`portalRevision` 保证本次删除与原价补充只执行一次，已存在的自定义记录继续保留。修改导入分组的倍率会等比例更新该组价格，也可以逐模型修改当前人民币价；编辑单个分组的人民币价格不会修改其他分组。统一美元基准价则供使用该基准的分组共同引用。

独立 Node 服务默认将 SQLite 数据保存在 `data/catalog.sqlite`。迁移在首次启动时自动执行，后续启动读取已有数据。备份时先停止服务，再复制整个 `data` 目录；恢复后重启即可。Docker 部署对应 `research-data` 命名卷。不要使用 `docker compose down -v` 删除正在使用的数据卷。

## 页面组成

- 倾斜工作台首屏，入场动画与滚动透视变化。
- 连续流动的研究机构标识、能力卡片与模型选择。
- 自动展开的研究过程、浏览器、LaTeX、图表修改和算力演示。
- 研究成果预览、六种应用场景、团队影像和页脚。
- 可操作的任务输入、任务切换、文档弹窗、图表版本、播放暂停。
- 遵循系统的减弱动态效果设置，提供全页动效暂停。

首页中的研究执行、终端输出和论文数据是交互演示；模型目录管理使用实际数据库。「API 中转站」指向 `https://tokenresearch.com.cn/`；网页 App 为「开发中」占位页。统一入口在 `src/portal/Products.tsx` 中修改。

## 文件结构

| 位置                                 | 用途                                          |
| ------------------------------------ | --------------------------------------------- |
| `src/App.tsx`                        | 首页首屏、页面入口、预览弹窗                  |
| `src/components/LandingSections.tsx` | 首页各个内容区块                              |
| `src/components/ResearchUI.tsx`      | 工作台、编辑器、图表和研究文档组件            |
| `src/portal/`                        | 模型广场、文档、教程、展柜、Skills 与管理界面 |
| `src/portal/content.json`            | 文档索引、6 个案例及 8 个 Skills 内容         |
| `server/data/price-snapshot.json`    | 已导入的人民币价格快照                        |
| `server/pricing.js`                  | 前后台共用的计算和格式化规则                  |
| `src/styles/`                        | 色彩、版式、动效和工作台样式                  |
| `public/assets/`                     | 本地视觉素材                                  |
| `public/legacy.html`                 | 原有页面入口                                  |
| `server/self-host.mjs`               | 独立 Node 服务、静态资源、管理鉴权            |
| `server/catalog.js`                  | 模型目录的读取、校验和保存                    |
| `drizzle/`                           | SQLite 数据库结构与迁移                       |
| `dist/client/`                       | 压缩包内可直接运行的页面产物                  |
| `Dockerfile`、`compose.yaml`         | 容器部署配置                                  |
| `docs/architecture.md`               | 设计与组件规划                                |
| `docs/verification.md`               | 本轮验收记录                                  |

旧 Worker 构建入口 `npm run build:worker` 为原托管环境保留，独立服务器使用 `npm run build` 与 `npm start`。

## 视觉来源

布局参考 `https://clawsgo.ai/`。页面代码、长文案、研究示例及图表独立制作。天文台照片为本项目生成。研究机构 SVG 标识来自参考站公开的 `/logos/` 资源，保留其原有品牌归属。此项目是独立界面研究，与 ClawsGO 或所列机构没有隶属关系。

## 科研展柜开放状态

科研展柜暂时关闭，导航与所有案例链接统一进入「筹备中」页面。现有案例组件和数据完整保留，Skills、模型广场与文档继续开放。案例完善并审核后，将 `src/portal/availability.ts` 的 `GALLERY_OPEN` 改为 `true`，重新构建部署即可恢复列表及详情展示。
