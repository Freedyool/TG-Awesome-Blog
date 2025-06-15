import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Yool's Blog",
  description: "Glad to see you ~",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '我的博客', link: '/blog/index', activeMatch: '/blog/' },
      { text: '开源项目',
        items: [
          { text: "Advanced-PPK", link: '/project/adv-ppk' },
          { text: "c4-model-cn", link: '/project/c4-model' }
        ],
        activeMatch: '/project/',
      },
      { text: '关于我', link: '/about/index', activeMatch: '/about/' }
    ],

    sidebar: {
      '/blog/': [
        {
          text: '免费图床搭建教程',
          link: '/blog/image-host'
        },
        {
          text: 'SSL证书申请教程',
          link: '/blog/ssl-cert'
        },
        {
          text: 'Jekyll到VitePress迁移指南',
          link: '/blog/doc_migrante'
        },
        {
          text: '使用 structurizr 绘制 c4 model',
          link: '/blog/structurizr'
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
