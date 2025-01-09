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
      {text: '快速开始', link: 'guide/quick-start/'},
      {text: 'api 样例', link: 'api-examples'},
      {text: 'markdown 样例', link: 'markdown-examples'},
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Freedyool/TG-Awesome-Blog' }
    ],

    footer: {
      message: '<a href="https://beian.miit.gov.cn/" target="_blank">苏ICP备2021007807号-1</a>',
      copyright: 'Copyright © 2019-present Freed Yool'
    }
  }
})
