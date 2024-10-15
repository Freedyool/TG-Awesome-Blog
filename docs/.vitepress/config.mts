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
        text: '指南',
        base: '/guide/',
        items: [
          {text: '快速开始', link: 'quick-start/'}
        ]
      },
      {
        text: '牛马',
        items: [
          {
            text: '嵌入式开发',
            base: '/embedded/',
            link: '/',
            items: [
              { text: '基础外设', link: 'peripheral/' },
              { text: '通信协议', link: 'protocal/' },
            ]
          },
          { text: 'WEB开发', link: '/web/' },
          { text: '电子电路', link: '/electronic/' }
        ]
      },
      {
        text: '泼猴',
        items: [
          { text: '旅行', link: '/traveling/' },
          { text: '厨艺', link: '/cooking/' },
          { text: '摄影', link: '/photography/' }
        ]
      },
      {
        text: '小西天',
        items: [
          { text: '搞钱', link: '/business/' },
          { text: '瞎搞', link: '/misc/' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Freedyool/TG-Awesome-Blog' }
    ]
  }
})
