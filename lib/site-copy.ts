import { type Language } from "@/components/language-provider"

export type SiteCopy = typeof siteCopy.en

export const siteCopy = {
  en: {
    brand: {
      name: "TokenResearch",
      localizedName: "TokenResearch",
      logoAlt: "TokenResearch logo",
    },
    navbar: {
      links: [
        { text: "Mission", href: "#mission" },
        { text: "Perspectives", href: "#capabilities" },
        { text: "Publications", href: "#skills" },
        { text: "Skills", href: "#skills" },
      ],
      dashboard: "Dashboard",
      menuLabel: "Toggle navigation menu",
    },
    hero: {
      badge: {
        status: "New",
        text: "Introducing the New TokenResearch",
      },
      eyebrow: "AI for Science, From Idea to Publication",
      titlePrefix: "Vibe Research for",
      researchFields: [
        "Machine Learning",
        "Data Science",
        "Computer Science",
        "Artificial Intelligence",
        "Neural Language Processing",
        "Computer Vision",
        "Machine Learning",
      ],
      researchFieldsLabel:
        "Machine Learning, Data Science, Computer Science, Artificial Intelligence, Neural Language Processing, and Computer Vision",
      description:
        "An AI-Native Vibe Research platform - you stay in control of the science while agents handle the heavy lifting.",
      imageAlt: "TokenResearch workspace interface",
      buttons: [
        { href: "#product-ui", text: "Get Started", variant: "default" },
        { href: "#mission", text: "Our Mission", variant: "outline" },
      ],
      highlights: [
        "Search literature",
        "Brainstorm",
        "Plan experiments",
        "Run GPU jobs",
        "Analyze results",
        "Draft publications",
      ],
    },
    workflow: {
      badge: "5-stage workflow",
      title: "A research loop instead of disconnected tools",
      steps: [
        {
          title: "Literature",
          description: "Map prior work and recover the relevant papers faster.",
        },
        {
          title: "Ideation",
          description:
            "Turn questions into hypotheses, plans, and candidate directions.",
        },
        {
          title: "Experiment",
          description:
            "Run structured workflows and reusable research skills.",
        },
        {
          title: "Analysis",
          description:
            "Extract evidence, compare results, and trace reasoning.",
        },
        {
          title: "Writing",
          description:
            "Draft reports, paper sections, and reproducible handoffs.",
        },
      ],
    },
    mission: {
      badge: "Mission and goal",
      title: "Mission: Research at the Speed of Thought",
      description:
        "TokenResearch is built for the moment when AI compresses the execution layer of science. Our mission is to keep researchers in control of questions, judgment, taste, and obsession while agents handle the costly work between curiosity and evidence.",
      operatingBeliefLabel: "Goal",
      operatingBelief:
        "When execution becomes nearly free, researchers can finally move at the speed of thought.",
      operatingBeliefTags: ["Low-friction", "Researcher-led", "Thought-speed"],
      principles: [
        {
          title: "Collapse execution friction",
          description:
            "Literature review, experiments, analysis, and writing should become cheap enough that researchers can ask bigger questions without waiting weeks for setup.",
        },
        {
          title: "Move the bottleneck to judgment",
          description:
            "When agents can do more of the work, the human contribution becomes choosing the right problem, reading evidence clearly, and deciding what is worth pursuing.",
        },
        {
          title: "Amplify taste and obsession",
          highlights: ["taste", "obsession"],
          description:
            "The future researcher is not replaced by automation. They become a conductor who defines quality, follows the important thread, and keeps pushing when the first answers are not enough.",
        },
      ],
      qualities: [
        {
          title: "Taste",
          label: "Researcher quality",
          text:
            'Taste is holding yourself to a high standard when no one is checking your work. It is the boldness to aim for something that has never been done, and the creativity to see a path where others see a wall. It is deep domain knowledge distilled into judgment: the ability to look at a thousand possible directions and say, this one matters. Richard Hamming used to ask his colleagues at Bell Labs, "What are the important problems in your field? And why aren\'t you working on them?" Most people never ask. Taste is what makes you ask, and what makes your answer worth following.',
          highlight: "this one matters.",
        },
        {
          title: "Obsession",
          label: "Researcher quality",
          text:
            "Obsession is what keeps you pulling the thread after the first ten attempts fail. It is curiosity that refuses to be satisfied with a surface answer. It is the passion that makes you queue another experiment at midnight, not because anyone is watching, but because you need to know. It is the resilience to hear \"that won't work\" and treat it as data rather than a verdict.",
          highlight: "need to know.",
        },
      ],
    },
    capabilities: {
      title: "Core capabilities for the TokenResearch workspace",
      description:
        "This section replaces the generic template feature list with the product surfaces that matter for TokenResearch. The cards can evolve with the platform, but the structure already fits the current direction.",
      items: [
        {
          title: "Literature review",
          description:
            "Synthesize prior work, map related papers, and keep reading connected to the active question.",
        },
        {
          title: "Research agent",
          description:
            "Turn broad research goals into structured plans, subproblems, and evidence-backed next steps.",
        },
        {
          title: "AI search",
          description:
            "Find relevant papers, methods, and datasets without losing context between tools and tabs.",
        },
        {
          title: "Extract data",
          description:
            "Convert messy papers, notes, or experiment traces into structured facts that can be compared and reused.",
        },
        {
          title: "SOP skills",
          description:
            "Package recurring research workflows into named skills so the best process becomes easy to repeat.",
        },
        {
          title: "Deep research",
          description:
            "Run longer investigations that connect sources, compare evidence, and preserve citations.",
        },
        {
          title: "Reports",
          description:
            "Transform findings into briefings, research memos, and publication-ready narrative artifacts.",
        },
        {
          title: "Research handoffs",
          description:
            "Keep decisions, evidence, and procedural knowledge traceable across teammates and future runs.",
        },
      ],
    },
    stats: {
      items: [
        {
          label: "mission page signal",
          value: 80,
          suffix: "%",
          description:
            "of a researcher's time can disappear into reading, coding, and bug fixing overhead",
        },
        {
          label: "founders",
          value: 2,
          description:
            "team profiles structured and waiting for final portraits",
        },
        {
          label: "visible today",
          value: 12,
          description:
            "academic skills already showcased from the existing library",
        },
        {
          label: "research stages",
          value: 5,
          description:
            "literature, ideation, experiment, analysis, and writing",
        },
      ],
    },
    skills: {
      badge: "Skill library",
      officialLabel: "Official",
      placeholderBadge: "Placeholder",
      placeholderTitle: "Next academic skill",
      placeholderDescription:
        "Leave this card for the next research workflow, benchmark pack, or domain-specific SOP that you want to surface publicly.",
      placeholderNote:
        "Add future skill name, one-line summary, tags, and version here.",
      title: "Academic skills already in the library",
      description:
        "These cards translate research know-how into reusable procedures. The grid is intentionally expandable, so new skills, screenshots, or category tags can be added later without redesigning the page.",
      skills: [
        {
          name: "ml-paper-writing",
          description:
            "Write publication-ready ML and AI papers from research notes, experiments, and outlines.",
          tags: ["Academic Writing", "NeurIPS", "ICML"],
          version: "v1.2.0",
        },
        {
          name: "ml-training-recipes",
          description:
            "Battle-tested PyTorch training recipes for LLMs, vision, diffusion, and applied science workloads.",
          tags: ["PyTorch", "Training", "Optimization"],
          version: "v1.0.0",
        },
        {
          name: "brainstorming-research-ideas",
          description:
            "Guided ideation workflows for problem discovery, framing, and candidate research directions.",
          tags: ["Research Ideation", "Brainstorming", "Problem Discovery"],
          version: "v1.0.0",
        },
        {
          name: "weights-and-biases",
          description:
            "Track experiments, visualize training runs, and keep research operations observable in real time.",
          tags: ["MLOps", "Weights & Biases", "WandB"],
          version: "v1.0.0",
        },
        {
          name: "academic-plotting",
          description:
            "Generate publication-quality charts and paper figures from notebooks, logs, and result tables.",
          tags: ["Academic Writing", "Visualization", "Matplotlib"],
          version: "v1.0.0",
        },
        {
          name: "pytorch-lightning",
          description:
            "Structure distributed training, trainer loops, and scalable experiments with Lightning patterns.",
          tags: [
            "PyTorch Lightning",
            "Training Framework",
            "Distributed Training",
          ],
          version: "v1.0.0",
        },
        {
          name: "grpo-rl-training",
          description:
            "Expert guidance for GRPO and RL fine-tuning workflows across reasoning-heavy tasks.",
          tags: ["Post-Training", "Reinforcement Learning", "GRPO"],
          version: "v1.0.0",
        },
        {
          name: "creative-thinking-for-research",
          description:
            "Apply cognitive-science frameworks to analogical reasoning and research ideation.",
          tags: [
            "Creative Thinking",
            "Research Ideation",
            "Analogical Reasoning",
          ],
          version: "v1.0.0",
        },
        {
          name: "instructor",
          description:
            "Extract structured outputs from LLMs with validation, retries, and schema-backed reasoning.",
          tags: ["Prompt Engineering", "Instructor", "Structured Output"],
          version: "v1.0.0",
        },
        {
          name: "langchain",
          description:
            "Build agentic research workflows with tools, chains, and retrieval-augmented pipelines.",
          tags: ["Agents", "LangChain", "RAG"],
          version: "v1.0.0",
        },
        {
          name: "transformer-lens-interpretability",
          description:
            "Support mechanistic interpretability workflows with activation patching and representation analysis.",
          tags: [
            "Mechanistic Interpretability",
            "TransformerLens",
            "Activation Patching",
          ],
          version: "v1.0.0",
        },
        {
          name: "peft-fine-tuning",
          description:
            "Parameter-efficient fine-tuning playbooks for LoRA, QLoRA, and adjacent adaptation methods.",
          tags: ["Fine-Tuning", "PEFT", "LoRA"],
          version: "v1.0.0",
        },
      ],
    },
    team: {
      badge: "Team and launch assets",
      title: "Meet the founding team",
      description:
        "The founding team profiles are now in place, with room to expand bios, links, and launch materials as the site evolves.",
      members: [
        {
          name: "Yun Wang",
          title: "Founder",
          note: "Profile details can be expanded here when the final short bio is ready.",
          imageSrc: "/team/yun-wang.png",
          imageAlt: "Portrait illustration of Yun Wang",
        },
        {
          name: "Luoxiao Yang",
          title: "Founder",
          note: "Profile details can be expanded here when the final short bio is ready.",
          imageSrc: "/team/luoxiao-yang.png",
          imageAlt: "Portrait illustration of Luoxiao Yang",
        },
      ],
      launchSlotDescription:
        "Reserve this block for additional launch credibility assets when you have the final image or copy.",
      launchSlots: [
        "Case study cover placeholder",
        "Institution or partner logo strip placeholder",
        "Press quote or testimonial placeholder",
      ],
    },
    faq: {
      badge: "FAQ",
      title: "Questions that matter for the launch page",
      items: [
        {
          question: "What does 'AI co-scientist' mean for TokenResearch?",
          answer: [
            "It means the system is designed to strengthen scientific reasoning, not replace it. The product should help researchers search, compare, structure, and write with more rigor.",
            'That is why the page language centers augmentation, evidence, and reusable skills rather than generic "AI automation" marketing.',
          ],
        },
        {
          question:
            "Why emphasize reusable skills instead of a simple chat box?",
          answer: [
            "Because research quality depends on process. A named skill captures a repeatable workflow, the right prompts, domain context, and the structure needed for consistent execution.",
            "The launch page therefore treats the skill library as a core product asset, not a secondary feature.",
          ],
        },
        {
          question:
            "Which content areas are intentionally placeholders right now?",
          answer: [
            "Founder portraits, short bios, external profile links, case-study visuals, institution logos, and public contact links are all given dedicated placeholder space so you can add them later.",
            "The layout is already structured so those additions will feel native instead of tacked on.",
          ],
        },
        {
          question:
            "Why keep both the product screenshot and the brand-asset board?",
          answer: [
            "They tell two different parts of the story. The workspace screenshot shows what the software feels like, while the brand board shows identity, mascot usage, and launch-system consistency.",
            "That combination is useful for a homepage until you have polished launch media and team photography.",
          ],
        },
        {
          question: "Can more sections be added later without another redesign?",
          answer: [
            "Yes. The current page is organized around reusable sections, so you can add publications, testimonials, advisors, partner logos, or product videos as separate blocks without disturbing the existing hierarchy.",
          ],
        },
      ],
    },
    cta: {
      title:
        "Ready to move from curiosity to evidence at thought speed?",
      description:
        "TokenResearch is designed for researchers who want to ask sharper questions, release agents on the execution layer, and keep the final judgment in human hands.",
      buttons: [
        { href: "#product-ui", text: "Start researching", variant: "default" },
        { href: "#mission", text: "Read the mission", variant: "outline" },
      ],
    },
    footer: {
      description:
        "AI-native research workspace for deeper reading, sharper experiments, and better scientific handoffs.",
      columns: [
        {
          title: "Narrative",
          links: [
            { text: "Mission", href: "#mission" },
            { text: "Capabilities", href: "#capabilities" },
            { text: "FAQ", href: "#footer" },
          ],
        },
        {
          title: "Product",
          links: [
            { text: "Workspace screenshot", href: "#product-ui" },
            { text: "Academic skills", href: "#skills" },
            { text: "Research workflow", href: "#capabilities" },
          ],
        },
        {
          title: "Placeholders",
          links: [
            { text: "Founder photos", href: "#team" },
            { text: "Contact email", href: "#footer" },
            { text: "GitHub or waitlist link", href: "#footer" },
          ],
        },
      ],
      copyright:
        "© 2026 TokenResearch. Launch page draft prepared for content fill-in.",
      policies: [
        { text: "Email placeholder", href: "#footer" },
        { text: "LinkedIn placeholder", href: "#footer" },
      ],
    },
    languageToggle: {
      switchToEnglish: "Switch language to English",
      switchToChinese: "Switch language to Chinese",
      englishLabel: "EN",
      chineseLabel: "中",
    },
  },
  zh: {
    brand: {
      name: "TokenResearch",
      localizedName: "词元智研",
      logoAlt: "词元智研标志",
    },
    navbar: {
      links: [
        { text: "使命", href: "#mission" },
        { text: "视角", href: "#capabilities" },
        { text: "成果", href: "#skills" },
        { text: "技能", href: "#skills" },
      ],
      dashboard: "工作台",
      menuLabel: "打开导航菜单",
    },
    hero: {
      badge: {
        status: "全新",
        text: "全新词元智研正式亮相",
      },
      eyebrow: "面向科学的 AI，从想法到发表",
      titlePrefix: "Vibe Research 面向",
      researchFields: [
        "机器学习",
        "数据科学",
        "计算机科学",
        "人工智能",
        "神经语言处理",
        "计算机视觉",
        "机器学习",
      ],
      researchFieldsLabel:
        "机器学习、数据科学、计算机科学、人工智能、神经语言处理和计算机视觉",
      description:
        "词元智研是一款 AI 原生的 Vibe Research 平台：科学判断始终由你掌控，繁重流程交给智能体完成。",
      imageAlt: "词元智研工作台界面",
      buttons: [
        { href: "#product-ui", text: "开始体验", variant: "default" },
        { href: "#mission", text: "了解使命", variant: "outline" },
      ],
      highlights: [
        "检索文献",
        "头脑风暴",
        "规划实验",
        "运行 GPU 任务",
        "分析结果",
        "撰写论文",
      ],
    },
    workflow: {
      badge: "五阶段研究流程",
      title: "用完整研究闭环替代割裂工具",
      steps: [
        {
          title: "文献",
          description: "更快梳理前人工作，找回真正相关的论文。",
        },
        {
          title: "构想",
          description: "把问题转化为假设、计划和候选研究方向。",
        },
        {
          title: "实验",
          description: "运行结构化流程，并复用沉淀好的研究技能。",
        },
        {
          title: "分析",
          description: "抽取证据、比较结果，并保留推理链路。",
        },
        {
          title: "写作",
          description: "生成报告、论文段落和可复现的研究交接材料。",
        },
      ],
    },
    mission: {
      badge: "使命与目标",
      title: "使命：让研究以思维的速度前进",
      description:
        "词元智研面向一个新的研究范式：AI 正在压缩科学的执行层。我们的使命，是让研究者继续掌控问题、判断、品味与执念，把从好奇心到证据之间的高成本工作交给智能体完成。",
      operatingBeliefLabel: "目标",
      operatingBelief:
        "当执行变得几乎免费，研究者终于能以思维的速度前进。",
      operatingBeliefTags: ["低摩擦", "研究者主导", "思维速度"],
      principles: [
        {
          title: "压缩执行摩擦",
          description:
            "文献、实验、分析与写作都应变得足够便宜，让研究者不再因为流程成本而放弃更大的问题。",
        },
        {
          title: "把瓶颈交还给判断",
          description:
            "当智能体能够承担更多执行，人的价值就转向提出正确问题、读懂证据，并判断什么方向真正值得追。",
        },
        {
          title: "放大品味与执念",
          highlights: ["品味", "执念"],
          description:
            "未来的研究者不会被自动化替代，而会成为指挥者：定义什么是好的，追踪真正重要的线索，并在前几次失败后继续推进。",
        },
      ],
      qualities: [
        {
          title: "品味",
          label: "研究者特质",
          text:
            "品味，是在没有人检查你工作的时候，依然用很高的标准要求自己。它是敢于瞄准前所未有之事的胆量，也是能在别人只看见墙的地方看见路径的创造力。它是深厚领域知识沉淀成的判断力：面对上千个可能方向时，你能看着其中一个说，这个方向重要。Richard Hamming 曾经问贝尔实验室的同事：“你所在领域最重要的问题是什么？你为什么没有在做它们？”大多数人从不这样问。品味让你提出这个问题，也让你的答案值得被追随。",
          highlight: "这个方向重要。",
        },
        {
          title: "执念",
          label: "研究者特质",
          text:
            "执念，是当前十次尝试都失败之后，仍然让你继续顺着线索追下去的东西。它是不愿满足于表面答案的好奇心。它是一种热情，让你在午夜又排上一个实验，不是因为有人在看，而是因为你必须知道。它也是一种韧性：听到“这行不通”时，把它当作数据，而不是判决。",
          highlight: "你必须知道。",
        },
      ],
    },
    capabilities: {
      title: "词元智研工作台的核心能力",
      description:
        "这一部分展示词元智研真正重要的产品界面与能力。卡片内容可以随着平台演进持续扩展，而当前结构已经贴合产品方向。",
      items: [
        {
          title: "文献综述",
          description:
            "综合已有工作，绘制相关论文地图，并让阅读始终围绕当前问题展开。",
        },
        {
          title: "研究智能体",
          description:
            "把宽泛研究目标拆解为结构化计划、子问题和有证据支撑的下一步。",
        },
        {
          title: "AI 搜索",
          description:
            "在不丢失上下文的前提下，查找相关论文、方法和数据集。",
        },
        {
          title: "数据抽取",
          description:
            "将论文、笔记或实验轨迹中的混乱信息转成可比较、可复用的结构化事实。",
        },
        {
          title: "SOP 技能",
          description:
            "把重复出现的研究流程封装为命名技能，让最佳流程更容易复用。",
        },
        {
          title: "深度研究",
          description:
            "运行更长周期的调查，连接来源、比较证据，并保留引用。",
        },
        {
          title: "报告生成",
          description:
            "把发现转化为简报、研究备忘录和接近发表质量的叙事材料。",
        },
        {
          title: "研究交接",
          description:
            "让决策、证据和流程知识在团队成员与未来运行中保持可追踪。",
        },
      ],
    },
    stats: {
      items: [
        {
          label: "使命页信号",
          value: 80,
          suffix: "%",
          description:
            "研究者的时间可能消耗在阅读、写代码和修 bug 等流程开销上",
        },
        {
          label: "创始人",
          value: 2,
          description: "团队资料结构已就位，等待最终头像与简介",
        },
        {
          label: "当前展示",
          value: 12,
          description: "来自现有库的学术技能已经在页面中展示",
        },
        {
          label: "研究阶段",
          value: 5,
          description: "文献、构想、实验、分析与写作",
        },
      ],
    },
    skills: {
      badge: "技能库",
      officialLabel: "官方",
      placeholderBadge: "占位",
      placeholderTitle: "下一个学术技能",
      placeholderDescription:
        "为下一个研究流程、基准包或领域 SOP 预留这个卡片位置。",
      placeholderNote: "在这里补充未来技能名称、一句话简介、标签和版本。",
      title: "技能库中已有的学术技能",
      description:
        "这些卡片把研究 know-how 转译成可复用流程。网格结构可以自然扩展，后续添加新技能、截图或分类标签时无需重新设计页面。",
      skills: [
        {
          name: "ml-paper-writing",
          description:
            "从研究笔记、实验和大纲出发，撰写可投稿的机器学习与 AI 论文。",
          tags: ["学术写作", "NeurIPS", "ICML"],
          version: "v1.2.0",
        },
        {
          name: "ml-training-recipes",
          description:
            "面向大模型、视觉、扩散模型和应用科学负载的 PyTorch 训练配方。",
          tags: ["PyTorch", "训练", "优化"],
          version: "v1.0.0",
        },
        {
          name: "brainstorming-research-ideas",
          description:
            "用于问题发现、问题构型和候选研究方向生成的引导式构想流程。",
          tags: ["研究构想", "头脑风暴", "问题发现"],
          version: "v1.0.0",
        },
        {
          name: "weights-and-biases",
          description:
            "跟踪实验、可视化训练运行，并实时保持研究运维可观测。",
          tags: ["MLOps", "Weights & Biases", "WandB"],
          version: "v1.0.0",
        },
        {
          name: "academic-plotting",
          description:
            "从 notebook、日志和结果表中生成论文级图表与插图。",
          tags: ["学术写作", "可视化", "Matplotlib"],
          version: "v1.0.0",
        },
        {
          name: "pytorch-lightning",
          description:
            "用 Lightning 模式组织分布式训练、trainer 循环和可扩展实验。",
          tags: ["PyTorch Lightning", "训练框架", "分布式训练"],
          version: "v1.0.0",
        },
        {
          name: "grpo-rl-training",
          description:
            "面向推理密集任务的 GRPO 与强化学习微调工作流专家指南。",
          tags: ["后训练", "强化学习", "GRPO"],
          version: "v1.0.0",
        },
        {
          name: "creative-thinking-for-research",
          description:
            "把认知科学框架用于类比推理和研究构想生成。",
          tags: ["创造性思维", "研究构想", "类比推理"],
          version: "v1.0.0",
        },
        {
          name: "instructor",
          description:
            "通过校验、重试和 schema 支撑的推理，从 LLM 中抽取结构化输出。",
          tags: ["提示工程", "Instructor", "结构化输出"],
          version: "v1.0.0",
        },
        {
          name: "langchain",
          description:
            "使用工具、链和检索增强流水线构建智能体式研究工作流。",
          tags: ["智能体", "LangChain", "RAG"],
          version: "v1.0.0",
        },
        {
          name: "transformer-lens-interpretability",
          description:
            "支持机制可解释性流程，包括激活 patching 和表征分析。",
          tags: ["机制可解释性", "TransformerLens", "激活 Patching"],
          version: "v1.0.0",
        },
        {
          name: "peft-fine-tuning",
          description:
            "面向 LoRA、QLoRA 及相关适配方法的参数高效微调手册。",
          tags: ["微调", "PEFT", "LoRA"],
          version: "v1.0.0",
        },
      ],
    },
    team: {
      badge: "团队与发布素材",
      title: "认识创始团队",
      description:
        "创始团队资料已经有了页面位置，后续可继续扩展简介、链接与发布素材。",
      members: [
        {
          name: "Yun Wang",
          title: "创始人",
          note: "最终短简介准备好后，可在这里扩展个人资料。",
          imageSrc: "/team/yun-wang.png",
          imageAlt: "Yun Wang 肖像插画",
        },
        {
          name: "Luoxiao Yang",
          title: "创始人",
          note: "最终短简介准备好后，可在这里扩展个人资料。",
          imageSrc: "/team/luoxiao-yang.png",
          imageAlt: "Luoxiao Yang 肖像插画",
        },
      ],
      launchSlotDescription:
        "当最终图片或文案准备好时，可将这里替换为更多发布可信度素材。",
      launchSlots: [
        "案例研究封面占位",
        "机构或合作方 Logo 条占位",
        "媒体引用或用户评价占位",
      ],
    },
    faq: {
      badge: "常见问题",
      title: "发布页需要回答的关键问题",
      items: [
        {
          question: "词元智研所说的“AI 共同科学家”是什么意思？",
          answer: [
            "它意味着系统被设计为增强科学推理，而不是替代科学推理。产品应帮助研究者更严谨地搜索、比较、组织和写作。",
            "因此，页面语言强调增强、证据和可复用技能，而不是泛泛而谈的“AI 自动化”营销。",
          ],
        },
        {
          question: "为什么强调可复用技能，而不是只做聊天框？",
          answer: [
            "因为研究质量取决于流程。一个命名技能会保存可重复工作流、合适的提示词、领域上下文，以及稳定执行所需的结构。",
            "因此，发布页把技能库视为核心产品资产，而不是次要功能。",
          ],
        },
        {
          question: "哪些内容目前仍是有意保留的占位？",
          answer: [
            "创始人头像、短简介、外部资料链接、案例视觉、机构 Logo 和公开联系方式都已有专门占位，方便之后补充。",
            "当前布局已经为这些新增内容预留了自然位置，不会显得临时拼接。",
          ],
        },
        {
          question: "为什么同时保留产品截图和品牌素材板？",
          answer: [
            "它们讲述的是故事的两个部分。工作台截图展示软件体验，品牌素材板展示身份、形象使用和发布系统的一致性。",
            "在最终发布媒体和团队照片准备好之前，这种组合适合作为首页表达。",
          ],
        },
        {
          question: "以后还能继续加新板块而不重做设计吗？",
          answer: [
            "可以。当前页面围绕可复用 section 组织，后续可以把论文、用户评价、顾问、合作方 Logo 或产品视频作为独立区块加入，而不破坏现有层级。",
          ],
        },
      ],
    },
    cta: {
      title: "准备以思维的速度，从好奇走向证据了吗？",
      description:
        "词元智研为新的研究者而设计：你提出更锋利的问题，把执行层释放给智能体，并把最终判断留在人手里。",
      buttons: [
        { href: "#product-ui", text: "开始研究", variant: "default" },
        { href: "#mission", text: "阅读使命", variant: "outline" },
      ],
    },
    footer: {
      description:
        "AI 原生研究工作台，让阅读更深入、实验更清晰、科学交接更可靠。",
      columns: [
        {
          title: "叙事",
          links: [
            { text: "使命", href: "#mission" },
            { text: "能力", href: "#capabilities" },
            { text: "常见问题", href: "#footer" },
          ],
        },
        {
          title: "产品",
          links: [
            { text: "工作台截图", href: "#product-ui" },
            { text: "学术技能", href: "#skills" },
            { text: "研究流程", href: "#capabilities" },
          ],
        },
        {
          title: "占位",
          links: [
            { text: "创始人照片", href: "#team" },
            { text: "联系邮箱", href: "#footer" },
            { text: "GitHub 或候补名单链接", href: "#footer" },
          ],
        },
      ],
      copyright: "© 2026 词元智研。发布页草稿，待补充正式内容。",
      policies: [
        { text: "邮箱占位", href: "#footer" },
        { text: "LinkedIn 占位", href: "#footer" },
      ],
    },
    languageToggle: {
      switchToEnglish: "切换到英文",
      switchToChinese: "切换到中文",
      englishLabel: "EN",
      chineseLabel: "中",
    },
  },
} as const

export function getSiteCopy(language: Language) {
  return siteCopy[language]
}
