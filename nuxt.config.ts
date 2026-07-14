// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms',
    '@nuxtjs/mcp-toolkit'
  ],

  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1
        }
      }
    },
    experimental: {
      sqliteConnector: 'native'
    }
  },

  experimental: {
    asyncContext: true
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  llms: {
    domain: process.env.NUXT_SITE_URL || 'https://www.tokenresearch.com.cn',
    title: '词元智研',
    description: 'AI 原生科研平台，连接模型网关、科研智能体、Skill Gallery 和 Codex 工作流。',
    full: {
      title: '词元智研 - Full Documentation',
      description: 'Full documentation for TokenResearch model marketplace, Codex configuration, model evaluations, Skill Gallery, and AI-native research workflows.'
    },
    sections: [
      {
        title: '快速开始',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/start%' }
        ]
      },
      {
        title: '基础教程',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/tutorials%' }
        ]
      },
      {
        title: 'Codex 配置文档',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/codex%' }
        ]
      },
      {
        title: '模型与价格',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/models%' }
        ]
      },
      {
        title: 'Skill Gallery',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/gallery%' }
        ]
      },
      {
        title: '场景路线',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/workflows%' }
        ]
      },
      {
        title: 'OpenCode 配置文档',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/opencode%' }
        ]
      },
      {
        title: 'Claude Code 配置文档',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/claude-code%' }
        ]
      },
      {
        title: '常见问题',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/faq%' }
        ]
      },
      {
        title: 'Skills 与 MCP',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/skills-mcp%' }
        ]
      }
    ]
  },

  mcp: {
    name: '词元智研'
  },

  ogImage: {
    zeroRuntime: true
  }
})
