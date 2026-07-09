<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const displayError = computed(() => ({
  ...props.error,
  statusMessage: props.error.statusCode === 404 ? '页面未找到' : '服务错误',
  message: props.error.statusCode === 404 ? '这个页面不存在或已经移动。' : props.error.message
}))

useHead({
  htmlAttrs: {
    lang: 'zh-CN'
  }
})

useSeoMeta({
  title: '页面未找到',
  description: '这个页面不存在或已经移动。'
})

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false
})

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <AppHeader />

    <UError :error="displayError" />

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </UApp>
</template>
