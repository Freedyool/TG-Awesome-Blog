# 使用 structurizr 绘制 c4 model

这篇文章主要介绍如何使用 [structurizr](https://docs.structurizr.com/) 绘制 [c4 model](https://c4model.com/)，在不久之前，我将 c4 model 的文档做了一遍简单的机翻并发布在了：https://c4.yooll.ltd/，这里我们来实践一下；

首先来到 structurizr 的官方文档，我的建议是先从一个[简单的样例](https://structurizr.com/dsl?src=https://docs.structurizr.com/dsl/tutorial/5.dsl)开始，打开样例后就可以看到左侧的源码部分和右侧与之对应的渲染效果；

![](https://04aceac.webp.li/2025/02/04c7cd27daf145911c613979595b93b6.png)

这是一个非常简单的 hello world 样例，你可以在右侧渲染视图中点击下拉框查看该样例中的所有视图；

![](https://04aceac.webp.li/2025/02/046a66a239e524a5f150dcf29a796e55.png)

然后逐行阅读左侧的源码，通过渲染视图中的文字提示找到对应的源码，例如：

```json
// 这段源码创建了构成架构图的所有元素，包括一个名为 User 的 person 和 一个包含有两个 container 的 Sofware System
model {
    u = person "User"
    ss = softwareSystem "Software System" {
        wa = container "Web Application"
        db = container "Database Schema" {
            tags "Database"
        }
    }

    // 这里则申明了元素间的连接关系（箭头和注释）
    u -> ss.wa "Uses"
    ss.wa -> ss.db "Reads from and writes to"
}

// 最终在下面这段源码中申明了以何总方式呈现上面的元素：两张架构图，一张是名为 Diagram1 的 SystemContext 视图，一张是名为 Diagram2 的 Container 视图；
views {
    systemContext ss "Diagram1" {
        include *
        autolayout lr
    }

    container ss "Diagram2" {
        include *
        autolayout lr
    }

    styles {
        // some code
    }
}
```

有了这样一个直观的认识之后，我们再通过[官方教程](https://docs.structurizr.com/dsl/tutorial)来系统性地学习一下 structurizr 的语法和构建过程吧；

![](https://04aceac.webp.li/2025/02/48c64208cb26d0ceb00744b25627c429.png)

你可以跟着教程在刚刚打开的[样例](https://structurizr.com/dsl?src=https://docs.structurizr.com/dsl/tutorial/5.dsl)中进行尝试，你可以尝试在教程的基础上加入个性化的内容来看看会发生什么样的变化；

最后，尝试总结你在教程中学到的内容，下面是一个参考笔记（含有很多的个人理解）：

