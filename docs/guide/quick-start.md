# 快速开始

## EDIT/CLONE/FORK

你可以有多种方式来上传你的文章，但它们在原理上都包含了：编辑->提交->部署（已实现自动化）这三个步骤，你可以根据具体的使用场景来决定使用什么方式。

### Use github.dev (推荐)

### Clone then Push

### Fork then Request PR

## 如何编辑

假设你有一篇md文档需要上传，你可以这么做：

1. 在 /docs/** 下依据文件夹找到你的内容所属类别，如果没有就新建一个
2. 将你的文章放入对应目录中
3. 编辑 /dosc/.vitepress/config.mts 添加你的文章的访问路径到 sideBar 中
4. 提交一个 commit 然后推送到 main 分支
5. 等待 github action 的自动部署

如果你想在推送之前预览一下你的编辑，你可以：

1. clone 代码到你的本地 然后安装一个 node 环境 然后执行 npm ci 然后执行 npm run docs:dev
2. 如果你使用 github.dev 你就可以在 github codespaces 完成上面的过程（推荐）
3. 之后你就可以在命令中直接 Ctrl+左键 访问到 http://localhost:5173/ 来检查你的效果

## 参考

- [vitepress指南](https://vitejs.cn/vitepress/guide/what-is-vitepress)
- [vitepress参考](https://vitejs.cn/vitepress/reference/site-config)