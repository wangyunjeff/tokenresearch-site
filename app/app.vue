<script setup lang="ts">
import { zh_cn } from '@nuxt/ui/locale'

const { seo } = useAppConfig()

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false
})

const uiLocale = {
  ...zh_cn,
  messages: {
    ...zh_cn.messages,
    contentSearch: {
      ...zh_cn.messages.contentSearch,
      title: '搜索文档',
      description: '输入关键词后选择页面，或切换浅色和深色主题。'
    }
  }
}

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'zh-CN'
  }
})

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  twitterCard: 'summary_large_image'
})

provide('navigation', navigation)
</script>

<template>
  <UApp :locale="uiLocale">
    <NuxtLoadingIndicator />

    <AppHeader />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        title="搜索文档"
        description="输入关键词后选择页面，或切换浅色和深色主题。"
        placeholder="搜索页面或输入关键词..."
      />
    </ClientOnly>
  </UApp>
</template>
