# 从切换文档引擎开始

## 文档引擎

目前市面上有众多的文档引擎，C4-model 的官方文档使用 [Jekyll]([欢迎 - Jekyll • 简单静态博客网站生成器](https://jekyllcn.com/docs/home/)) 构建，在国内似乎不如 `Hexo`、`WorldPress` 和 `VuePress` 那么具有影响力（如果你需要一些简单介绍，请参考：[七大热门博客框架对比-CSDN博客](https://blog.csdn.net/weixin_42365530/article/details/107840934)）；

这里我基于汉化效率的考虑，选择了 [VitePress | 由 Vite 和 Vue 驱动的静态站点生成器](https://vitepress.dev/zh/) 作为文档搭建的引擎，并且会将汉化的文档暂时部署在私有域名下，它会从 `Github` 仓库上自动推送到文档网站上以供便捷访问，当然你也可以在本地，或者 `Github` [codespaces](https://docs.github.com/en/codespaces) 中预览，具体请参考 [快速开始](../../guide/quick-start.html)。

### 从 Jekyll 迁移到 VitePress

这一部分主要包括这几个步骤：

1、删除 `Jekyll` 相关的配置文件，包括 `.github/workflow` 中的自动化部署脚本，保留所有 `.md` 文件

2、参照 [快速开始 | VitePress](https://vitepress.dev/zh/guide/getting-started) 进行项目初始化

3、编辑 `.vitepress/config.mts`，参照英文原网站构建侧边栏目录

4、启动 `VitePress` 用于本地预览以及**检查编译**

5、逐页面向 `config.mts` 中添加文档并通过（可能出现的）报错信息修改原文档文件，通常，你需要：

- 注释掉文档开头的 `frontmatter`，因为 `Jekyll` 和 `VitePress` 的 `frontmatter` 不兼容；
- 如果原始文档中有 `script` 标签，请注释整个标签块（包括**引用标签**），然后使用 vitepress 支持的方式来实现原有的功能；
- 一个文件特例：`Diagrams/19-example.md` 文件，不知道为啥一直 `404`，暂且跳过此页面，后续知道是因为doc中引用了无法访问的 localhost 链接导致的，具体涉及到 vitepress 中的 ignoreDeadlink 属性；
- 处理所有无法访问的链接（jekyll的路径映射与vitepress并不兼容，jekyll支持使用frontmatter定义的别名进行路由跳转，而vitepress的处理与之不同）；
- 处理所有的图片引用，可以直接访问原有网站的图片链接，也可以自己重新上传这些图片；

6、按需加入 github action 来部署你的文档

上述完整过程参见 https://github.com/Freedyool/c4model-cn 中的提交；