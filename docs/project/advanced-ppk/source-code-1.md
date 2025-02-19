# pc-nrfconnect-ppk 源码解析——项目架构

不同于仅仅对项目的目录结构和核心依赖包做念 PPT 式的技术介绍，这里我们尝试学习一下使用 C4 模型来解构 ppk 的源码。

## 什么是 C4 模型

[Home | C4 model](https://c4model.com/)

形象地说，C4 模型就像一张源码地图，可以帮助你理解一个中大型项目的整体布局和架构设计。

而现在，我们要做的就是，给 pc-nrfconnect-ppk 画一张源码地图，在本篇博客中，将以 Structurizr DSL 代码的形式呈现。

### 系统上下文

首先是系统上下文（System Contex），在这一层里，我们将 pc-nrfconnect-ppk 作为一个完整的软件系统，通过框图描述其与用户及系统依赖间的关系；

具体而言，在系统用户方面，pc-nrfconnect-ppk 服务于由 Noridc 公司发布的 [Power Profiler Kit II](https://www.nordicsemi.com/-/media/Software-and-other-downloads/Product-Briefs/Translated-versions/12_Power-Profiler-Kit-II-1.0_SC.pdf) 功耗评估套件，主要用于物联网设备的功耗测量和对用户提供一个实时的可视化交互界面，因此可以创建如下的用户关系：

```json
workspace "pc-nrfconnect-ppk" "这是一个，通过 DSL 语法描述的软件系统" {
    model {
        u = person "用户"
        dut = person "被测设备"

        pcppk = softwareSystem "pc-nrfconnect-ppk 上位机系统"
        hwppk = softwareSystem "Power Profiler Kit II 工具"

        u -> pcppk "使用"
        pcppk -> hwppk "连接"
        hwppk -> dut "测量"
    }
}
```