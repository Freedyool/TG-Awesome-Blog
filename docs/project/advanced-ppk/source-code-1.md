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

### 容器框图

我们在这一层重点描述软件系统范围内的容器，这里主要就是 pc-nrfconnect-ppk 上位机系统内部所包含的各个可以独立运行的单元；

在分析 pc-nrfconnect-ppk 上位机系统中可以独立运行的单元时，我陷入了迷茫，主要使我犹豫的点在于，对于可以独立运行的单元的定义：

第一种，按照应用程序划分可独立运行的单元。

在 pc-nrfconnect-ppk 上位机系统中，除了操作系统外，就只有 Power Profiler 这一个应用程序；

第二种，按照系统进程划分可独立运行的单元。

实际上，上位机系统是一个运行在操作系统上的应用程序可作为一个潜在既定事实而无需体现在软件架构中，进一步，我们就可以按照操作系统线程对软件系统进行重新划分；根据 pc-nrfconnect-ppk 上位机系统的实际功能，我们可以将软件系统划分为：可视化界面主进程和数据通讯子进程这两个部分；

事实上，上面的划分并不完全合理，考虑到上位机系统是基于 Electron 开发的桌面应用，这里的可视化界面主进程应该进一步划分为主进程（由 NodeJS 运行）和多个渲染进程（由 Chromium 运行），因此这里最终采取了第一种划分方式。

```json
workspace "pc-nrfconnect-ppk" "这是一个，通过 DSL 语法描述的软件系统" {
    model {
        u = person "用户"
        dut = person "被测设备"

        pcppk = softwareSystem "pc-nrfconnect-ppk 上位机系统" {
            OperatingSystem = container "用户操作系统" "Windows"
            PowerProfiler = container "Power Profiler 桌面应用" "基于 Electron 开发框架构建"
        }

        hwppk = softwareSystem "Power Profiler Kit II 工具"

        u -> pcppk "使用"
        pcppk -> hwppk "连接"
        hwppk -> dut "测量"
    }
}
```

### 组件框图

在上一章节中，我们已经将 Power Profiler 桌面应用作为一个独立的容器，因此在组件框图中，我们就可以直接借鉴 Electron 开发框架中的划分逻辑，得到如下的组件框图：

```json
workspace "pc-nrfconnect-ppk" "这是一个，通过 DSL 语法描述的软件系统" {
    model {
        u = person "用户"
        dut = person "被测设备"

        pcppk = softwareSystem "pc-nrfconnect-ppk 上位机系统" {
            OperatingSystem = container "用户操作系统" "Windows"
            PowerProfiler = container "Power Profiler 桌面应用" "基于 Electron 开发框架构建" {
                Chromium = component "浏览器窗口" " 为 Power Profiler 提供渲染引擎" "通过它构建用户界面和多进程支持"
                Nodejs = component "Node JS 运行时" "为 Power Profiler 提供系统访问支持" "包括进程创建、文件读写以及数据通讯"
            }
        }

        hwppk = softwareSystem "Power Profiler Kit II 工具"

        u -> pcppk "使用"
        pcppk -> hwppk "连接"
        hwppk -> dut "测量"
    }
}
```

上面的软件系统架构图确实非常贴合 Electron 应用的实际架构，但是对于 Power Profiler 的功能和代码实现几乎毫无作用，并不能起到 “代码地图的作用”；因此，完全遵照 C4 模型的定义来创建 Power Profiler 的软件架构图并不能达到我们预期的效果。但是我们依然能够借鉴 C4 模型的思想，进一步完善我们的架构图：

```json
workspace "pc-nrfconnect-ppk" "这是一个，通过 DSL 语法描述的软件系统" {
    model {
        u = person "用户"
        dut = person "被测设备"

        pcppk = softwareSystem "pc-nrfconnect-ppk 上位机系统" {
            os = container "用户操作系统" "Windows"
            PowerProfiler = container "Power Profiler 桌面应用" "基于 Electron 开发框架构建" {
                chromium = component "浏览器窗口" " 为 Power Profiler 提供渲染引擎" "通过它构建用户界面和多进程支持"
                nodejs = component "Node JS 运行时" "为 Power Profiler 提供系统访问支持" "包括进程创建、文件读写以及数据通讯"

                app = softwareSystem "应用程序" {
                    launcher = container "pc-nrfconnect-launcher" "由 Nordic Semiconductor 开发的一个支持多种桌面应用程序的跨平台框架" "该框架提供了一个启动器和用于选择设备、导航菜单和日志记录等的通用布局。应用程序可以装饰标准组件并使用内置库来创建最终用户工具。"

                    main = container "pc-nrfconnect-ppk 主应用程序" "基于 react + redux 构建的应用界面和主体功能的实现集合" {
                        SerialDevice = component "串口设备" "通过串口与板卡实现通讯，包含一个单例对象和实现串口通讯的工作者线程"
                        DataManager = component "数据管理器" "连接数据源与视图的桥梁，内部通过一个 DataView 对象实现数据存储"
                        PersistentStore = component "持久化存储" "持久化配置存储"

                        APP = component "顶层应用组件"
                        DeviceSelector = component "设备选择器组件"
                        SidePanel = component "侧边栏组件"
                        Chart = component "可视化图表组件"

                        AppState = component "应用状态集合"
                    }

                    shared = container "pc-nrfconnect-shared" "为桌面应用开发提供公共组件" "包括界面组件、构建脚本、公共配置和测试工具" {
                        StandardApp = component "基于 React 开发的标准 App 组件" "大多数应用程序将使用 App 组件创建其主导出" "它对用户可见，提供一般的应用程序外观"
                        StandardDeviceSelector = component "设备选择器组件" "大多数应用程序都希望向用户显示设备选择器，而此组件是实现此目的的最简单方法" "为应用程序适当地配置它，然后将其传递给 App 组件的 deviceSelect 属性"
                        Logger = component "日志组件" "使用 winston 的 Logger，应用程序可以使用该记录器将日志消息添加到主视图下方的日志中"
                        Slider = component "滑块组件" "用于用户选择范围的交互组件，支持单个值或多个值，对于侧面板中的配置特别有用"
                        ConfirmationDialog = component "确认窗组件" "一个用于显示简单确认对话框的组件"
                        GetAppFile = component "文件组件" "一个用于访问应用文件的组件" "请记住将需要访问的文件包含在应用程序的 files 配置中"
                    }

                    modules = container "node modules dependencies" "npm 管理的开源代码库依赖" {
                        React = component "使用 React 构建用户界面" "提供一系列 API 创建组件系统，帮助构建用户界面和人机交互"
                        Redux = component "使用 Redux 管理应用状态" "可以帮助你开发出行为稳定可预测的、运行于不同的环境（客户端、服务器、原生应用）、易于测试的应用程序"
                        SerialPort = component "使用 SerialPort 模块进行串口通信" "该模块提供了丰富的 API 来处理串口的打开、关闭、读写数据等操作"
                    }
                }
            }
        }

        hwppk = softwareSystem "Power Profiler Kit II 工具"

        u -> pcppk "使用"
        pcppk -> hwppk "连接"
        hwppk -> dut "测量"
    }
}
```

### 代码框图

```json
softwareSystem "Power Profiler" {
    launcher = container "pc-nrfconnect-launcher" "由 Nordic Semiconductor 开发的一个支持多种桌面应用程序的跨平台框架" "该框架提供了一个启动器和用于选择设备、导航菜单和日志记录等的通用布局。应用程序可以装饰标准组件并使用内置库来创建最终用户工具。"

    main = container "pc-nrfconnect-ppk 主应用程序" "基于 react + redux 构建的应用界面和主体功能的实现集合" {
        App = component "顶层应用组件"
        DeviceSelector = component "设备选择器组件"
        SidePanel = component "侧边栏组件"
        Chart = component "可视化图表组件"
        ChartTop = component "Chart Top"
        TimeSpanTop = component "Time Span Top"
        AmpereChart = component "Ampere Chart"
        TimeSpanBottom = component "Time Span Bottom"
        Minimap = component "Minimap"
        WindowStatBox = component "Window Stat Box"
        SelectionStatBox = component "Selection Stat Box"
        DigitalChannels = component "Digital Channels"

        app = component  "app" "reducer"
        chart = component  "chart" "reducer"
        minimap = component  "minimap" "reducer"
        voltageRegulator = component  "voltageRegulator" "reducer"
        gains = component  "gains" "reducer"
        spikeFilter = component  "spikeFilter" "reducer"
        dataLogger = component  "dataLogger" "reducer"
        deprecatedDevices = component  "deprecatedDevices" "reducer"
        progressDialog = component  "progressDialog" "reducer"
        trigger = component  "trigger" "reducer"
        
        SerialDevice = component "串口设备" "class" "通过串口与板卡实现通讯，包含一个单例对象和实现串口通讯的工作者线程"
        DataManager = component "数据管理器" "class" "连接数据源与视图的桥梁，内部通过一个 DataView 对象实现数据存储"
        PersistentStore = component "持久化存储" "class" "持久化配置存储"
    }

    shared = container "pc-nrfconnect-shared" "为桌面应用开发提供公共组件" "包括界面组件、构建脚本、公共配置和测试工具" {
        StandardApp = component "基于 React 开发的标准 App 组件" "大多数应用程序将使用 App 组件创建其主导出" "它对用户可见，提供一般的应用程序外观"
        StandardDeviceSelector = component "设备选择器组件" "大多数应用程序都希望向用户显示设备选择器，而此组件是实现此目的的最简单方法" "为应用程序适当地配置它，然后将其传递给 App 组件的 deviceSelect 属性"
        Logger = component "日志组件" "使用 winston 的 Logger，应用程序可以使用该记录器将日志消息添加到主视图下方的日志中"
        Slider = component "滑块组件" "用于用户选择范围的交互组件，支持单个值或多个值，对于侧面板中的配置特别有用"
        ConfirmationDialog = component "确认窗组件" "一个用于显示简单确认对话框的组件"
        GetAppFile = component "文件组件" "一个用于访问应用文件的组件" "请记住将需要访问的文件包含在应用程序的 files 配置中"
    }

    modules = container "node modules dependencies" "npm 管理的开源代码库依赖" {
        React = component "使用 React 构建用户界面" "提供一系列 API 创建组件系统，帮助构建用户界面和人机交互"
        Redux = component "使用 Redux 管理应用状态" "可以帮助你开发出行为稳定可预测的、运行于不同的环境（客户端、服务器、原生应用）、易于测试的应用程序"
        SerialPort = component "使用 SerialPort 模块进行串口通信" "该模块提供了丰富的 API 来处理串口的打开、关闭、读写数据等操作"
    }
}
```

上述架构图会随着源码分析的进行而不定期更新。