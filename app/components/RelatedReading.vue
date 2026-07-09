<template>
  <div
    v-if="links.length"
    class="not-prose my-10 rounded-lg border border-default bg-white p-5 dark:bg-neutral-950"
  >
    <div class="mb-4 flex items-center justify-between gap-4">
      <div>
        <h2 class="text-base font-semibold text-highlighted">
          继续阅读
        </h2>
        <p class="mt-1 text-sm text-muted">
          按当前页面继续跳到相关教程、评测、路线或 Gallery 示例。
        </p>
      </div>
      <UIcon
        name="i-lucide-arrow-right"
        class="hidden size-5 text-muted sm:block"
      />
    </div>

    <div class="grid gap-3 sm:grid-cols-2">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="group flex items-start gap-3 rounded-md border border-default bg-neutral-50 p-3 transition hover:border-primary hover:bg-primary/5 dark:bg-neutral-900/70"
      >
        <div class="flex size-8 shrink-0 items-center justify-center rounded-md bg-white text-primary dark:bg-neutral-950">
          <UIcon
            :name="link.icon"
            class="size-4"
          />
        </div>
        <div>
          <div class="text-sm font-semibold text-highlighted group-hover:text-primary">
            {{ link.label }}
          </div>
          <div class="mt-1 text-xs text-muted">
            {{ link.description }}
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface RelatedLink {
  label: string
  description: string
  icon: string
  to: string
}

const route = useRoute()

const defaults: RelatedLink[] = [
  {
    label: '教程路线图',
    description: '从环境准备到视觉验收的基础路径。',
    icon: 'i-lucide-route',
    to: '/tutorials'
  },
  {
    label: '模型评测总览',
    description: '按任务选择模型、推理等级和上下文策略。',
    icon: 'i-lucide-chart-no-axes-combined',
    to: '/models'
  },
  {
    label: 'Skill Gallery',
    description: '查看每个 Skill 的输入、场景和结果预览。',
    icon: 'i-lucide-gallery-horizontal-end',
    to: '/gallery'
  },
  {
    label: '场景路线',
    description: '把教程、评测和 Gallery 串成可执行流程。',
    icon: 'i-lucide-map',
    to: '/workflows'
  }
]

const sectionLinks: Record<string, RelatedLink[]> = {
  '/start': [
    defaults[0]!,
    { label: '环境准备', description: '确认 Node.js、Git、pnpm 和代理。', icon: 'i-lucide-terminal', to: '/tutorials/environment' },
    { label: 'Codex 配置', description: '保留的复刻基线页面。', icon: 'i-lucide-bot', to: '/codex/model' },
    defaults[3]!
  ],
  '/tutorials': [
    { label: 'Codex 首次运行', description: '确认工作目录、模型和权限。', icon: 'i-lucide-terminal', to: '/tutorials/codex-first-run' },
    { label: '视觉验收', description: '用真实浏览器截图检查页面。', icon: 'i-lucide-monitor-check', to: '/tutorials/visual-review' },
    defaults[1]!,
    defaults[3]!
  ],
  '/codex': [
    { label: 'Codex 模型测试', description: '用最小请求和真实任务验证模型。', icon: 'i-lucide-boxes', to: '/codex/model-test' },
    { label: '网络与代理', description: '统一终端、IDE 和 API 的连通性。', icon: 'i-lucide-globe', to: '/codex/network-proxy' },
    defaults[1]!,
    defaults[3]!
  ],
  '/models': [
    { label: '评测记录模板', description: '统一记录模型、推理等级和结果。', icon: 'i-lucide-clipboard-list', to: '/models/eval-template' },
    { label: '样例评测记录', description: '查看填好的前端、研究和运维样例。', icon: 'i-lucide-clipboard-check', to: '/models/sample-records' },
    defaults[3]!,
    defaults[2]!
  ],
  '/gallery': [
    { label: 'Browser Visual QA', description: '真实浏览器截图和视觉回归检查。', icon: 'i-lucide-monitor-check', to: '/gallery/browser-visual-qa' },
    { label: 'Paper Analyze', description: '论文到结构化图文笔记。', icon: 'i-lucide-file-search', to: '/gallery/paper-analyze' },
    defaults[3]!,
    { label: 'Skills 推荐', description: '把高频流程沉淀成可复用 Skill。', icon: 'i-lucide-book-open-check', to: '/skills-mcp/skills' }
  ],
  '/workflows': [
    defaults[0]!,
    defaults[1]!,
    defaults[2]!,
    { label: 'Skills 与 MCP', description: '配置可复用能力和浏览器检查工具。', icon: 'i-lucide-plug', to: '/skills-mcp' }
  ],
  '/opencode': [
    defaults[1]!,
    { label: '配置模型', description: '按项目验证 OpenCode 模型服务。', icon: 'i-lucide-code-xml', to: '/opencode/model' },
    defaults[3]!,
    { label: '通用问题', description: '常见模型、代理和目录问题。', icon: 'i-lucide-circle-help', to: '/faq' }
  ],
  '/claude-code': [
    defaults[1]!,
    { label: '模型配置', description: '按任务复杂度选择模型和预算。', icon: 'i-lucide-sparkles', to: '/claude-code/model' },
    defaults[3]!,
    { label: 'Skills 与 MCP', description: '复用工具知识和检查流程。', icon: 'i-lucide-plug', to: '/skills-mcp' }
  ],
  '/faq': [
    defaults[0]!,
    defaults[1]!,
    defaults[2]!,
    { label: 'Skills 与 MCP', description: '把常见流程写成可复用能力。', icon: 'i-lucide-plug', to: '/skills-mcp' }
  ],
  '/skills-mcp': [
    { label: 'Skills 推荐', description: '什么时候应该沉淀成 Skill。', icon: 'i-lucide-book-open-check', to: '/skills-mcp/skills' },
    { label: 'Chrome DevTools MCP', description: '真实浏览器调试和截图检查。', icon: 'i-simple-icons-googlechrome', to: '/skills-mcp/chrome-devtools-mcp' },
    defaults[2]!,
    defaults[3]!
  ]
}

const links = computed(() => {
  const key = Object.keys(sectionLinks)
    .sort((a, b) => b.length - a.length)
    .find(prefix => route.path === prefix || route.path.startsWith(`${prefix}/`))

  return (key ? sectionLinks[key] || defaults : defaults)
    .filter((link): link is RelatedLink => Boolean(link) && link.to !== route.path)
    .slice(0, 4)
})
</script>
