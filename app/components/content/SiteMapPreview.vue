<template>
  <div class="relative overflow-hidden rounded-lg border border-default bg-white shadow-sm dark:bg-neutral-950">
    <div class="grid grid-cols-3 gap-px bg-default">
      <div
        v-for="section in sections"
        :key="section.title"
        class="bg-white p-3 dark:bg-neutral-950 sm:p-5"
      >
        <div class="flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <UIcon
              :name="section.icon"
              class="size-5 shrink-0"
              :class="section.color"
            />
            <span class="text-xs font-semibold leading-5 text-highlighted sm:text-sm">{{ section.title }}</span>
          </div>
          <UBadge
            color="neutral"
            variant="subtle"
            size="sm"
            class="hidden sm:inline-flex"
          >
            {{ section.count }}
          </UBadge>
        </div>

        <div class="hidden space-y-2 sm:block">
          <div
            v-for="item in section.items"
            :key="item"
            class="flex items-center gap-2 rounded-md bg-neutral-50 px-3 py-2 text-sm text-muted dark:bg-neutral-900/70"
          >
            <span
              class="size-1.5 rounded-full"
              :class="section.dot"
            />
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sections = [{
  title: '基础教程',
  icon: 'i-lucide-route',
  count: 'Guide',
  color: 'text-primary',
  dot: 'bg-primary',
  items: ['环境准备', '配置文件', 'Agent 规则', '视觉验收']
}, {
  title: '模型评测',
  icon: 'i-lucide-chart-no-axes-combined',
  count: 'Eval',
  color: 'text-blue-500',
  dot: 'bg-blue-500',
  items: ['任务矩阵', '推理等级', '上下文策略', '路由建议']
}, {
  title: 'Skill Gallery',
  icon: 'i-lucide-gallery-horizontal-end',
  count: 'Showcase',
  color: 'text-amber-500',
  dot: 'bg-amber-500',
  items: ['论文分析', 'PPT 生成', '视觉 QA', '研究循环']
}]
</script>
