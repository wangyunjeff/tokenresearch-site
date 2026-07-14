<template>
  <div class="not-prose my-8 space-y-6">
    <div class="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.55fr)] lg:items-end">
      <div>
        <UBadge
          color="primary"
          variant="subtle"
          class="mb-4"
        >
          模型价格
        </UBadge>
        <h2 class="text-3xl font-bold tracking-normal text-highlighted sm:text-4xl">
          主流模型价格
        </h2>
        <p class="mt-3 max-w-2xl text-base text-muted">
          常用模型按本站人民币成本展示，单位统一为每 1M tokens。新的模型会继续补到对应分组。
        </p>
      </div>

      <div class="rounded-lg border border-primary/20 bg-primary/5 p-4 dark:bg-primary/10">
        <div class="flex items-center gap-3">
          <span class="rounded-md bg-white px-2.5 py-1 text-sm font-semibold text-primary shadow-sm dark:bg-neutral-950">
            缓存命中
          </span>
          <span class="text-3xl font-bold text-highlighted">90%+</span>
        </div>
        <p class="mt-2 text-sm leading-6 text-muted">
          长上下文和连续任务会优先复用缓存，命中后输入成本明显下降。
        </p>
      </div>
    </div>

    <div class="grid gap-5 xl:grid-cols-3">
      <section
        v-for="group in visibleGroups"
        :key="group.name"
        class="space-y-3"
      >
        <div class="rounded-lg border border-default bg-white p-4 dark:bg-neutral-950">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs font-semibold uppercase text-muted">
                {{ group.label }}
              </p>
              <h3 class="mt-2 text-2xl font-bold text-highlighted">
                {{ group.name }}
              </h3>
            </div>
            <div class="flex flex-col items-end gap-2">
              <UBadge
                color="neutral"
                variant="subtle"
              >
                RMB / 1M tokens
              </UBadge>
              <UBadge
                :color="group.badgeColor"
                variant="subtle"
              >
                {{ group.discount }}
              </UBadge>
            </div>
          </div>
        </div>

        <article
          v-for="model in group.models"
          :key="model.name"
          class="rounded-lg border border-default bg-white p-4 shadow-sm dark:bg-neutral-950"
        >
          <div class="flex items-start justify-between gap-3">
            <h4 class="text-lg font-semibold text-highlighted">
              {{ model.name }}
            </h4>
            <UBadge
              v-if="model.tag"
              color="neutral"
              variant="subtle"
              size="sm"
            >
              {{ model.tag }}
            </UBadge>
          </div>

          <div class="mt-4 grid gap-2 sm:grid-cols-3">
            <div
              v-for="price in model.prices"
              :key="price.label"
              class="min-h-20 rounded-md border border-default bg-neutral-50 p-3 dark:bg-neutral-900"
              :class="price.highlight ? 'border-primary/30 bg-primary/5 dark:bg-primary/10' : ''"
            >
              <div class="text-xs font-medium text-muted">
                {{ price.label }}
              </div>
              <div
                v-if="price.old"
                class="mt-1 text-xs font-semibold text-muted line-through"
              >
                {{ price.old }}
              </div>
              <div class="mt-1 text-xl font-bold text-highlighted">
                {{ price.value }}
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>

    <div
      v-if="compact"
      class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-default bg-white p-4 dark:bg-neutral-950"
    >
      <p class="text-sm text-muted">
        查看完整分组、全部模型和价格说明。
      </p>
      <UButton
        to="/models/market"
        trailing-icon="i-lucide-arrow-right"
      >
        打开模型广场
      </UButton>
    </div>

    <div
      v-else
      class="space-y-3 text-sm leading-6 text-muted"
    >
      <p>
        美元官方价按 1 USD = 7 RMB 换算后对比；本站支持缓存命中，常见长上下文场景缓存命中率可达 90% 以上。实际消耗、倍率、套餐与可用模型以控制台显示为准。
      </p>
      <NuxtLink
        to="#价格与可用性说明"
        class="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
      >
        为什么这么便宜、会不会缩水？查看价格与可用性说明
        <UIcon
          name="i-lucide-arrow-down"
          class="size-4"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
type BadgeColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'

interface PriceItem {
  label: string
  value: string
  old?: string
  highlight?: boolean
}

interface ModelItem {
  name: string
  tag?: string
  prices: PriceItem[]
}

interface ProviderGroup {
  name: string
  label: string
  discount: string
  badgeColor: BadgeColor
  models: ModelItem[]
}

const route = useRoute()
const compact = computed(() => route.path === '/')

const groups: ProviderGroup[] = [{
  name: 'DeepSeek',
  label: '国产锚点',
  discount: '官方锚点',
  badgeColor: 'neutral',
  models: [{
    name: 'DeepSeek v4-pro',
    prices: [
      { label: '缓存命中', value: '¥0.025', highlight: true },
      { label: '普通输入', value: '¥3' },
      { label: '输出', value: '¥6' }
    ]
  }, {
    name: 'DeepSeek v4-flash',
    prices: [
      { label: '缓存命中', value: '¥0.02', highlight: true },
      { label: '普通输入', value: '¥1' },
      { label: '输出', value: '¥2' }
    ]
  }]
}, {
  name: 'OpenAI',
  label: 'Codex / GPT',
  discount: '约 0.3 折',
  badgeColor: 'primary',
  models: [{
    name: 'GPT-5.5',
    prices: [
      { label: '缓存命中', value: '¥0.10', old: '¥0.50', highlight: true },
      { label: '普通输入', value: '¥1.00', old: '¥5' },
      { label: '输出', value: '¥6.00', old: '¥30' }
    ]
  }, {
    name: 'GPT-5.4',
    prices: [
      { label: '缓存命中', value: '¥0.05', old: '¥0.25', highlight: true },
      { label: '普通输入', value: '¥0.50', old: '¥2.50' },
      { label: '输出', value: '¥3.00', old: '¥15' }
    ]
  }, {
    name: 'GPT-5.4 mini',
    prices: [
      { label: '缓存命中', value: '¥0.015', old: '¥0.075', highlight: true },
      { label: '普通输入', value: '¥0.15', old: '¥0.75' },
      { label: '输出', value: '¥0.90', old: '¥4.50' }
    ]
  }]
}, {
  name: 'Anthropic',
  label: 'Claude',
  discount: '约 1.4 折',
  badgeColor: 'info',
  models: [{
    name: 'Claude Opus 4.8',
    prices: [
      { label: '缓存命中', value: '¥0.50', old: '¥0.50', highlight: true },
      { label: '普通输入', value: '¥5.00', old: '¥5' },
      { label: '输出', value: '¥25.00', old: '¥25' }
    ]
  }, {
    name: 'Claude Opus 4.7',
    prices: [
      { label: '缓存命中', value: '¥0.50', old: '¥0.50', highlight: true },
      { label: '普通输入', value: '¥5.00', old: '¥5' },
      { label: '输出', value: '¥25.00', old: '¥25' }
    ]
  }, {
    name: 'Claude Sonnet 4.6',
    prices: [
      { label: '缓存命中', value: '¥0.30', old: '¥0.30', highlight: true },
      { label: '普通输入', value: '¥3.00', old: '¥3' },
      { label: '输出', value: '¥15.00', old: '¥15' }
    ]
  }]
}]

const visibleGroups = computed(() => {
  if (!compact.value) {
    return groups
  }

  return groups.map(group => ({
    ...group,
    models: group.models.slice(0, 1)
  }))
})
</script>
