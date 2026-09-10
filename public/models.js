// Curated capability descriptions; availability and billing belong to the service console.
export const MODELS = [
 {id:'gpt-6-astra',name:'GPT-6 Astra',provider:'OpenAI',family:'GPT',badge:'复杂任务',categories:['reasoning','coding','writing','vision'],tags:['深度推理','代码开发','视觉理解'],description:'为复杂推理与端到端工作准备，让多步骤任务有条理地推进。',detail:'官方定位侧重复杂推理与代码工作。本教程的基础配置使用这一模型名称。',uses:['复杂问题分析','代码开发与重构','多步骤任务'],source:'https://developers.openai.com/api/docs/models',note:'Codex 教程配置',tone:'blue'},
 {id:'claude-opus-5',name:'Claude Opus 5',provider:'Anthropic',family:'Claude',badge:'智能体开发',categories:['reasoning','coding','writing','vision'],tags:['复杂推理','代码开发','工具使用'],description:'面向复杂的智能体编程与专业工作，持续处理有难度的任务。',detail:'官方将 Opus 5 定位于复杂智能体编程和企业工作；支持文本与图像输入、文本输出。',uses:['智能体编程','长任务分析','专业内容处理'],source:'https://platform.claude.com/docs/en/models/overview',tone:'clay'},
 {id:'gemini-3.1-pro-preview',name:'Gemini 3.1 Pro',provider:'Google',family:'Gemini',badge:'Preview',categories:['reasoning','coding','vision'],tags:['多模态','复杂推理','代码开发'],description:'理解不同形式的信息，处理复杂问题与多步骤代码任务。',detail:'官方预览模型，侧重复杂问题求解、智能体与代码能力。预览模型的名称及供应状态可能调整。',uses:['复杂信息分析','多模态任务','代码原型开发'],source:'https://ai.google.dev/gemini-api/docs/models',tone:'violet'},
 {id:'gpt-5.6-terra',name:'GPT-5.6 Terra',provider:'OpenAI',family:'GPT',badge:'均衡选择',categories:['reasoning','coding','writing','vision'],tags:['通用任务','代码开发','视觉理解'],description:'在模型能力与使用成本之间取得平衡，适合持续推进日常工作。',detail:'官方 GPT-5.6 系列中的均衡选项，支持文本和图像输入、文本输出。',uses:['日常代码任务','内容整理','图文理解'],source:'https://developers.openai.com/api/docs/models',tone:'blue'},
 {id:'claude-sonnet-5',name:'Claude Sonnet 5',provider:'Anthropic',family:'Claude',badge:'高效协作',categories:['reasoning','coding','writing','vision'],tags:['文本创作','代码开发','工具使用'],description:'兼顾响应速度与智能水平，为日常创作和开发保持流畅节奏。',detail:'官方定位强调速度与智能的平衡；支持文本与图像输入，以及工具使用。',uses:['内容撰写与修改','日常开发','信息归纳'],source:'https://platform.claude.com/docs/en/models/overview',tone:'clay'},
 {id:'gemini-3.8-flash',name:'Gemini 3.8 Flash',provider:'Google',family:'Gemini',badge:'工程任务',categories:['reasoning','coding','vision'],tags:['代码开发','智能体','多步骤任务'],description:'面向持续的软件工程、智能体执行与复杂工作流。',detail:'官方 Flash 系列模型，重点覆盖长期软件工程任务、自主智能体和复杂工作流程。',uses:['软件工程','智能体执行','多步骤工作流'],source:'https://ai.google.dev/gemini-api/docs/models',tone:'violet'},
 {id:'gpt-5.6-luna',name:'GPT-5.6 Luna',provider:'OpenAI',family:'GPT',badge:'轻量任务',categories:['coding','writing','vision'],tags:['日常任务','文本处理','视觉理解'],description:'面向成本敏感的大批量任务，让重复的信息处理更高效。',detail:'官方定位于成本敏感、高频使用场景。词元智研的实际计费由控制台确定。',uses:['文本分类与整理','批量内容处理','轻量开发任务'],source:'https://developers.openai.com/api/docs/models',tone:'blue'},
 {id:'gemini-3.1-flash-image',name:'Nano Banana 2',provider:'Google',family:'Gemini',badge:'图像创作',categories:['image'],tags:['图像生成','图片编辑','视觉创作'],description:'从一句描述到一张图片，也能继续用自然语言调整画面。',detail:'官方图像生成与编辑模型，强调生成效率及高频创意工作流。',uses:['视觉概念探索','图片生成','图片编辑'],source:'https://ai.google.dev/gemini-api/docs/models',tone:'violet'}
];
export const CATEGORIES=[['all','全部模型','grid'],['reasoning','深度推理','spark'],['coding','代码开发','code'],['writing','文本创作','pen'],['vision','多模态','layers'],['image','图像生成','image']];
export const DOCS=[
 {id:'overview',title:'文档首页',group:'开始使用',icon:'book',summary:'从这里了解词元智研，找到需要的接入步骤。'},
 {id:'codex',title:'Codex 安装与配置',group:'快速开始',icon:'terminal',summary:'Windows 与 Mac 的六步可视化安装教程。'},
 {id:'keys',title:'账号与 API 密钥',group:'快速开始',icon:'key',summary:'注册账号、创建 Key，并把它放到正确的位置。'},
 {id:'skills',title:'使用科研 Skills',group:'科研工作流',icon:'layers',summary:'下载方法文件，准备材料，开始第一个科研任务。'},
 {id:'research-files',title:'组织研究材料',group:'科研工作流',icon:'book',summary:'把论文、代码、运行记录和产物放在清楚的位置。'},
 {id:'pricing',title:'价格与模型分组',group:'模型与计费',icon:'grid',summary:'读懂人民币单价、分组倍率和缓存计费。'},
 {id:'config',title:'配置文件说明',group:'接入参考',icon:'file',summary:'了解 config.toml 与 auth.json 各自负责什么。'},
 {id:'troubleshooting',title:'常见问题与排查',group:'接入参考',icon:'help',summary:'按现象定位目录、文件名、密钥和连接问题。'}
];
