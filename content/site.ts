export type SiteLocale = "zh" | "en"

export type SiteContent = {
  locale: SiteLocale
  brand: {
    name: string
    domain: string
    tagline: string
    lockupAlt: string
    markAlt: string
  }
  nav: {
    links: Array<{ label: string; href: string }>
    consultLabel: string
  }
  hero: {
    eyebrow: string
    title: string
    description: string
    primaryCta: string
    primaryHref: string
    secondaryCta: string
    secondaryHref: string
    chips: string[]
    note: string
  }
  audience: {
    eyebrow: string
    title: string
    description: string
    items: Array<{ title: string; description: string }>
  }
  mission: {
    eyebrow: string
    title: string
    summary: string
    painPoints: string[]
    statement: string
  }
  services: {
    eyebrow: string
    title: string
    description: string
    items: Array<{
      title: string
      description: string
      idealFor: string
      deliverables: string[]
    }>
  }
  process: {
    eyebrow: string
    title: string
    steps: Array<{ title: string; description: string }>
  }
  assets: {
    eyebrow: string
    title: string
    description: string
    disclaimer: string
    items: Array<{
      title: string
      description: string
      status: string
      tags: string[]
    }>
  }
  founder: {
    eyebrow: string
    title: string
    paragraphs: string[]
  }
  cta: {
    title: string
    description: string
    buttonText: string
    buttonHref: string
    note: string
  }
  footer: {
    note: string
    legal: string
  }
}

export const siteContent = {
  zh: {
    locale: "zh",
    brand: {
      name: "tokenresearch",
      domain: "tokenresearch.online",
      tagline: "连接智能，驱动研究",
      lockupAlt: "TokenResearch 标志",
      markAlt: "TokenResearch 图形标",
    },
    nav: {
      links: [
        { label: "定位", href: "#hero" },
        { label: "服务", href: "#services" },
        { label: "方法", href: "#how-we-work" },
        { label: "能力资产", href: "#capability-assets" },
      ],
      consultLabel: "发起咨询",
    },
    hero: {
      eyebrow: "AI-native research partner",
      title: "为研究与工程团队，构建更顺手的工作方式。",
      description:
        "TokenResearch 专注于科研 / 工程标准操作流程提效咨询与增值服务对接，把分散、重复、脆弱的执行环节整理为可复用的方法资产。",
      primaryCta: "查看服务内容",
      primaryHref: "#services",
      secondaryCta: "阅读我们的判断",
      secondaryHref: "#mission",
      chips: ["Research operations", "SOP design", "Method prototypes", "Bilingual delivery"],
      note: "当前官网是品牌与服务入口，不承接通用支持中心职能。",
    },
    audience: {
      eyebrow: "Who it is for",
      title: "面向企业，也面向正在认真做事的个人。",
      description: "我们不是只服务某一种客户类型，而是服务那些真正被研究与工程流程卡住的人。",
      items: [
        {
          title: "企业与团队负责人",
          description: "当协作成本过高、流程不可复用、交付质量依赖个体经验时，需要系统化工作方式。",
        },
        {
          title: "研究 / 工程执行团队",
          description: "当文献、实验、复现、排错和协同成本持续抬高时，需要一套更顺手的执行方法。",
        },
        {
          title: "独立研究者与个人用户",
          description: "当资源有限但目标明确时，需要一套能快速落地、又不失严谨的工作结构。",
        },
      ],
    },
    mission: {
      eyebrow: "Mission",
      title: "好的研究和工程，不该被流程摩擦吞掉。",
      summary:
        "我们做这件事，是因为太多聪明的人把时间耗在本不该成为核心难题的事情上：找资料、补环境、盯实验、救火、协作对齐。",
      painPoints: [
        "为一个判断，在文献和资料之间来回切换",
        "为复现实验，反复重建环境与脚本",
        "为稳定交付，持续手工盯任务、排查异常",
        "为团队协作，把关键经验困在个人手里",
      ],
      statement:
        "TokenResearch 想做的，不是替代人的判断，而是把“怎么做”这一层整理得更清晰、更可复用、更可持续迭代。",
    },
    services: {
      eyebrow: "Services",
      title: "当前阶段，我们聚焦两类高价值服务。",
      description: "不把范围拉得过大，而是先把真正产生价值的环节做扎实。",
      items: [
        {
          title: "科研 / 工程标准操作流程提效咨询",
          description: "梳理当前流程中的摩擦点、重复劳动与隐性依赖，形成更稳、更清晰的执行路径。",
          idealFor: "适合已有团队或正在形成稳定工作流的组织 / 个人。",
          deliverables: ["流程诊断与问题拆解", "关键节点 SOP 设计", "模板 / 规范 / 交付结构建议"],
        },
        {
          title: "增值服务说明与对接",
          description: "围绕方法资产、能力原型与协作需求，帮助你判断什么值得接、怎么接、接到什么程度。",
          idealFor: "适合需要更系统对接外部能力或高级支持的团队与个人。",
          deliverables: ["服务边界澄清", "对接方案建议", "能力组合与协作接口梳理"],
        },
      ],
    },
    process: {
      eyebrow: "How we work",
      title: "不是零散接活，而是把方法做成资产。",
      steps: [
        {
          title: "诊断当前流程",
          description: "确认问题发生在输入、执行、协作、复盘中的哪一层，而不是只看表面症状。",
        },
        {
          title: "抽象关键节点",
          description: "把真正影响效率和质量的节点抽出来，形成清晰的职责、接口和判断标准。",
        },
        {
          title: "沉淀 SOP / skill / 模板",
          description: "把能稳定复用的部分做成方法资产，而不是让经验继续散落在聊天和临时脚本里。",
        },
        {
          title: "持续优化与对接",
          description: "在真实使用里继续迭代，逐步把原型能力升级为更成熟的协作方式。",
        },
      ],
    },
    assets: {
      eyebrow: "Capability assets",
      title: "已有一些方法资产与能力雏形，但我们不会把原型包装成成熟平台。",
      description: "下面这些更像精选的工作方法、skill 原型和能力卡片，而不是已经完全产品化的商城。",
      disclaimer: "Selected capability assets · early prototypes",
      items: [
        {
          title: "ml-paper-writing",
          description: "把论文写作拆解为可协作的工作流，用于更稳定地推进研究输出。",
          status: "Official prototype",
          tags: ["Academic Writing", "NeurIPS", "ICML"],
        },
        {
          title: "ml-training-recipes",
          description: "沉淀常见训练流程、实验约束和排错路径，减少重复试错。",
          status: "Method asset",
          tags: ["PyTorch", "Training", "Optimization"],
        },
        {
          title: "brainstorming-research-ideas",
          description: "把研究方向发散与收敛做成结构化问题链，而不是纯灵感碰运气。",
          status: "Workflow prototype",
          tags: ["Research Ideation", "Brainstorming"],
        },
        {
          title: "creative-thinking-for-research",
          description: "把创意推导、类比和假设重组纳入一套更可解释的流程。",
          status: "Workflow prototype",
          tags: ["Creative Thinking", "Analogical Reasoning"],
        },
        {
          title: "academic-plotting",
          description: "围绕论文图表与视觉表达，形成更一致的研究叙事输出。",
          status: "Selected asset",
          tags: ["Visualization", "Matplotlib"],
        },
        {
          title: "weights-and-biases",
          description: "将成熟工具纳入流程编排，而不是重新发明已经存在的能力。",
          status: "Integrated practice",
          tags: ["MLOps", "WandB"],
        },
      ],
    },
    founder: {
      eyebrow: "Founder note",
      title: "我们更关心工作方式是否变得更可靠，而不是把 AI 讲得多热闹。",
      paragraphs: [
        "TokenResearch 的起点不是再做一个花哨前台，而是认真看待研究与工程执行里那些长期被忽视的摩擦：流程断裂、经验不可复用、协作接口模糊、判断标准不稳定。",
        "如果方法能被组织、沉淀和复用，人的判断就能被保护得更好。我们希望先把这一层做扎实，再去扩展更大的产品边界。",
      ],
    },
    cta: {
      title: "如果你想认真讨论流程优化与能力对接，先从一次清晰的沟通开始。",
      description:
        "当前官网首版优先承担品牌与服务说明。实际微信 / 企微入口可以在正式上线时替换为你的真实联络方式。",
      buttonText: "访问 tokenresearch.online",
      buttonHref: "https://tokenresearch.online",
      note: "需要替换微信 / 企微入口时，只需更新 content/site.ts 与 CTA 区配置。",
    },
    footer: {
      note: "Research operations, SOP design, and advisory for teams that care about execution quality.",
      legal: "© 2026 TokenResearch. All rights reserved.",
    },
  },
  en: {
    locale: "en",
    brand: {
      name: "tokenresearch",
      domain: "tokenresearch.online",
      tagline: "Connect Intelligence, Drive Research",
      lockupAlt: "TokenResearch logo lockup",
      markAlt: "TokenResearch symbol",
    },
    nav: {
      links: [
        { label: "Positioning", href: "#hero" },
        { label: "Services", href: "#services" },
        { label: "Method", href: "#how-we-work" },
        { label: "Assets", href: "#capability-assets" },
      ],
      consultLabel: "Start a conversation",
    },
    hero: {
      eyebrow: "AI-native research partner",
      title: "Build smoother workflows for research and engineering teams.",
      description:
        "TokenResearch focuses on workflow advisory and high-value service coordination, turning fragmented execution habits into reusable operating assets.",
      primaryCta: "See services",
      primaryHref: "#services",
      secondaryCta: "Read the thesis",
      secondaryHref: "#mission",
      chips: ["Research operations", "SOP design", "Method prototypes", "Bilingual delivery"],
      note: "This site is a brand and service entry point, not a generic support center.",
    },
    audience: {
      eyebrow: "Who it is for",
      title: "Built for companies, teams, and serious individuals.",
      description: "We are not limited to one customer category. We work with people who are genuinely blocked by research and engineering execution friction.",
      items: [
        {
          title: "Leads of companies and teams",
          description: "When delivery quality depends on tribal knowledge, the operating system of the team needs work.",
        },
        {
          title: "Research and engineering operators",
          description: "When literature review, experiments, reproduction, debugging, and coordination keep slowing the loop down.",
        },
        {
          title: "Independent researchers",
          description: "When resources are limited but standards remain high, the workflow itself needs to become more reliable.",
        },
      ],
    },
    mission: {
      eyebrow: "Mission",
      title: "Good research and engineering should not be consumed by execution friction.",
      summary:
        "We started here because too much valuable work gets buried under tasks that should never dominate the core effort: context gathering, environment repair, job babysitting, and coordination overhead.",
      painPoints: [
        "Searching through materials to justify a single decision",
        "Rebuilding environments and scripts to reproduce prior work",
        "Manually watching jobs, logs, and failures to keep delivery stable",
        "Leaving key operating knowledge trapped inside individuals",
      ],
      statement:
        "TokenResearch is not trying to replace human judgment. We want to make the layer of execution clearer, more reusable, and easier to iterate on.",
    },
    services: {
      eyebrow: "Services",
      title: "Right now, we focus on two high-value offers.",
      description: "The scope stays narrow on purpose. We would rather make the valuable parts sharp than pretend to do everything.",
      items: [
        {
          title: "Research / engineering workflow advisory",
          description: "Diagnose friction, repetition, and brittle dependencies inside your current workflow and redesign the path into something more stable.",
          idealFor: "Best for teams or individuals that already have recurring workflows and want them to compound.",
          deliverables: ["Workflow diagnosis", "SOP design for critical steps", "Templates, standards, and delivery structure"],
        },
        {
          title: "Premium service coordination",
          description: "Clarify which capability combinations are worth pursuing and how to interface with higher-value external support.",
          idealFor: "Best for teams or individuals evaluating external capabilities, specialized support, or premium collaboration paths.",
          deliverables: ["Service boundary clarification", "Coordination recommendations", "Interface and capability mapping"],
        },
      ],
    },
    process: {
      eyebrow: "How we work",
      title: "We are not selling random tasks. We turn method into reusable assets.",
      steps: [
        {
          title: "Diagnose the current workflow",
          description: "Locate the real bottleneck layer instead of treating symptoms in isolation.",
        },
        {
          title: "Abstract the critical nodes",
          description: "Make responsibilities, interfaces, and decision criteria explicit where they matter most.",
        },
        {
          title: "Capture SOPs, skills, and templates",
          description: "Turn stable patterns into assets instead of keeping them inside chat threads and ad-hoc scripts.",
        },
        {
          title: "Iterate in real use",
          description: "Keep refining through actual usage until a prototype grows into a stronger operating pattern.",
        },
      ],
    },
    assets: {
      eyebrow: "Capability assets",
      title: "We already have working method assets and early prototypes, but we will not present them as a mature marketplace.",
      description: "Think of these as selected skills, workflow prototypes, and operating assets rather than a finished platform catalog.",
      disclaimer: "Selected capability assets · early prototypes",
      items: [
        {
          title: "ml-paper-writing",
          description: "A more structured way to move research writing from scattered drafts into repeatable output.",
          status: "Official prototype",
          tags: ["Academic Writing", "NeurIPS", "ICML"],
        },
        {
          title: "ml-training-recipes",
          description: "Codifies training flows, experiment constraints, and debugging paths to reduce repeated trial-and-error.",
          status: "Method asset",
          tags: ["PyTorch", "Training", "Optimization"],
        },
        {
          title: "brainstorming-research-ideas",
          description: "Turns ideation into a structured question chain instead of relying on random inspiration.",
          status: "Workflow prototype",
          tags: ["Research Ideation", "Brainstorming"],
        },
        {
          title: "creative-thinking-for-research",
          description: "Brings analogies, recombination, and hypothesis shaping into a more explicit process.",
          status: "Workflow prototype",
          tags: ["Creative Thinking", "Analogical Reasoning"],
        },
        {
          title: "academic-plotting",
          description: "Supports more consistent visual storytelling for figures and research outputs.",
          status: "Selected asset",
          tags: ["Visualization", "Matplotlib"],
        },
        {
          title: "weights-and-biases",
          description: "Uses mature tooling where it helps instead of reinventing what already exists.",
          status: "Integrated practice",
          tags: ["MLOps", "WandB"],
        },
      ],
    },
    founder: {
      eyebrow: "Founder note",
      title: "We care more about whether the operating model becomes more reliable than whether the AI story sounds exciting.",
      paragraphs: [
        "TokenResearch did not start as a flashy front-end idea. It started from a serious look at execution friction: broken process boundaries, non-reusable expertise, vague interfaces, and unstable decision standards.",
        "If methods can be organized, stored, and reused, human judgment gets protected rather than buried. That is the layer we want to make stronger before expanding product scope.",
      ],
    },
    cta: {
      title: "If you want a serious conversation about workflow quality or capability coordination, start with a clear first contact.",
      description:
        "This first release focuses on brand and service communication. The final WeChat / enterprise WeChat entry can be swapped in when the production contact channel is ready.",
      buttonText: "Visit tokenresearch.online",
      buttonHref: "https://tokenresearch.online",
      note: "Replace the final WeChat / enterprise WeChat target in content/site.ts when the production contact channel is ready.",
    },
    footer: {
      note: "Research operations, SOP design, and advisory for teams that care about execution quality.",
      legal: "© 2026 TokenResearch. All rights reserved.",
    },
  },
} satisfies Record<SiteLocale, SiteContent>
