# pc-nrfconnect-ppk 源码解析——开发环境搭建

pc-nrfconnect-ppk 是由 NordicSemiconductor 维护的开源软件，服务于 Nordic 旗下的一款用于嵌入式解决方案功耗分析和优化的开发工具 [Power Profiler Kit II](https://www.nordicsemi.cn/tools/ppk2/)，完整源码可从 [pc-nrfconnect-ppk](https://github.com/NordicSemiconductor/pc-nrfconnect-ppk) 获取；

本章节作为源码系列的第一个章节，主要介绍源码开发环境的搭建，你需要首先具备基本的 NodeJS 和 Git 环境；

## 基架软件下载

pc-nrfconnect-ppk 工具的运行依赖于 [nRF Connect for Desktop](https://www.nordicsemi.com/Products/Development-tools/nrf-connect-for-desktop) 桌面软件，你需要首先 [下载](https://www.nordicsemi.com/Products/Development-tools/nRF-Connect-for-Desktop/Download#infotabs) 安装它才能进行后续的环节；

![image-20250119122853314](https://04aceac.webp.li/2025/01/eae07a1b5705ceaa212cad6534d74314.png)

安装完成后，你应该可以得到上面这样的界面，然后就可以将软件最小化放在一边了。

## ppk 源码下载

为了方便后续开发，我们直接将源码下载到 nRF Connect for Desktop 的本地应用目录下，打开终端进入 {$USER_HOME}/.nrfconnect-apps/local 目录，然后执行

```bash
git clone https://github.com/NordicSemiconductor/pc-nrfconnect-ppk.git
```

此时再打开 `nRF Connect for Desktop` 软件，可以发现会多一个可以直接打开的 `Power Profiler`（标记为 local, V4.2.1）；

![image-20250119124140991](https://04aceac.webp.li/2025/01/2906e1038d2c16ad45c61213d67fc8b8.png)

## ppk 源码编译

此时如果直接点击 `Open`  按钮，出来的会是一篇空白，这是因为源码还未经编译，我们使用 IDE 打开刚刚下载的源码，这里用 VScode 为例，打开源码文件夹并检查 `package.json` 中的信息；

![image-20250119124829044](https://04aceac.webp.li/2025/01/197d1072628d7ff1db233c1ef3ccc5fb.png)

为了确保后续操作的结果一致，我们这里将当前的源码 checkout 到 `tag_v4.2.1`，打开终端并执行 `git checkout v4.2.1`，之后你还可以 `git log` 检查当前提交是否符合预期；

![image-20250119130244444](https://04aceac.webp.li/2025/01/f1f8b8e33741bbf4bfe275111568da8d.png)

接下来正式进入代码编译的环节，我一般会通过 `package.json` 来确认我需要使用什么命令来完成编译，下面是 pc-nrfconnect-ppk 开发者提供的 scripts，这里我们使用 `npm run build:dev` 来完成编译并预览带有 debug 信息的应用程序，关于编译命令可参考；

![image-20250119125438375](https://04aceac.webp.li/2025/01/afb1f85f5c379f3388c6b1c756eb945c.png)

对了，在开始编译之前，还需要先 `npm ci` 一下需要的依赖库，如遇到安装 electron 问题，可参考 [electron下载失败解决方案汇总](https://blog.csdn.net/s_y_w123/article/details/123427419) 这篇文章；

由于依赖库整体较大，可能需要安装挺长时间，此外如果遇到安装失败的情况，可以尝试切换源，或者是 checkout 到更新的版本再重新 install；

编译库安装完成后执行 `npm run build:dev`，等待一会儿后就能编译完成了；

关于 electron 安装的问题，我最终是参考的是 [node安装electron一直出错](https://blog.csdn.net/Tomonkey/article/details/104064231)，修改了 `${USER_HOME}/.npmrc 文件（如下图所示），然后同时挂着全局的梯子完成安装的。

![image-20250119222922356](https://04aceac.webp.li/2025/01/4f9bddabb73dd00bf734909632ee79b0.png)

## 软件使用

接着我们打开再从 `nRF Connect Desktop` 中找到 `Power Profiler` 并打开，就可以看到下面的页面啦。

![image-20250119224039474](https://04aceac.webp.li/2025/01/f94c37d640edfa3ab8975818cafc741a.png)

由于现在手头上没有 `Power Profiler Kit II`，所以没法展示软件运行的样子，后面一章会介绍软件源码的目录结构以及启动代码（更高阶的，我们会尝试启动一个虚拟设备让软件在没有实际硬件连接的情况下运行起来），期待一下吧；
