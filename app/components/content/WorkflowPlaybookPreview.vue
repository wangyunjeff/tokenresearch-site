<template>
  <div class="not-prose grid gap-4 md:grid-cols-2">
    <NuxtLink
      v-for="playbook in playbooks"
      :key="playbook.to"
      :to="playbook.to"
      class="group rounded-lg border border-default bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-sm dark:bg-neutral-950"
    >
      <div class="mb-4 flex items-start justify-between gap-4">
        <div class="flex items-start gap-3">
          <div class="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <UIcon
              :name="playbook.icon"
              class="size-5"
            />
          </div>
          <div>
            <h3 class="text-base font-semibold text-highlighted">
              {{ playbook.title }}
            </h3>
            <p class="mt-1 text-sm text-muted">
              {{ playbook.description }}
            </p>
          </div>
        </div>
        <UIcon
          name="i-lucide-arrow-up-right"
          class="mt-1 size-4 shrink-0 text-muted transition group-hover:text-primary"
        />
      </div>

      <div class="grid gap-2 text-xs">
        <div
          v-for="stage in playbook.stages"
          :key="stage.label"
          class="grid grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] items-center gap-3 rounded-md bg-neutral-50 px-3 py-2 dark:bg-neutral-900"
        >
          <span class="min-w-0 text-muted">{{ stage.label }}</span>
          <span class="min-w-0 text-right font-medium break-words text-highlighted">{{ stage.value }}</span>
        </div>
      </div>

      <div class="mt-4 flex flex-wrap gap-2">
        <UBadge
          v-for="tag in playbook.tags"
          :key="tag"
          color="neutral"
          variant="subtle"
        >
          {{ tag }}
        </UBadge>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const playbooks = [{
  title: '论文到汇报',
  description: '把论文精读、可信度判断和 PPTX 交付串成一条路线。',
  icon: 'i-lucide-file-chart-column',
  to: '/workflows/paper-to-slides',
  stages: [
    { label: '先读', value: 'Paper Analyze' },
    { label: '再做', value: 'Presentation Builder' },
    { label: '最后验', value: '截图和讲稿检查' }
  ],
  tags: ['论文', 'PPTX', '学术汇报']
}, {
  title: '视觉复刻',
  description: '从参考页面到本地截图，持续修正桌面、移动和暗色模式。',
  icon: 'i-lucide-monitor-dot',
  to: '/workflows/visual-replica',
  stages: [
    { label: '输入', value: '参考 URL / 截图' },
    { label: '执行', value: 'Nuxt UI + Playwright' },
    { label: '验收', value: '多视口截图对比' }
  ],
  tags: ['前端', '截图', '视觉 QA']
}, {
  title: '模型路由记录',
  description: '把快模型、深推理和长上下文的选择记录成可复用评测。',
  icon: 'i-lucide-route',
  to: '/workflows/model-routing',
  stages: [
    { label: '变量', value: '模型 / 推理等级' },
    { label: '记录', value: '任务、风险、结果' },
    { label: '沉淀', value: '评测页和路由表' }
  ],
  tags: ['评测', '路由', '成本控制']
}, {
  title: 'Skill 沉淀',
  description: '把反复成功的任务流程整理成 Skill 页面和 Gallery 示例。',
  icon: 'i-lucide-gallery-horizontal-end',
  to: '/workflows/skill-to-gallery',
  stages: [
    { label: '识别', value: '重复任务' },
    { label: '封装', value: 'Skill 指令' },
    { label: '展示', value: 'Gallery 结果页' }
  ],
  tags: ['Skill', 'Gallery', '复用']
}, {
  title: '运维现场排查',
  description: '以 live state 为准，读取服务、端口、日志和配置后再做最小修改。',
  icon: 'i-lucide-server-cog',
  to: '/workflows/ops-live-debug',
  stages: [
    { label: '读取', value: '服务 / 端口 / 日志' },
    { label: '判断', value: '配置和 live probe' },
    { label: '验收', value: '读回配置 + 连通性' }
  ],
  tags: ['Ops', '端口', 'live state']
}]
</script>
