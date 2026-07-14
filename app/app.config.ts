export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    }
  },
  seo: {
    siteName: '词元智研'
  },
  header: {
    title: '词元智研',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true,
    links: [{
      label: '模型广场',
      icon: 'i-lucide-store',
      to: '/models/market',
      class: 'hidden md:inline-flex'
    }, {
      label: '科研流程',
      icon: 'i-lucide-map',
      to: '/workflows',
      class: 'hidden md:inline-flex'
    }, {
      label: 'Skill Gallery',
      icon: 'i-lucide-gallery-horizontal-end',
      to: '/gallery',
      class: 'hidden md:inline-flex'
    }, {
      label: 'Codex 文档',
      icon: 'i-lucide-terminal',
      to: '/codex/model',
      class: 'hidden md:inline-flex'
    }]
  },
  footer: {
    credits: `词元智研 • TokenResearch • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-lucide-book-open',
      'to': '/tutorials',
      'aria-label': '基础教程'
    }, {
      'icon': 'i-lucide-store',
      'to': '/models/market',
      'aria-label': '模型广场'
    }, {
      'icon': 'i-lucide-map',
      'to': '/workflows',
      'aria-label': '场景路线'
    }, {
      'icon': 'i-lucide-gallery-horizontal-end',
      'to': '/gallery',
      'aria-label': 'Skill Gallery'
    }, {
      'icon': 'i-lucide-plug',
      'to': '/skills-mcp',
      'aria-label': 'Skills 与 MCP'
    }, {
      'icon': 'i-lucide-circle-help',
      'to': '/faq',
      'aria-label': 'FAQ'
    }]
  },
  toc: {
    title: '目录',
    bottom: {
      title: '继续阅读',
      edit: '',
      links: [{
        icon: 'i-lucide-store',
        label: '模型广场',
        to: '/models/market'
      }, {
        icon: 'i-lucide-star',
        label: 'Skill Gallery',
        to: '/gallery'
      }, {
        icon: 'i-lucide-map',
        label: '科研流程',
        to: '/workflows'
      }]
    }
  }
})
