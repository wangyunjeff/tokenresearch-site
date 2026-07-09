<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { header } = useAppConfig()
</script>

<template>
  <UHeader
    :ui="{ center: 'flex-1' }"
    :to="header?.to || '/'"
  >
    <UContentSearchButton
      v-if="header?.search"
      label="搜索..."
      :kbds="['Ctrl', 'K']"
      :collapsed="false"
      class="w-full"
    />

    <template
      v-if="header?.logo?.dark || header?.logo?.light || header?.title"
      #title
    >
      <span
        class="flex items-center gap-2 text-highlighted font-bold text-base whitespace-nowrap sm:text-lg"
      >
        <UColorModeImage
          v-if="header?.logo?.dark || header?.logo?.light"
          :light="header?.logo?.light!"
          :dark="header?.logo?.dark!"
          :alt="header?.logo?.alt"
          class="h-6 w-auto shrink-0"
        />

        <AppLogo
          v-else
          class="size-6 shrink-0"
        />

        <span
          v-if="header?.title"
          class="truncate"
        >
          {{ header.title }}
        </span>
      </span>
    </template>

    <template
      v-else
      #left
    >
      <NuxtLink :to="header?.to || '/'">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>

      <TemplateMenu />
    </template>

    <template #right>
      <UContentSearchButton
        v-if="header?.search"
        label="搜索..."
        :kbds="['Ctrl', 'K']"
        class="lg:hidden"
      />

      <ClientOnly>
        <UColorModeButton v-if="header?.colorMode" />
        <template #fallback>
          <UButton
            v-if="header?.colorMode"
            icon="i-lucide-sun"
            color="neutral"
            variant="ghost"
            square
            aria-label="切换颜色模式"
          />
        </template>
      </ClientOnly>

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <template #body>
      <UContentNavigation
        highlight
        :navigation="navigation"
      />
    </template>
  </UHeader>
</template>
