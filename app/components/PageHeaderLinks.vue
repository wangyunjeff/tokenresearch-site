<script setup lang="ts">
const route = useRoute()
const toast = useToast()
const site = useSiteConfig()
const requestURL = useRequestURL()
const copied = ref(false)

const feedback = ref<{
  title: string
  description?: string
  icon: string
  tone: 'success' | 'error'
} | null>(null)
let feedbackTimer: ReturnType<typeof setTimeout> | undefined
let copiedTimer: ReturnType<typeof setTimeout> | undefined

const origin = computed(() => site.url || requestURL.origin)
const mdPath = computed(() => `${origin.value}/raw${route.path}.md`)
const copyButtonSelector = '[data-copy-page-action]'

function markCopied() {
  if (copiedTimer) {
    clearTimeout(copiedTimer)
  }

  copied.value = true
  copiedTimer = setTimeout(() => {
    copied.value = false
  }, 1800)
}

function showFeedback(
  title: string,
  icon = 'i-lucide-check-circle',
  tone: 'success' | 'error' = 'success',
  description?: string
) {
  if (feedbackTimer) {
    clearTimeout(feedbackTimer)
  }

  feedback.value = {
    title,
    description,
    icon,
    tone
  }
  feedbackTimer = setTimeout(() => {
    feedback.value = null
  }, 3200)
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    void navigator.clipboard.writeText(text)
    return true
  }

  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.setAttribute('readonly', '')
  textArea.style.position = 'fixed'
  textArea.style.top = '0'
  textArea.style.left = '-9999px'
  document.body.appendChild(textArea)

  const selection = document.getSelection()
  const selectedRange = selection?.rangeCount ? selection.getRangeAt(0) : null

  textArea.select()
  textArea.setSelectionRange(0, textArea.value.length)

  let copiedText = false
  try {
    copiedText = document.execCommand('copy')
  } catch {
    copiedText = false
  }

  document.body.removeChild(textArea)

  if (selection && selectedRange) {
    selection.removeAllRanges()
    selection.addRange(selectedRange)
  }

  return copiedText
}

async function copyMarkdownLink() {
  if (!await copyText(mdPath.value)) {
    throw new Error('clipboard unavailable')
  }

  markCopied()
  toast.add({
    title: '已复制到剪贴板',
    icon: 'i-lucide-check-circle'
  })
  showFeedback('已复制到剪贴板')
}

const items = [
  {
    label: '复制 Markdown 链接',
    icon: 'i-lucide-link',
    onSelect() {
      void copyMarkdownLink().catch(() => {
        toast.add({
          title: '复制失败',
          description: '当前浏览器没有开放剪贴板写入。',
          icon: 'i-lucide-circle-alert',
          color: 'error'
        })
        showFeedback('复制失败', 'i-lucide-circle-alert', 'error', '当前浏览器没有开放剪贴板写入。')
      })
    }
  },
  {
    label: '以 Markdown 打开',
    icon: 'i-simple-icons-markdown',
    target: '_blank',
    to: `/raw${route.path}.md`
  },
  {
    label: '在 ChatGPT 中打开',
    icon: 'i-simple-icons-openai',
    target: '_blank',
    to: `https://chatgpt.com/?hints=search&q=${encodeURIComponent(`Read ${mdPath.value} so I can ask questions about it.`)}`
  },
  {
    label: '在 Claude 中打开',
    icon: 'i-simple-icons-anthropic',
    target: '_blank',
    to: `https://claude.ai/new?q=${encodeURIComponent(`Read ${mdPath.value} so I can ask questions about it.`)}`
  }
]

async function copyPage() {
  try {
    const markdown = await $fetch<string>(`/raw${route.path}.md`)
    if (!await copyText(markdown)) {
      throw new Error('clipboard unavailable')
    }

    markCopied()
    toast.add({
      title: '页面 Markdown 已复制',
      icon: 'i-lucide-check-circle'
    })
    showFeedback('页面 Markdown 已复制')
  } catch {
    toast.add({
      title: '复制失败',
      description: '无法读取当前页面 Markdown。',
      icon: 'i-lucide-circle-alert',
      color: 'error'
    })
    showFeedback('复制失败', 'i-lucide-circle-alert', 'error', '无法读取当前页面 Markdown。')
  }
}

function onDelegatedCopyClick(event: MouseEvent) {
  const target = event.target instanceof Element
    ? event.target.closest(copyButtonSelector)
    : null

  if (!target) {
    return
  }

  event.preventDefault()
  void copyPage()
}

onMounted(() => {
  document.addEventListener('click', onDelegatedCopyClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDelegatedCopyClick)
})
</script>

<template>
  <div class="inline-flex">
    <button
      type="button"
      data-copy-page-action
      class="inline-flex items-center gap-1.5 rounded-s-md border border-default bg-default px-2.5 py-1.5 text-sm font-medium text-default transition-colors hover:bg-elevated active:bg-elevated focus-visible:z-[1] focus-visible:outline-3 focus-visible:outline-inverted/25"
    >
      <UIcon
        :name="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
        class="size-3.5 shrink-0"
        :class="copied ? 'text-primary' : 'text-muted'"
      />
      <span>复制页面</span>
    </button>
    <UDropdownMenu
      :items="items"
      :content="{
        align: 'end',
        side: 'bottom',
        sideOffset: 8
      }"
      :ui="{
        content: 'w-48'
      }"
    >
      <UButton
        icon="i-lucide-chevron-down"
        size="sm"
        color="neutral"
        variant="outline"
        class="rounded-s-none border-s-0"
        aria-label="打开复制操作菜单"
      />
    </UDropdownMenu>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <div
        v-if="feedback"
        role="status"
        aria-live="polite"
        class="fixed right-4 bottom-4 z-[110] flex w-[calc(100%-2rem)] max-w-sm items-start gap-3 rounded-lg border border-default bg-default px-4 py-3 text-sm shadow-lg"
      >
        <UIcon
          :name="feedback.icon"
          class="mt-0.5 size-5 shrink-0"
          :class="feedback.tone === 'error' ? 'text-error' : 'text-primary'"
        />
        <div class="min-w-0">
          <p class="font-medium text-highlighted">
            {{ feedback.title }}
          </p>
          <p
            v-if="feedback.description"
            class="mt-0.5 text-muted"
          >
            {{ feedback.description }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>
