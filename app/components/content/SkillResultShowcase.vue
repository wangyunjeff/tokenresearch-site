<template>
  <div class="not-prose my-8 overflow-hidden rounded-lg border border-default bg-white dark:bg-neutral-950">
    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-default px-4 py-3">
      <div class="flex items-center gap-3">
        <div class="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
          <UIcon
            :name="showcase.icon"
            class="size-5"
          />
        </div>
        <div>
          <div class="text-sm font-semibold text-highlighted">
            {{ showcase.title }} result preview
          </div>
          <div class="text-xs text-muted">
            {{ showcase.subtitle }}
          </div>
        </div>
      </div>
      <UBadge
        color="neutral"
        variant="subtle"
      >
        {{ showcase.deliverable }}
      </UBadge>
    </div>

    <div class="grid gap-px bg-default lg:grid-cols-[1.1fr_0.9fr]">
      <div class="bg-white p-4 dark:bg-neutral-950">
        <div
          class="overflow-hidden rounded-md border border-white/20"
          :class="showcase.panel"
        >
          <div class="flex items-center justify-between border-b border-white/25 px-3 py-2">
            <div class="flex items-center gap-1">
              <span class="size-2 rounded-full bg-white/75" />
              <span class="size-2 rounded-full bg-white/55" />
              <span class="size-2 rounded-full bg-white/35" />
            </div>
            <span class="rounded bg-white/20 px-2 py-0.5 text-[11px] font-medium text-white">
              {{ showcase.mode }}
            </span>
          </div>

          <div class="grid min-h-56 gap-3 p-4 md:grid-cols-5">
            <div class="space-y-2 md:col-span-2">
              <div
                v-for="line in showcase.lines"
                :key="line"
                class="h-3 rounded bg-white/70"
                :style="{ width: line }"
              />
              <div class="grid grid-cols-3 gap-2 pt-4">
                <div class="h-10 rounded bg-white/25" />
                <div class="h-10 rounded bg-white/40" />
                <div class="h-10 rounded bg-white/30" />
              </div>
            </div>
            <div class="rounded bg-white/25 p-3 md:col-span-3">
              <div class="grid h-full grid-cols-2 gap-3">
                <div class="rounded bg-white/35" />
                <div class="space-y-2">
                  <div class="h-5 rounded bg-white/75" />
                  <div class="h-5 rounded bg-white/55" />
                  <div class="h-16 rounded bg-white/35" />
                  <div class="grid grid-cols-2 gap-2">
                    <div class="h-8 rounded bg-white/30" />
                    <div class="h-8 rounded bg-white/45" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 dark:bg-neutral-950">
        <dl class="grid gap-3">
          <div
            v-for="item in showcase.spec"
            :key="item.label"
            class="rounded-md bg-neutral-50 p-3 dark:bg-neutral-900"
          >
            <dt class="text-xs font-medium text-muted">
              {{ item.label }}
            </dt>
            <dd class="mt-1 text-sm text-highlighted">
              {{ item.value }}
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="grid gap-px bg-default border-t border-default lg:grid-cols-3">
      <div
        v-for="item in showcase.caseStudy"
        :key="item.label"
        class="bg-white p-4 dark:bg-neutral-950"
      >
        <div class="mb-2 flex items-center gap-2 text-xs font-medium text-muted">
          <UIcon
            :name="item.icon"
            class="size-4 text-primary"
          />
          {{ item.label }}
        </div>
        <p class="text-sm leading-6 text-highlighted">
          {{ item.value }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const defaultLines = ['92%', '78%', '64%', '88%']

interface SkillShowcase {
  title: string
  subtitle: string
  deliverable: string
  icon: string
  panel: string
  mode: string
  lines: string[]
  spec: Array<{ label: string, value: string }>
  caseStudy: Array<{ label: string, value: string, icon: string }>
}

const genericCaseStudy = {
  input: '给出目标、上下文、文件或链接，并说明最终交付格式。',
  output: '交付可复查文件、结构化结论或截图记录。',
  gate: '用命令、渲染、截图或来源证据确认结果可用。'
}

const caseStudy = (input: string, output: string, gate: string) => [
  { label: '示例输入', value: input || genericCaseStudy.input, icon: 'i-lucide-log-in' },
  { label: '可交付结果', value: output || genericCaseStudy.output, icon: 'i-lucide-package-check' },
  { label: '验收方式', value: gate || genericCaseStudy.gate, icon: 'i-lucide-check-check' }
]

const showcases: Record<string, SkillShowcase> = {
  '/gallery/paper-analyze': {
    title: 'Paper Analyze',
    subtitle: 'PDF 到结构化研究笔记',
    deliverable: 'Markdown + figures',
    icon: 'i-lucide-file-search',
    panel: 'bg-teal-500',
    mode: 'Research note',
    lines: defaultLines,
    spec: [
      { label: '输入', value: 'PDF、arXiv 链接、本地源码包' },
      { label: '输出', value: '贡献拆解、方法图、实验表、可信度判断' },
      { label: '适用场景', value: '论文精读、相关工作整理、复现前判断' }
    ],
    caseStudy: caseStudy('一篇 arXiv PDF 和源码包路径', 'Markdown 论文笔记、图表摘录、复现风险列表', '贡献、实验、局限和可信度判断必须有来源依据')
  },
  '/gallery/imagegen': {
    title: 'Image Generation',
    subtitle: '描述到网站视觉资产',
    deliverable: 'PNG / transparent asset',
    icon: 'i-lucide-image',
    panel: 'bg-rose-500',
    mode: 'Visual asset',
    lines: ['88%', '70%', '58%', '82%'],
    spec: [
      { label: '输入', value: '场景描述、品牌方向、参考图' },
      { label: '输出', value: '首图、缩略图、透明素材、风格变体' },
      { label: '适用场景', value: '文档首页、产品页、教程配图' }
    ],
    caseStudy: caseStudy('产品页首图描述、主色、参考构图', '多张 PNG 视觉资产和可复用 prompt', '检查主题一致性、可读性、尺寸和透明背景')
  },
  '/gallery/presentation': {
    title: 'Presentation Builder',
    subtitle: '提纲到可检查 PPTX',
    deliverable: 'PPTX + screenshots',
    icon: 'i-lucide-presentation',
    panel: 'bg-blue-500',
    mode: 'Slide deck',
    lines: ['90%', '74%', '68%', '80%'],
    spec: [
      { label: '输入', value: '论文、报告、提纲、模板要求' },
      { label: '输出', value: 'PPTX、逐页截图、版式检查记录' },
      { label: '适用场景', value: '组会、答辩、产品说明、技术分享' }
    ],
    caseStudy: caseStudy('论文 PDF、目标时长和模板风格', 'PPTX 文件、逐页截图、讲稿要点', '逐页检查标题层级、图表比例和文字密度')
  },
  '/gallery/spreadsheet': {
    title: 'Spreadsheet Analyst',
    subtitle: '表格到统计和图表',
    deliverable: 'XLSX / charts',
    icon: 'i-lucide-table-properties',
    panel: 'bg-emerald-500',
    mode: 'Data summary',
    lines: ['86%', '76%', '66%', '90%'],
    spec: [
      { label: '输入', value: 'CSV、XLSX、实验日志、指标表' },
      { label: '输出', value: '统计摘要、透视表、图表、结论' },
      { label: '适用场景', value: '实验结果分析、预算整理、对比表' }
    ],
    caseStudy: caseStudy('多组实验结果 CSV 和指标说明', '汇总表、对比图、异常点说明', '公式可复算，图表轴和单位清楚')
  },
  '/gallery/browser-visual-qa': {
    title: 'Browser Visual QA',
    subtitle: '真实浏览器视觉验收',
    deliverable: 'Screenshots + issues',
    icon: 'i-lucide-monitor-check',
    panel: 'bg-amber-500',
    mode: 'Visual QA',
    lines: ['84%', '68%', '56%', '86%'],
    spec: [
      { label: '输入', value: 'localhost URL、目标页面、视口尺寸' },
      { label: '输出', value: '桌面/移动截图、重叠和溢出问题' },
      { label: '适用场景', value: '网站复刻、前端改版、发布前验收' }
    ],
    caseStudy: caseStudy('本地页面 URL、桌面和移动视口', '截图、问题列表、修复后复查截图', '无 404、无文本溢出、暗色模式无亮底')
  },
  '/gallery/zotero-research': {
    title: 'Zotero Research',
    subtitle: '文献库到阅读线索',
    deliverable: 'Notes + collections',
    icon: 'i-lucide-library',
    panel: 'bg-cyan-500',
    mode: 'Library search',
    lines: ['90%', '82%', '62%', '74%'],
    spec: [
      { label: '输入', value: 'Zotero collection、关键词、标签' },
      { label: '输出', value: '条目列表、阅读笔记、标签整理建议' },
      { label: '适用场景', value: '本地文献检索、相关工作补全' }
    ],
    caseStudy: caseStudy('一个 Zotero collection 和研究关键词', '相关论文列表、阅读顺序、标签整理建议', '条目能在本地库中复查，笔记保留出处')
  },
  '/gallery/research-loop': {
    title: 'Research Loop',
    subtitle: '选题到审稿迭代',
    deliverable: 'Plan + review log',
    icon: 'i-lucide-orbit',
    panel: 'bg-indigo-500',
    mode: 'Iteration loop',
    lines: ['92%', '80%', '70%', '64%'],
    spec: [
      { label: '输入', value: '研究方向、初步想法、实验结果' },
      { label: '输出', value: '查新、风险评估、改进任务、复审记录' },
      { label: '适用场景', value: '论文选题、实验路线迭代、投稿前打磨' }
    ],
    caseStudy: caseStudy('一个研究 idea 和初步实验结果', '查新结论、风险清单、下一轮实验计划', '每轮改进有可执行任务和复审证据')
  },
  '/gallery/pdf-docs': {
    title: 'PDF and Docs',
    subtitle: '文档生成和渲染检查',
    deliverable: 'PDF / DOCX',
    icon: 'i-lucide-file-type',
    panel: 'bg-violet-500',
    mode: 'Document QA',
    lines: ['88%', '72%', '60%', '78%'],
    spec: [
      { label: '输入', value: 'PDF、DOCX、表单、排版要求' },
      { label: '输出', value: '可交付文档、页面截图、格式检查' },
      { label: '适用场景', value: '表单填写、报告生成、投稿附件检查' }
    ],
    caseStudy: caseStudy('一个 DOCX 表单或 PDF 报告要求', '修改后的文档、渲染截图、问题清单', '页面渲染无错位，字段和表格完整')
  },
  '/gallery/ops-debug': {
    title: 'Ops Debug',
    subtitle: '服务器和网络排查',
    deliverable: 'Diagnosis',
    icon: 'i-lucide-server-cog',
    panel: 'bg-slate-600',
    mode: 'Ops trace',
    lines: ['82%', '78%', '60%', '88%'],
    spec: [
      { label: '输入', value: '主机、端口、日志、systemd 状态' },
      { label: '输出', value: '当前状态、根因判断、最小修改建议' },
      { label: '适用场景', value: '代理、端口、远程服务和连通性排查' }
    ],
    caseStudy: caseStudy('远程主机、端口、服务名和错误日志', 'live state 摘要、根因、最小修改步骤', '配置读回、监听状态和客户端连通性一致')
  },
  '/gallery/latex-paper': {
    title: 'LaTeX Paper',
    subtitle: '源码到可验证 PDF',
    deliverable: 'PDF + compile log',
    icon: 'i-lucide-scroll-text',
    panel: 'bg-lime-600',
    mode: 'Paper build',
    lines: ['90%', '78%', '84%', '62%'],
    spec: [
      { label: '输入', value: 'TeX 源码、BibTeX、图片和模板文件' },
      { label: '输出', value: '编译 PDF、错误定位、缺失资源列表' },
      { label: '适用场景', value: '论文投稿前检查、模板迁移、diff PDF 验证' }
    ],
    caseStudy: caseStudy('LaTeX 工程目录和目标模板', '可编译 PDF、日志摘要、缺失资源清单', '编译退出码为 0，PDF 页数和引用正确')
  },
  '/gallery/diagram-canvas': {
    title: 'Diagram Canvas',
    subtitle: '结构描述到可编辑图示',
    deliverable: 'Canvas / SVG',
    icon: 'i-lucide-git-compare-arrows',
    panel: 'bg-fuchsia-500',
    mode: 'Diagram',
    lines: ['86%', '64%', '76%', '70%'],
    spec: [
      { label: '输入', value: '架构、流程、论文方法或模块关系' },
      { label: '输出', value: '可编辑节点图、流程图、展示用 SVG' },
      { label: '适用场景', value: '系统设计说明、研究路线图、PPT 插图' }
    ],
    caseStudy: caseStudy('系统模块和数据流描述', '可编辑 canvas、流程图或 SVG', '节点命名清楚，边方向和层级关系正确')
  },
  '/gallery/hatch-pet': {
    title: 'Hatch Pet',
    subtitle: '角色设定到动画资源包',
    deliverable: 'Atlas + pet.json',
    icon: 'i-lucide-sparkles',
    panel: 'bg-orange-500',
    mode: 'Sprite QA',
    lines: ['82%', '72%', '58%', '88%'],
    spec: [
      { label: '输入', value: '角色描述、品牌颜色、动作要求' },
      { label: '输出', value: '透明背景 atlas、动作预览、pet.json' },
      { label: '适用场景', value: 'Codex pet、品牌小助手、轻量动画素材' }
    ],
    caseStudy: caseStudy('角色设定、品牌色和动作表', '透明 atlas、contact sheet、pet.json', '每个动作帧对齐，透明区域和预览通过 QA')
  }
}

const defaultShowcase: SkillShowcase = {
  title: 'Skill',
  subtitle: '可复用能力结果预览',
  deliverable: 'Artifact',
  icon: 'i-lucide-box',
  panel: 'bg-primary',
  mode: 'Preview',
  lines: defaultLines,
  spec: [
    { label: '输入', value: '目标、上下文和文件' },
    { label: '输出', value: '可复查结果' },
    { label: '适用场景', value: '需要稳定流程和验收的任务' }
  ],
  caseStudy: caseStudy(genericCaseStudy.input, genericCaseStudy.output, genericCaseStudy.gate)
}
const showcase = computed<SkillShowcase>(() => showcases[route.path] || defaultShowcase)
</script>
