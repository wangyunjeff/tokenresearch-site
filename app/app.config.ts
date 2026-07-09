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
    siteName: 'TokenResearch Docs'
  },
  header: {
    title: 'TokenResearch Docs',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true,
    links: [{
      label: '模型评测',
      icon: 'i-lucide-chart-no-axes-combined',
      to: '/models',
      class: 'hidden md:inline-flex'
    }, {
      label: '场景路线',
      icon: 'i-lucide-map',
      to: '/workflows',
      class: 'hidden md:inline-flex'
    }, {
      label: 'Skill Gallery',
      icon: 'i-lucide-gallery-horizontal-end',
      to: '/gallery',
      class: 'hidden md:inline-flex'
    }, {
      label: 'Skills/MCP',
      icon: 'i-lucide-plug',
      to: '/skills-mcp',
      class: 'hidden md:inline-flex'
    }]
  },
  footer: {
    credits: `TokenResearch Docs • Built with Nuxt UI • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-lucide-book-open',
      'to': '/tutorials',
      'aria-label': '基础教程'
    }, {
      'icon': 'i-lucide-chart-no-axes-combined',
      'to': '/models',
      'aria-label': '模型评测'
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
        icon: 'i-lucide-star',
        label: 'Skill Gallery',
        to: '/gallery'
      }, {
        icon: 'i-lucide-chart-no-axes-combined',
        label: '模型评测',
        to: '/models'
      }, {
        icon: 'i-lucide-map',
        label: '场景路线',
        to: '/workflows'
      }]
    }
  }
})
