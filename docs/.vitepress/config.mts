import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TG Awesome Blog",
  description: "Tech Sharing Place power by VitePress",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Adv-PPK',
        base: '/advanced-ppk',
        link: '/index',
        items: [
          {text: 'About', link: '/about'}
        ]
      },
      {
        text: '建站指南',
        base: '/guide',
        link: '/quick-start',
        items: [
          {text: 'api 样例', link: '/api-examples'},
          {text: 'markdown 样例', link: '/markdown-examples'}
        ]
      },
    ],

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
