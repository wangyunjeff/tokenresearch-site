<template>
  <UDropdownMenu
    v-slot="{ open }"
    :modal="false"
    :items="[{
      label: '快速开始',
      to: '/start'
    }, {
      label: '基础教程',
      to: '/tutorials'
    }, {
      label: 'Codex 文档',
      to: '/codex',
      color: 'primary',
      checked: true,
      type: 'checkbox'
    }, {
      label: '模型评测',
      to: '/models'
    }, {
      label: '场景路线',
      to: '/workflows'
    }, {
      label: 'Skill Gallery',
      to: '/gallery'
    }]"
    :content="{ align: 'start' }"
    :ui="{ content: 'min-w-fit' }"
    size="xs"
  >
    <UButton
      label="Docs"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      size="xs"
      class="-mb-[6px] font-semibold rounded-full truncate"
      :class="[open && 'bg-primary/15']"
      :ui="{
        trailingIcon: ['transition-transform duration-200', open ? 'rotate-180' : undefined].filter(Boolean).join(' ')
      }"
    />
  </UDropdownMenu>
</template>
