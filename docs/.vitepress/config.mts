import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TG Awesome Blog",
  description: "Tech Sharing Place power by VitePress",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '博客', link: '/blog/index', activeMatch: '/blog/' },
      { text: '项目', link: '/project/index', activeMatch: '/project/' },
      { text: '关于', link: '/guide/index', activeMatch: '/guide/' }
    ],

    sidebar: {
      '/blog/': [
        {
          text: '博客目录',
          base: '/blog',
          link: '/index',
          items: [
          ]
        }
      ],
      '/guide/': [
        {
          text: '建站指南',
          base: '/guide',
          link: '/index',
          items: [
            { text: '快速开始', link: '/quick-start' },
            { text: '部署 ssl 证书', link: '/ssl-cert' },
            { text: '搭建免费图床系统', link: '/image-host'}
          ]
        },
      ],
      '/project/': [
        {
          text: '项目列表',
          base: '/project',
          link: '/index',
          items: [
            {
              text: 'Adv-PPK',
              base: '/project/advanced-ppk',
              link: '/index',
              items: [
                { text: '开发环境搭建', link: '/source-code-0'},
                { text: '项目架构分析', link: '/source-code-1'},
                { text: 'About', link: '/about' },
              ]
            },
            {
              text: 'C4-Model-Zh',
              base: '/project/c4-model',
              link: '/index',
              items: [
                { text: '开始', link: '/start' },
              ]
            }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Freedyool/TG-Awesome-Blog' }
    ],

    footer: {
      message: '<a href="https://beian.miit.gov.cn/" target="_blank">苏ICP备2021007807号-1</a>',
      copyright: 'Copyright © 2019-present Freed Yool'
    }
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh',
    },

    en: {
      label: 'English',
      lang: 'en',
      link: '/en/'
    }
  }
})
