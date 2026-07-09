<template>
  <div class="space-y-8">
    <section
      v-for="group in groupedSkills"
      :key="group.slug"
    >
      <div class="mb-4 flex items-end justify-between gap-4">
        <div class="flex items-start gap-3">
          <div class="mt-1 flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
            <UIcon
              :name="group.icon"
              class="size-5"
            />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-highlighted">
              {{ group.title }}
            </h3>
            <p class="mt-1 text-sm text-muted">
              {{ group.description }}
            </p>
          </div>
        </div>
        <UBadge
          color="neutral"
          variant="subtle"
          class="shrink-0"
        >
          {{ group.skills.length }} examples
        </UBadge>
      </div>

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="skill in group.skills"
          :key="skill.to"
          :to="skill.to"
          class="group rounded-lg border border-default bg-white p-4 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-sm dark:bg-neutral-950"
        >
          <div
            class="mb-4 overflow-hidden rounded-md border border-default"
            :class="skill.panel"
          >
            <div class="flex items-center gap-1 border-b border-white/30 px-3 py-2">
              <span class="size-2 rounded-full bg-white/70" />
              <span class="size-2 rounded-full bg-white/50" />
              <span class="size-2 rounded-full bg-white/30" />
            </div>
            <div class="grid aspect-[16/9] grid-cols-5 gap-2 p-3">
              <div class="col-span-2 space-y-2">
                <div class="h-3 rounded bg-white/80" />
                <div class="h-3 w-4/5 rounded bg-white/60" />
                <div class="h-3 w-2/3 rounded bg-white/40" />
                <div class="mt-4 grid grid-cols-3 gap-1">
                  <div class="h-7 rounded bg-white/30" />
                  <div class="h-7 rounded bg-white/45" />
                  <div class="h-7 rounded bg-white/25" />
                </div>
              </div>
              <div class="col-span-3 rounded bg-white/25 p-2">
                <div class="grid h-full grid-cols-2 gap-2">
                  <div class="rounded bg-white/40" />
                  <div class="space-y-2">
                    <div class="h-4 rounded bg-white/70" />
                    <div class="h-4 rounded bg-white/50" />
                    <div class="h-10 rounded bg-white/35" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-start justify-between gap-3">
            <div>
              <div class="flex items-center gap-2 text-base font-semibold text-highlighted">
                <UIcon
                  :name="skill.icon"
                  class="size-4 text-primary"
                />
                {{ skill.title }}
              </div>
              <p class="mt-2 min-h-10 text-sm text-muted">
                {{ skill.description }}
              </p>
            </div>
            <UIcon
              name="i-lucide-arrow-up-right"
              class="mt-1 size-4 shrink-0 text-muted transition group-hover:text-primary"
            />
          </div>

          <div class="mt-4 grid gap-2 text-xs text-muted">
            <div class="grid grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)] items-center gap-2 rounded-md bg-neutral-50 px-2 py-1.5 dark:bg-neutral-900">
              <span class="min-w-0">输入</span>
              <span class="min-w-0 text-right font-medium break-words text-highlighted">{{ skill.input }}</span>
            </div>
            <div class="grid grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)] items-center gap-2 rounded-md bg-neutral-50 px-2 py-1.5 dark:bg-neutral-900">
              <span class="min-w-0">输出</span>
              <span class="min-w-0 text-right font-medium break-words text-highlighted">{{ skill.output }}</span>
            </div>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <UBadge
              v-for="tag in skill.tags"
              :key="tag"
              color="neutral"
              variant="subtle"
            >
              {{ tag }}
            </UBadge>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const compact = computed(() => route.path === '/')

const groups = [{
  slug: 'research',
  title: 'Research and Writing',
  description: '论文、文献库、idea 和自动评审相关的研究型能力。',
  icon: 'i-lucide-book-open-check'
}, {
  slug: 'artifact',
  title: 'Artifacts and Media',
  description: '图片、PPT、PDF、DOCX 和表格这类可交付文件。',
  icon: 'i-lucide-box'
}, {
  slug: 'engineering',
  title: 'Engineering QA',
  description: '浏览器视觉检查、服务器排查和工程现场验证。',
  icon: 'i-lucide-wrench'
}]

const skills = [{
  title: 'Paper Analyze',
  description: '从论文 PDF 到结构化笔记、图像提取和可信度判断。',
  icon: 'i-lucide-file-search',
  to: '/gallery/paper-analyze',
  panel: 'bg-teal-500',
  group: 'research',
  input: 'PDF / arXiv',
  output: '图文笔记',
  tags: ['论文', '图文笔记', 'Related Work']
}, {
  title: 'Presentation Builder',
  description: '把报告、论文或提纲转换成可检查的 PPTX 演示稿。',
  icon: 'i-lucide-presentation',
  to: '/gallery/presentation',
  panel: 'bg-blue-500',
  group: 'artifact',
  input: '提纲 / 论文',
  output: 'PPTX',
  tags: ['PPTX', '学术汇报', '视觉检查']
}, {
  title: 'Image Generation',
  description: '为网站、教程或产品页生成可用的视觉素材和变体。',
  icon: 'i-lucide-image',
  to: '/gallery/imagegen',
  panel: 'bg-rose-500',
  group: 'artifact',
  input: '描述 / 参考图',
  output: '视觉资产',
  tags: ['视觉资产', '缩略图', '风格变体']
}, {
  title: 'Browser Visual QA',
  description: '用真实浏览器截图检查布局、移动端和交互状态。',
  icon: 'i-lucide-monitor-check',
  to: '/gallery/browser-visual-qa',
  panel: 'bg-amber-500',
  group: 'engineering',
  input: 'URL / 截图',
  output: 'QA 报告',
  tags: ['Playwright', '截图', '回归检查']
}, {
  title: 'Research Loop',
  description: '把选题、查新、实验、审稿意见串成持续改进循环。',
  icon: 'i-lucide-orbit',
  to: '/gallery/research-loop',
  panel: 'bg-indigo-500',
  group: 'research',
  input: '方向 / 结果',
  output: '迭代计划',
  tags: ['研究', '查新', '自动评审']
}, {
  title: 'Spreadsheet Analyst',
  description: '读取实验表格，生成统计、图表和可追溯结论。',
  icon: 'i-lucide-table-properties',
  to: '/gallery/spreadsheet',
  panel: 'bg-emerald-500',
  group: 'artifact',
  input: 'CSV / XLSX',
  output: '统计图表',
  tags: ['XLSX', '结果分析', '图表']
}, {
  title: 'Zotero Research',
  description: '搜索本地文献库，整理条目、笔记、标签和阅读线索。',
  icon: 'i-lucide-library',
  to: '/gallery/zotero-research',
  panel: 'bg-cyan-500',
  group: 'research',
  input: '文献库',
  output: '阅读清单',
  tags: ['Zotero', '文献', '笔记']
}, {
  title: 'PDF and Docs',
  description: '读取、生成、渲染并检查 PDF、DOCX 等文档交付件。',
  icon: 'i-lucide-file-type',
  to: '/gallery/pdf-docs',
  panel: 'bg-violet-500',
  group: 'artifact',
  input: 'PDF / DOCX',
  output: '校验文档',
  tags: ['PDF', 'DOCX', '渲染检查']
}, {
  title: 'Ops Debug',
  description: '排查服务器、端口、代理、服务状态和远程连通性。',
  icon: 'i-lucide-server-cog',
  to: '/gallery/ops-debug',
  panel: 'bg-slate-600',
  group: 'engineering',
  input: 'Host / Log',
  output: '排查结论',
  tags: ['SSH', '端口', '服务状态']
}, {
  title: 'LaTeX Paper',
  description: '把论文源码编译成 PDF，并定位模板、引用和图表问题。',
  icon: 'i-lucide-scroll-text',
  to: '/gallery/latex-paper',
  panel: 'bg-lime-600',
  group: 'research',
  input: 'TeX / Bib',
  output: 'PDF',
  tags: ['LaTeX', '论文', '编译']
}, {
  title: 'Diagram Canvas',
  description: '把系统结构、研究路线或工作流转换成可编辑图示。',
  icon: 'i-lucide-git-compare-arrows',
  to: '/gallery/diagram-canvas',
  panel: 'bg-fuchsia-500',
  group: 'artifact',
  input: '结构描述',
  output: '图示文件',
  tags: ['Diagram', 'Canvas', '工作流']
}, {
  title: 'Hatch Pet',
  description: '从角色设定或品牌线索生成可检查的动画宠物资源包。',
  icon: 'i-lucide-sparkles',
  to: '/gallery/hatch-pet',
  panel: 'bg-orange-500',
  group: 'artifact',
  input: '角色 / 品牌',
  output: 'Sprite atlas',
  tags: ['动画', '精灵图', '视觉 QA']
}]

const groupedSkills = computed(() => {
  const visibleGroups = compact.value ? groups.slice(0, 2) : groups
  return visibleGroups.map(group => ({
    ...group,
    skills: skills
      .filter(skill => skill.group === group.slug)
      .slice(0, compact.value ? 2 : undefined)
  }))
})
</script>
