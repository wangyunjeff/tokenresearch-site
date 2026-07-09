---
seo:
  title: TokenResearch Docs
  description: AI coding tutorials, model evaluations, Skill gallery, and MCP configuration notes.
---

::u-page-hero{class="landing-hero relative overflow-hidden !min-h-0 !py-12 bg-neutral-50 dark:bg-neutral-950 sm:!py-16 lg:!py-24"}
#top
:hero-background

#title
AI 编程工具[知识库]{.text-primary.whitespace-nowrap}

#description
从基础教程到模型评测，再到 Skill Gallery 展览区。这里保留 Nuxt UI Docs 的文档体验，同时把每个 Skill 能做什么、适合什么场景、会产出什么结果讲清楚。

#links
  :::u-button
  ---
  to: /tutorials
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  从基础教程开始
  :::

  :::u-button
  ---
  icon: i-lucide-gallery-horizontal-end
  color: neutral
  variant: outline
  size: xl
  to: /gallery
  ---
  打开 Skill Gallery
  :::
::

::u-page-section{class="bg-white dark:bg-neutral-950"}
#title
三层内容结构

#links
  :::u-button
  ---
  color: neutral
  size: lg
  to: /codex/model
  trailingIcon: i-lucide-arrow-right
  variant: subtle
  ---
  查看已复刻页面
  :::

:site-map-preview

#features
  :::u-page-feature
  ---
  icon: i-lucide-route
  ---
  #title
  基础教程

  #description
  从环境准备、配置文件、Agent 规则到视觉验收，按真实使用顺序组织。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-chart-no-axes-combined
  ---
  #title
  模型评测

  #description
  把模型、推理等级、上下文、压缩策略和路由建议拆成可复用的评测页。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-gallery-horizontal-end
  ---
  #title
  Skill Gallery

  #description
  像示例展览区一样展示每个 Skill：输入、场景、产出、适用边界。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-file-text
  ---
  #title
  原始教程页

  #description
  `/codex/model` 的复刻保留在 `content/3.codex/5.model.md`，后续可直接改。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-search
  ---
  #title
  搜索与目录

  #description
  全站继续使用 Nuxt Content 的自动侧边栏、右侧 TOC、搜索和 Markdown 原文。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-wrench
  ---
  #title
  可持续扩展

  #description
  新教程、新评测、新 Skill 展示都只需要新增编号 Markdown 文件。
  :::
::

::u-page-section{class="bg-neutral-50 dark:bg-neutral-900"}
#title
模型评测入口

#links
  :::u-button
  ---
  color: neutral
  size: lg
  to: /models
  trailingIcon: i-lucide-arrow-right
  variant: subtle
  ---
  开始模型评测
  :::

  :::u-button
  ---
  color: neutral
  size: lg
  to: /models/eval-template
  icon: i-lucide-clipboard-list
  variant: outline
  ---
  复制评测模板
  :::

#description
先建立评测方法，再给出模型选择、推理等级、上下文和压缩策略。这里的评测内容用于指导日常任务路由，而不是追求单一排行榜。

:model-eval-preview
::

::u-page-section{class="bg-white dark:bg-neutral-950"}
#title
场景路线

#links
  :::u-button
  ---
  color: neutral
  size: lg
  to: /workflows
  trailingIcon: i-lucide-arrow-right
  variant: subtle
  ---
  查看全部路线
  :::

#description
教程解决入门，评测解决模型选择，Gallery 展示能力边界；场景路线把这些页面串成实际工作流。

:workflow-playbook-preview
::

::u-page-section{class="bg-white dark:bg-neutral-950"}
#title
Skill Gallery 展览区

#links
  :::u-button
  ---
  color: neutral
  size: lg
  to: /gallery
  trailingIcon: i-lucide-arrow-right
  variant: subtle
  ---
  查看全部 Skill
  :::

#description
每张卡片代表一个可复用能力：它解决什么任务、输入是什么、产出长什么样、什么时候值得调用。

:skill-gallery-preview

::note
首页只放 Gallery 的代表卡片；完整分组和全部 Skill 示例在 [Skill Gallery](/gallery)。
::
::

::u-page-section{class="bg-neutral-50 dark:bg-neutral-900"}
#title
支持与配置

#links
  :::u-button
  ---
  color: neutral
  size: lg
  to: /skills-mcp
  trailingIcon: i-lucide-arrow-right
  variant: subtle
  ---
  Skills 与 MCP
  :::

#description
遇到模型、代理、工作目录或浏览器检查问题时，从 FAQ 和 Skills/MCP 页面继续定位；稳定流程再沉淀成 Skill 和 Gallery 示例。

#features
  :::u-page-feature
  ---
  icon: i-lucide-circle-help
  to: /faq
  ---
  #title
  FAQ

  #description
  常见安装、模型、代理、工作目录和视觉检查问题集中在这里。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-plug
  to: /skills-mcp
  ---
  #title
  Skills 与 MCP

  #description
  判断什么时候写 Skill、什么时候接 MCP、什么时候只需要教程页。
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-googlechrome
  to: /skills-mcp/chrome-devtools-mcp
  ---
  #title
  浏览器检查

  #description
  前端复刻和视觉验收需要真实浏览器、截图和必要的 DOM 检查。
  :::
::

::u-page-section{class="bg-neutral-50 dark:bg-neutral-900"}
  :::u-page-c-t-a
  ---
  links:
    - label: 阅读教程路线图
      to: '/tutorials'
      trailingIcon: i-lucide-arrow-right
    - label: 浏览模型评测
      to: '/models'
      variant: subtle
      icon: i-lucide-chart-no-axes-combined
  title: 后续修改从 Markdown 开始
  description: 教程、评测和 Gallery 都已经落到 content/ 目录。页面结构、搜索、TOC、深色模式和 Markdown 原文路由都可以继续在本地扩展。
  class: bg-white dark:bg-neutral-950
  ---

  :stars-bg
  :::
::
