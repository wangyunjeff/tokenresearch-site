<template>
  <div class="not-prose my-8 space-y-4">
    <div class="grid gap-4 lg:grid-cols-4">
      <div
        v-for="scenario in scenarios"
        :key="scenario.title"
        class="rounded-lg border border-default bg-white p-4 dark:bg-neutral-950"
      >
        <div class="mb-3 flex items-center justify-between gap-3">
          <UIcon
            :name="scenario.icon"
            class="size-5 text-primary"
          />
          <UBadge
            :color="scenario.color"
            variant="subtle"
          >
            {{ scenario.route }}
          </UBadge>
        </div>
        <h3 class="text-base font-semibold text-highlighted">
          {{ scenario.title }}
        </h3>
        <p class="mt-2 min-h-12 text-sm text-muted">
          {{ scenario.description }}
        </p>
        <div class="mt-4 grid gap-2 text-xs">
          <div class="flex items-center justify-between rounded-md bg-neutral-50 px-2 py-1.5 dark:bg-neutral-900">
            <span class="text-muted">检查</span>
            <span class="font-medium text-highlighted">{{ scenario.gate }}</span>
          </div>
          <div class="flex items-center justify-between rounded-md bg-neutral-50 px-2 py-1.5 dark:bg-neutral-900">
            <span class="text-muted">风险</span>
            <span class="font-medium text-highlighted">{{ scenario.risk }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="overflow-hidden rounded-lg border border-default bg-white dark:bg-neutral-950">
      <div class="border-b border-default px-4 py-3">
        <h3 class="text-base font-semibold text-highlighted">
          Evaluation matrix
        </h3>
        <p class="mt-1 text-sm text-muted">
          每次评测只改变一个变量：模型、推理等级、上下文长度或工具权限。
        </p>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-neutral-50 text-left text-muted dark:bg-neutral-900">
            <tr>
              <th class="px-4 py-3 font-medium">
                任务
              </th>
              <th class="px-4 py-3 font-medium">
                Fast
              </th>
              <th class="px-4 py-3 font-medium">
                Deep
              </th>
              <th class="px-4 py-3 font-medium">
                Max
              </th>
              <th class="px-4 py-3 font-medium">
                必验收
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-default">
            <tr
              v-for="row in rows"
              :key="row.task"
            >
              <td class="px-4 py-3 font-medium text-highlighted">
                {{ row.task }}
              </td>
              <td class="px-4 py-3 text-muted">
                {{ row.fast }}
              </td>
              <td class="px-4 py-3 text-muted">
                {{ row.deep }}
              </td>
              <td class="px-4 py-3 text-muted">
                {{ row.max }}
              </td>
              <td class="px-4 py-3 text-muted">
                {{ row.gate }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type BadgeColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'

const scenarios: Array<{
  title: string
  description: string
  icon: string
  route: string
  color: BadgeColor
  gate: string
  risk: string
}> = [{
  title: 'Repo surgery',
  description: '跨文件修复、重构、测试和回归验证。',
  icon: 'i-lucide-git-branch',
  route: 'Deep',
  color: 'info',
  gate: 'lint + tests',
  risk: '改错边界'
}, {
  title: 'Frontend visual',
  description: '根据截图检查布局、响应式和暗色模式。',
  icon: 'i-lucide-monitor-check',
  route: 'Deep / Max',
  color: 'warning',
  gate: 'screenshots',
  risk: '视觉误判'
}, {
  title: 'Research writing',
  description: '论文、查新、审稿意见和长文档改进。',
  icon: 'i-lucide-scroll-text',
  route: 'Max',
  color: 'warning',
  gate: 'evidence',
  risk: '证据不足'
}, {
  title: 'Ops diagnosis',
  description: '服务器端口、代理、日志和远程状态排查。',
  icon: 'i-lucide-server-cog',
  route: 'Deep',
  color: 'primary',
  gate: 'live probe',
  risk: '状态漂移'
}]

const rows = [{
  task: '一页文档修改',
  fast: '推荐',
  deep: '可用但偏重',
  max: '不建议',
  gate: '页面 200 + 文本正确'
}, {
  task: '多文件代码修复',
  fast: '只做定位',
  deep: '推荐',
  max: '疑难时使用',
  gate: '测试和构建'
}, {
  task: '视觉复刻',
  fast: '不建议',
  deep: '推荐',
  max: '复杂交互使用',
  gate: '桌面/移动/暗色截图'
}, {
  task: '论文与研究路线',
  fast: '摘要可用',
  deep: '结构化分析',
  max: '推荐',
  gate: '引用、证据、反例'
}, {
  task: '服务器网络排查',
  fast: '命令解释',
  deep: '推荐',
  max: '长程迁移使用',
  gate: '真实主机读回'
}]
</script>
