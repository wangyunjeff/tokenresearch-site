<template>
  <div class="grid gap-4 lg:grid-cols-3">
    <div
      v-for="model in models"
      :key="model.name"
      class="rounded-lg border border-default bg-white p-5 dark:bg-neutral-950"
    >
      <div class="mb-4 flex items-start justify-between gap-3">
        <div>
          <div class="text-base font-semibold text-highlighted">
            {{ model.name }}
          </div>
          <div class="text-sm text-muted">
            {{ model.fit }}
          </div>
        </div>
        <UBadge
          :color="model.color"
          variant="subtle"
        >
          {{ model.mode }}
        </UBadge>
      </div>

      <div class="space-y-3">
        <div
          v-for="score in model.scores"
          :key="score.label"
        >
          <div class="mb-1 flex justify-between text-xs text-muted">
            <span>{{ score.label }}</span>
            <span>{{ score.value }}/5</span>
          </div>
          <div class="h-2 rounded-full bg-neutral-100 dark:bg-neutral-800">
            <div
              class="h-2 rounded-full"
              :class="model.bar"
              :style="{ width: `${score.value * 20}%` }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type BadgeColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'

const models: Array<{
  name: string
  fit: string
  mode: string
  color: BadgeColor
  bar: string
  scores: Array<{ label: string, value: number }>
}> = [{
  name: 'Fast 路由',
  fit: '日常编辑、说明、轻量代码修改',
  mode: 'low / medium',
  color: 'primary',
  bar: 'bg-primary',
  scores: [
    { label: '响应速度', value: 5 },
    { label: '代码准确', value: 3 },
    { label: '成本控制', value: 5 }
  ]
}, {
  name: 'Deep 路由',
  fit: '跨文件重构、复杂 Bug、架构判断',
  mode: 'high',
  color: 'info',
  bar: 'bg-blue-500',
  scores: [
    { label: '推理深度', value: 4 },
    { label: '代码准确', value: 4 },
    { label: '上下文稳定', value: 4 }
  ]
}, {
  name: 'Max 路由',
  fit: '论文、长程任务、多轮验证',
  mode: 'xhigh',
  color: 'warning',
  bar: 'bg-amber-500',
  scores: [
    { label: '推理深度', value: 5 },
    { label: '验证能力', value: 5 },
    { label: '响应速度', value: 2 }
  ]
}]
</script>
