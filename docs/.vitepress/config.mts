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
      { text: '关于', link: '/about/index', activeMatch: '/about/' }
    ],

    sidebar: {
      '/blog/': [
        {
          text: '博客目录',
          base: '/blog',
          link: '/index',
          items: [
            {
              text: '网站搭建',
              base: '/blog/guide',
              items: [
                { text: '部署 ssl 证书', link: '/ssl-cert' },
                { text: '搭建免费图床系统', link: '/image-host'}
              ]
            },
            {
              text: '读书笔记',
              base: '/blog/book',
              items: [
                { text: '我的书单', link: '/index'}
              ]
            },
          ]
        }
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
      ],
      '/about/': [
        {
          base: '/about',
          items: [
            { text: 'ME', link: '/index' },
            { text: '加入我们', link: '/quick-start' },
            { text: 'API样例', link: '/api-examples' },
            { text: 'Markdown样例', link: '/markdown-examples' },
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
