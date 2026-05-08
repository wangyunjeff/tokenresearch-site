import { type Language } from "@/components/language-provider"

export const navLinks = {
  en: [
    { text: "Mission", href: "/mission" },
    { text: "Gateway", href: "/gateway" },
    { text: "Skills", href: "/skills" },
    { text: "Perspectives", href: "/perspectives" },
    { text: "AI Signals", href: "/signals" },
  ],
  zh: [
    { text: "使命", href: "/mission" },
    { text: "中转站", href: "/gateway" },
    { text: "技能", href: "/skills" },
    { text: "观点", href: "/perspectives" },
    { text: "AI 讯息", href: "/signals" },
  ],
} as const

export const serviceLinks = {
  gateway: "http://124.221.138.39:6008/",
  monitor: "http://8.137.174.4/",
} as const

export const pageCopy = {
  en: {
    common: {
      dashboard: "Gateway",
      menuLabel: "Toggle navigation menu",
      open: "Open",
      read: "Read",
      comingSoon: "Coming soon",
      footerDescription:
        "TokenResearch builds research-first AI infrastructure: model access, reusable skills, private lab workflows, and live AI intelligence.",
      footerColumns: [
        {
          title: "Product",
          links: [
            { text: "Gateway", href: "/gateway" },
            { text: "Skills", href: "/skills" },
            { text: "AI Signals", href: "/signals" },
          ],
        },
        {
          title: "Thinking",
          links: [
            { text: "Mission", href: "/mission" },
            { text: "Perspectives", href: "/perspectives" },
            { text: "Homepage", href: "/" },
          ],
        },
        {
          title: "Live services",
          links: [
            { text: "TokenResearch gateway", href: serviceLinks.gateway },
            { text: "Service monitor", href: serviceLinks.monitor },
          ],
        },
      ],
      policies: [
        { text: "Gateway", href: serviceLinks.gateway },
        { text: "Monitor", href: serviceLinks.monitor },
      ],
      copyright: "© 2026 TokenResearch. Research infrastructure draft.",
    },
    missionPage: {
      eyebrow: "Mission",
      title: "AI should accelerate research without replacing researchers.",
      description:
        "TokenResearch exists to move everyday research friction away from humans. Agents can search literature, reproduce code, inspect experiments, call APIs, and prepare reports. Researchers should keep the work that matters: asking questions, judging evidence, choosing direction, and forming insight.",
      primaryAction: { text: "Explore Skills", href: "/skills" },
      secondaryAction: { text: "Open Gateway", href: "/gateway" },
      thesisLabel: "Operating thesis",
      thesis:
        "When execution becomes cheap and reliable, scientific discovery can move closer to the speed of thought.",
      beliefs: [
        {
          title: "Researcher-led",
          description:
            "The human owns taste, judgment, direction, and the final claim. The system should make that work sharper, not outsource it.",
        },
        {
          title: "Friction-aware",
          description:
            "Literature search, experiment triage, API setup, and reporting are real blockers. Removing them changes what researchers attempt.",
        },
        {
          title: "Workflow-first",
          description:
            "Skills are not prompts in a folder. They are reusable procedures that combine instructions, tools, constraints, and evaluation habits.",
        },
      ],
      operatingModelTitle: "The model behind the product",
      operatingModel: [
        "Public skills teach the workflow and create token demand.",
        "The gateway provides stable model access, balance management, routing, and observability.",
        "Private lab capabilities keep valuable rubrics, advisor style, and knowledge bases on remote infrastructure.",
      ],
    },
    gatewayPage: {
      eyebrow: "AI infrastructure gateway",
      title: "A research-first relay for model access, routing, and usage control.",
      description:
        "The gateway is the current live TokenResearch service. It turns model access into a managed research utility: rechargeable balance, simpler configuration, multiple providers, and future integration with skills.",
      primaryAction: { text: "Open Gateway", href: serviceLinks.gateway },
      secondaryAction: { text: "View Monitor", href: serviceLinks.monitor },
      statusCards: [
        {
          title: "Gateway console",
          value: "Live",
          description:
            "Use the current relay console for account, balance, model, and API access workflows.",
          href: serviceLinks.gateway,
        },
        {
          title: "Service monitor",
          value: "Online check",
          description:
            "Monitor whether the relay service is reachable before a long agent or experiment run.",
          href: serviceLinks.monitor,
        },
      ],
      features: [
        {
          title: "Balance that matches research behavior",
          description:
            "Small and irregular research workloads should not require users to manage provider-specific quotas manually.",
        },
        {
          title: "Model routing for skills",
          description:
            "Skill workflows can use the gateway as a stable model layer instead of asking every user to configure every provider.",
        },
        {
          title: "Visibility before long runs",
          description:
            "Monitoring and usage data matter when AutoResearch or deep review workflows may run for hours.",
        },
      ],
      roadmap: [
        "Bind public skills to TokenResearch balance.",
        "Add per-skill usage reporting and run IDs.",
        "Expose lab-level billing, quotas, and shared keys.",
        "Replace temporary IP addresses with product domains.",
      ],
    },
    skillsPage: {
      eyebrow: "Skills",
      title: "Skills are the public interface. The durable value lives in workflows and services.",
      description:
        "TokenResearch uses skills to package research procedures for Codex and adjacent agents. Public skills should be easy to inspect and install. Private capabilities should be served remotely when they contain lab knowledge, advisor rubrics, or paid work.",
      primaryAction: { text: "Open Gateway", href: "/gateway" },
      secondaryAction: { text: "Read Pricing View", href: "/perspectives" },
      tiers: [
        {
          title: "Public skill suite",
          price: "Free",
          description:
            "Literature search, paper review, PPT drafting, idea exploration, and experiment wrappers. These grow usage and teach the workflow.",
        },
        {
          title: "Pro workflows",
          price: "Monthly + usage",
          description:
            "Advanced review, related work, report generation, and long-context workflows with gateway balance and service controls.",
        },
        {
          title: "Private lab systems",
          price: "Setup + maintenance",
          description:
            "Advisor-style review, lab knowledge bases, private rubrics, and managed AutoResearch loops kept behind TokenResearch services.",
        },
      ],
      skillCards: [
        {
          title: "Literature search",
          description:
            "Search, rank, summarize, and map papers around an active research question.",
        },
        {
          title: "Paper review",
          description:
            "Turn advisor rubrics and review criteria into structured feedback on drafts.",
        },
        {
          title: "PPT generation",
          description:
            "Convert outlines and templates into editable presentation decks without manual layout work.",
        },
        {
          title: "AutoResearch",
          description:
            "Run overnight code, experiment, and debugging loops with progress traces and final reports.",
        },
      ],
    },
    perspectivesPage: {
      eyebrow: "Perspectives",
      title: "Working notes on research infrastructure, token economics, and skill commercialization.",
      description:
        "This page is the future article layer for TokenResearch. It should hold founder thinking, product notes, pricing arguments, and technical essays that explain why the platform exists.",
      articles: [
        {
          title: "Why public skills should be thin shells",
          category: "Commercialization",
          description:
            "Open local skills are strong distribution. Paid value should move into hosted APIs, private knowledge bases, and managed workflows.",
        },
        {
          title: "Token balance as research infrastructure",
          category: "Gateway",
          description:
            "Small labs do not buy model access like enterprises. They need flexible balance, predictable routing, and transparent usage.",
        },
        {
          title: "Advisor-style AI without pretending to replace advisors",
          category: "Private labs",
          description:
            "The safer product language is research feedback systems: style, rubric, and knowledge support for a specific lab.",
        },
      ],
      backlogTitle: "Backlog for future writing",
      backlog: [
        "How prompt caching changes long research workflows.",
        "What should be public in a skill, and what should stay remote.",
        "A practical pricing model for AI tools used by graduate students.",
        "How to evaluate a lab-specific research assistant.",
      ],
    },
    signalsPage: {
      eyebrow: "AI Signals",
      title: "A live intelligence page for AI infrastructure changes.",
      description:
        "Future collection agents can update this page with model releases, pricing changes, API changes, workflow risks, and research-tool opportunities. The current version is a static frame ready for that feed.",
      pipeline: [
        {
          title: "Collect",
          description:
            "Agents watch official docs, model announcements, pricing pages, changelogs, and research tooling sources.",
        },
        {
          title: "Classify",
          description:
            "Each item is tagged by impact: cost, capability, routing, risk, reliability, or research workflow value.",
        },
        {
          title: "Publish",
          description:
            "Important signals become short cards with source links, timestamps, and recommended TokenResearch actions.",
        },
      ],
      signals: [
        {
          source: "OpenAI",
          title: "Prompt caching affects reusable research context",
          impact: "Cost design",
          description:
            "Stable literature packs and method context can be designed as reusable prompt prefixes.",
          href: "https://platform.openai.com/docs/guides/prompt-caching",
        },
        {
          source: "Anthropic",
          title: "Cacheable context changes agent memory layout",
          impact: "Workflow design",
          description:
            "Long-running review and research loops benefit from separating stable background from per-run tasks.",
          href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching",
        },
        {
          source: "Gemini",
          title: "Context caching supports repeated corpus work",
          impact: "Infra planning",
          description:
            "Repeated analysis over the same corpus can become a first-class gateway optimization target.",
          href: "https://ai.google.dev/gemini-api/docs/caching",
        },
      ],
    },
  },
  zh: {
    common: {
      dashboard: "中转站",
      menuLabel: "打开导航菜单",
      open: "打开",
      read: "阅读",
      comingSoon: "待更新",
      footerDescription:
        "词元智研建设面向科研的 AI 基础设施：模型接入、可复用 Skill、私有实验室工作流和实时 AI 讯息。",
      footerColumns: [
        {
          title: "产品",
          links: [
            { text: "中转站", href: "/gateway" },
            { text: "技能", href: "/skills" },
            { text: "AI 讯息", href: "/signals" },
          ],
        },
        {
          title: "观点",
          links: [
            { text: "使命", href: "/mission" },
            { text: "观点文章", href: "/perspectives" },
            { text: "主页", href: "/" },
          ],
        },
        {
          title: "实时服务",
          links: [
            { text: "TokenResearch 中转站", href: serviceLinks.gateway },
            { text: "服务监控", href: serviceLinks.monitor },
          ],
        },
      ],
      policies: [
        { text: "中转站", href: serviceLinks.gateway },
        { text: "监控", href: serviceLinks.monitor },
      ],
      copyright: "© 2026 词元智研。科研基础设施页面草稿。",
    },
    missionPage: {
      eyebrow: "使命",
      title: "AI 应该加速科研，而不是替代科研者。",
      description:
        "词元智研希望把日常科研摩擦交给 AI：文献检索、代码复现、实验排查、接口调用、汇报整理。研究者应该把更多时间留给提出问题、判断方向和形成洞见。",
      primaryAction: { text: "查看技能", href: "/skills" },
      secondaryAction: { text: "打开中转站", href: "/gateway" },
      thesisLabel: "核心判断",
      thesis: "当执行变得便宜且可靠，科研发现就能尽可能接近思维本身的速度。",
      beliefs: [
        {
          title: "研究者主导",
          description:
            "人负责品味、判断、方向和最终论断。系统应该让这些工作更锋利，而不是把它们外包掉。",
        },
        {
          title: "压缩摩擦",
          description:
            "文献、实验排查、API 配置、汇报整理都是真实阻力。去掉这些阻力，会改变研究者敢尝试的问题。",
        },
        {
          title: "工作流优先",
          description:
            "Skill 不只是一个 prompt 文件，而是把指令、工具、约束和评价习惯封装成可复用流程。",
        },
      ],
      operatingModelTitle: "产品背后的商业模型",
      operatingModel: [
        "公开 Skill 负责传播工作流，并自然带来 token 消耗。",
        "中转站负责稳定模型接入、余额管理、路由和可观测性。",
        "私有实验室能力把高价值的导师风格、审稿标准和知识库留在远端服务里。",
      ],
    },
    gatewayPage: {
      eyebrow: "AI 基础设施中转站",
      title: "面向科研场景的模型接入、路由和用量管理。",
      description:
        "中转站是 TokenResearch 目前已经在线的服务。它把模型接入变成一个可管理的科研工具：余额充值、简单配置、多模型接入，以及未来和 Skill 工作流的直接联动。",
      primaryAction: { text: "打开中转站", href: serviceLinks.gateway },
      secondaryAction: { text: "查看监控", href: serviceLinks.monitor },
      statusCards: [
        {
          title: "中转站控制台",
          value: "已上线",
          description:
            "用于账号、余额、模型和 API 接入等当前工作流。后续会切换正式域名。",
          href: serviceLinks.gateway,
        },
        {
          title: "服务监控",
          value: "存活检查",
          description:
            "在长时间智能体或实验运行前，先确认中转站服务是否可达。",
          href: serviceLinks.monitor,
        },
      ],
      features: [
        {
          title: "符合科研使用节奏的余额",
          description:
            "研究负载经常小额、不规律，不应该要求用户手动处理多个上游额度和周期清零。",
        },
        {
          title: "面向 Skill 的模型路由",
          description:
            "Skill 工作流可以把中转站作为稳定模型层，不需要每个用户自己配置每个 provider。",
        },
        {
          title: "长任务前的可观测性",
          description:
            "AutoResearch 或深度审稿可能运行数小时，监控和用量数据是基础设施的一部分。",
        },
      ],
      roadmap: [
        "把公开 Skill 和 TokenResearch 余额绑定。",
        "增加按 Skill 维度的用量报告和 run ID。",
        "提供实验室级账单、额度和共享 key。",
        "把当前临时 IP 替换为正式产品域名。",
      ],
    },
    skillsPage: {
      eyebrow: "Skill",
      title: "Skill 是公开入口，真正高价值的能力应该沉淀为工作流和远端服务。",
      description:
        "词元智研用 Skill 把科研流程交给 Codex 和相邻智能体。公开 Skill 应该容易检查、安装和传播；包含实验室知识、导师标准或付费流程的私有能力，则应通过远端服务提供。",
      primaryAction: { text: "打开中转站", href: "/gateway" },
      secondaryAction: { text: "查看商业观点", href: "/perspectives" },
      tiers: [
        {
          title: "公开 Skill 套件",
          price: "免费",
          description:
            "文献检索、论文审稿、PPT 草稿、开 idea、实验 wrapper。目标是传播工作流并带来使用量。",
        },
        {
          title: "Pro 工作流",
          price: "月费 + 用量",
          description:
            "高级审稿、Related Work、报告生成和长上下文工作流，配合中转站余额和服务控制。",
        },
        {
          title: "私有实验室系统",
          price: "初始化费 + 维护费",
          description:
            "导师风格审稿、实验室知识库、私有 rubric 和托管 AutoResearch 循环，放在 TokenResearch 服务侧。",
        },
      ],
      skillCards: [
        {
          title: "文献检索",
          description:
            "围绕当前研究问题检索、排序、总结论文，并形成相关工作地图。",
        },
        {
          title: "论文审稿",
          description:
            "把导师标准和评审规则转化为对论文草稿的结构化反馈。",
        },
        {
          title: "PPT 生成",
          description:
            "把大纲和模板转成可编辑汇报，不把时间浪费在排版和排图上。",
        },
        {
          title: "AutoResearch",
          description:
            "彻夜运行代码、实验和排查循环，保留进度轨迹并输出最终报告。",
        },
      ],
    },
    perspectivesPage: {
      eyebrow: "观点",
      title: "关于科研基础设施、Token 经济和 Skill 商业化的工作笔记。",
      description:
        "这里会成为 TokenResearch 的文章层：创始人思考、产品判断、定价逻辑和技术文章都可以放在这里，用来解释为什么这个平台值得存在。",
      articles: [
        {
          title: "为什么公开 Skill 应该是薄壳",
          category: "商业化",
          description:
            "本地明文 Skill 很适合传播。真正可收费的价值应该放在托管 API、私有知识库和托管工作流中。",
        },
        {
          title: "余额为什么是一种科研基础设施",
          category: "中转站",
          description:
            "小实验室不像企业那样购买模型能力。他们需要灵活余额、稳定路由和透明用量。",
        },
        {
          title: "导师风格 AI 不应该被说成替代导师",
          category: "私有实验室",
          description:
            "更稳妥的产品语言是研究反馈系统：为特定实验室提供风格、标准和知识支持。",
        },
      ],
      backlogTitle: "后续文章选题",
      backlog: [
        "Prompt caching 如何改变长周期研究工作流。",
        "Skill 中什么应该公开，什么应该留在远端。",
        "面向研究生 AI 工具的实用定价模型。",
        "如何评价一个实验室私有研究助手。",
      ],
    },
    signalsPage: {
      eyebrow: "AI 最新讯息",
      title: "面向 AI 基础设施变化的实时情报页面。",
      description:
        "后续收集 Agent 可以把模型发布、价格变化、API 变化、工作流风险和研究工具机会实时更新到这里。当前版本先搭好静态框架，等待接入数据源。",
      pipeline: [
        {
          title: "收集",
          description:
            "Agent 监听官方文档、模型公告、价格页、changelog 和研究工具来源。",
        },
        {
          title: "分类",
          description:
            "每条讯息按影响类型标注：成本、能力、路由、风险、可靠性或科研工作流价值。",
        },
        {
          title: "发布",
          description:
            "重要讯息变成短卡片，带来源链接、时间戳和 TokenResearch 建议动作。",
        },
      ],
      signals: [
        {
          source: "OpenAI",
          title: "Prompt caching 会影响可复用研究上下文",
          impact: "成本设计",
          description:
            "稳定文献包和方法背景可以被设计成可复用 prompt 前缀。",
          href: "https://platform.openai.com/docs/guides/prompt-caching",
        },
        {
          source: "Anthropic",
          title: "可缓存上下文改变智能体记忆布局",
          impact: "工作流设计",
          description:
            "长周期审稿和研究循环，应该把稳定背景材料和每次任务拆开。",
          href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching",
        },
        {
          source: "Gemini",
          title: "上下文缓存支持重复语料工作",
          impact: "基础设施规划",
          description:
            "围绕同一批语料的反复分析，可以成为中转站优化的明确目标。",
          href: "https://ai.google.dev/gemini-api/docs/caching",
        },
      ],
    },
  },
} as const

export function getPageCopy(language: Language) {
  return pageCopy[language]
}

export function getNavLinks(language: Language) {
  return navLinks[language]
}
