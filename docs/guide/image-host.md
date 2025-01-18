# 从零搭建免费图床系统（白嫖）

## 前言

最近准备开始写 PPK 源码解析，第一篇文章准备介绍 PPK 源码下载、本地编译相关的内容，想到要上传截图到markdown中，当然我可以直接将图片放在博客网站的静态资源目录里，但是太不优雅了；加之早就有想搭建一个私有图床系统的打算，并且也做过一定的调研，于是便有了此篇文章。

## 图床方案

我的前几篇博客，写的都比较烂，更像个简报而不是文章，于是借着这个机会（有很多详细且精彩的记录如何搭建图床系统的博客），抱着学习借鉴的心态，开始这篇文章的第一部分。

什么是图床，图床就是把图片上传到一个专用的存储服务并通过公开链接使用；为什么要使用图床，因为这样不但可以统一进行管理，还能有效减少博客仓库文件的体积，提高网站的加载速度。

我所知道的搭建图床的方法，其实只有一种：OSS 对象存储，它们通常由各大云服务商提供，比如我最早买腾讯云学生机的时候，就附赠了一段时间的 OSS 对象存储，但是当时没有使用图床的习惯，也不知道对象存储可以用来搭建图床系统，也就放在那里吃灰到过期自动释放了。

使用云服务商提供的对象存储服务器固然稳定可用性高，但奈何它贵啊，本来搭个博客系统一年几十块的服务器我还可以找理由觉得它用途广泛巴拉巴拉的，现在还要我掏钱买个 OSS，对八起，真不愿意掏这钱，于是找到了一个同样使用者众多的白嫖方案：[Cloudflare R2 + WebP Cloud + PicGo](https://sspai.com/post/90170)，这里贴一下我参考的文章，写的是针不戳。

### Cloudflare R2

R2 是 Cloudflare 推出的免费对象存储服务，需要免费注册一个 [Cloudflare](https://www.cloudflare.com/zh-cn/) 账号才能使用，注册登录后，点击左侧边栏的 R2 访问服务，但需要注意的是开通 R2 服务需要绑定信用卡（国内外主流信用卡皆可），但并不会扣费，主要是为了验证用户身份使用，这里我使用的是招行的信用卡（入职的时候顺便办了一张信用卡，因为知道很多国外的网站/软件需要使用信用卡）。

#### 创建图床 Bucket

填写好信用卡信息之后就可以创建 Bucket 了，这里需要选一下 Bucket 所在的位置，我这里直接选的亚太地区（其实最好选和后面 WebP Cloud 匹配的地区，因为 Cloudflare R2 对象存储从国内访问可能比较慢），创建完成后进入 Settings 选项页。

![](https://04aceac.webp.li/370296fd9bfc68575bd73c03d9a4bab7.png)

找到 R2.dev subdomain 面板并点击 Allow Access，显示允许访问后即可，后续我们上传的图片就都可以从这个 URL 获取到啦这个可以提前拷贝下来，后面 PicGo 配置中需要用到。

![](https://04aceac.webp.li/7a1c589757e2869e07e028c83234e9ea.png)

#### 配置 Bucket 访问 API

接下来回到 Bucket Overview 界面，我们需要添加一组 API Token 用于后续通过 PicGo 实现自动上传图片和获取公共 URL；

![](https://04aceac.webp.li/1363693e98e6def105c54d641f5c15cc.png)

进入 API Token 的管理界面后点击右上角有一个 `Create API token` 按钮，参考如下的 token 配置（未显示的部分保持默认即可）；

![](https://04aceac.webp.li/271cfaae162958f57aa984911ccc9077.png)

之后，你就会获得一系列的关键信息：

- Token Value(令牌)
- Access Key ID（访问密钥 ID）
- Secret Access Key（机密访问密钥）
- Endpoints for S3 clients（为 S3 客户端使用管辖权地特定的结点）

你需要妥善保管它们，因为它们只会显示这一次，之后将无法再查看这些密钥信息。

### PicGo

准备好我们的 R2 存储后，我们直接在 PicGo 上配置连接它。

PicGo 是一个用于快速上传并获取图片 URL 的工具软件，有着较为丰富的插件生态，支持多种图床服务，这里是它的主页：[PicGo is Here](https://picgo.github.io/PicGo-Doc/)。

#### 下载安装

~~首先看到下载安装，这里我使用的是 chocolatey 安装：以管理员权限打开 windows 终端，输入 `choco install picgo` 即可完成安装（推荐一波 [chocolatey](https://chocolatey.org/)，除了本人喜欢吃巧克力的原因之外，它确实体验不错，我的 git、nodejs、python 还有一堆开源应用都是用 `choco` 安装的，基本上只要安装方式里有 `choco` 这个选项的，我都会选择用 `choco`）。~~

~~下载完发现，choco 上的最新版本是 2.3.0，而最新的版本已经来到了 2.3.1（发布在 GitHub 上），然后，我就选择了去 GitHub 上安装最新的版本。~~

速通方案：去 GitHub 上下载最新版本的 [PicGo 2.4.0-beta.9](https://github.com/Molunerfinn/PicGo/releases/tag/v2.4.0-beta.9) ！

#### 配置 R2 图床（踩坑记录）

PicGo 本体并不包括 S3 图床，需要通过 [picgo-plugin-s3](https://github.com/wayjam/picgo-plugin-s3) 插件来支持。

~~第一个步骤安装插件，按照官方文档中的提示，在GUI中搜索插件，我搜了，然后就水灵灵地搜不到这个插件（第一坑），我检查了网络问题甚至重新安装了 PicGo 都没有解决我的问题，然后我就找到了这个：[如何优雅地安装PicGO插件？(解决搜不到插件以及下载慢的通用方法)](https://www.52txr.cn/2024/PicGOPlungs.html)~~

~~按照上面文章中给出的解决步骤，在 `PicGo` 的安装目录中打开终端并输入 `npm install picgo-plugin-s3`，然后重启 PicGo；然后就会发现，还是搜不到插件（第二坑），不过紧接着，我又在这篇博客底下评论区里发现了新线索，似乎是 npm 新版本 api 接口发生了变化，导致 PicGo 的插件查询出现了错误，这一问题在 PicGo 的最新版本中 [PicGo 2.4.0-beta.9](https://github.com/Molunerfinn/PicGo/releases/tag/v2.4.0-beta.9) 得到了修复！；~~

这样总算是解决了插件安装的问题，安装成功后是这样子的（可以顺便核对一下版本）。

![](https://04aceac.webp.li/ead692ea361cee4ba6465aa4abaf3b1e.png)

然后进入图床设置，可以参考下我的配置项（未列出的空着或者保持默认值就行）：

- 图床配置名：随便起，只是个名字
- 应用密钥ID：填写 API Token 中的 `Access Key ID（访问密钥 ID）`
- 应用密钥：填写 API Token 中的 `Secret Access Key（机密访问密钥）`
- 桶名：填写创建 Buckets 时使用的 `Name`
- 地区：我填的亚太地区，不知道就填 "auto"
- 自定义节点：填写创建 API Token 中的 `Endpoints for S3 clients（为 S3 客户端使用管辖权地特定的结点）`
- 代理：国内可能无法访问导致上传失败，可以在这里挂个代理
- 自定义输出URL模板：填写创建 Buckets 时获取的公共 URL，然后在最后加上 `{path}` 的后缀

![](https://04aceac.webp.li/2025/01/09f0aaa4d2707bcc596ecb7d5db06cc3.png)

上述配置仅供参考，实际填写时应该直接在 GUI 里填写，填写完成后点击底部的 `确定` 按钮，然后点击 `设置为默认图床` 按钮（如下图所示）：

![](https://04aceac.webp.li/dae60ab5dbce67ba52f9651bd141fb4f.png)

理论上来说，之后只要在上传区里上传文件，然后就能从对应的公网URL中访问到上传的图片了；然而，在我兴致勃勃点击上传之后，等待我的是又一个报错（第三坑），通过检查 log 文件发现：

`2025-01-18 12:26:50 [PicGo ERROR] Item Snipaste_2025-01-18_12-21-28.png: Failed to upload "Snipaste_2025-01-18_12-21-28.png" to S3: Header 'x-amz-checksum-crc32' with value 'yOGDyQ==' not implemented `

速通：[Github Issue 52](https://github.com/wayjam/picgo-plugin-s3/issues/52)，~~下面是我的分析和折腾过程（可忽略）~~；

首先看到报错，字面理解一下，是说 PicGo 发送的 API 申请中带有了 x-amz-checksum-crc32 的头，而 R2 存储为实现这个头的解析和处理，由此引发了错误。

有了前车之鉴，我首先就去 [PicGo](https://github.com/Molunerfinn/PicGo) 和 [picgo-plugin-s3](https://github.com/wayjam/picgo-plugin-s3) 这两个 GitHub 仓库中检查了已有的 issue，几番调整了各种配置后，还是未能解决此问题；之后，我开始从报错信息入手，在 picgo-plugin-s3 中找到了报错信息来自于 uploader.ts 中的 `S3Client.send(PutObjectCommand)`，这里的 `S3Client` 和 `PutObjectCommand` 又来自于 `@aws-sdk/client-s3`，与此同时，我也去查看了 R2 存储中关于 [S3 API 的使用文档](https://developers.cloudflare.com/r2/examples/aws/aws-sdk-js-v3/)，其中有一行注释引起了我的注意；

![](https://04aceac.webp.li/8aa519fdd975306ec90e211e0c0c226e.png)

检查 picgo-plugin-s3 中 `@aws-sdk/client-s3` 的依赖版本，果然发现了问题，`package.json` 中固定版本时使用 `^` 表示不改变大版本号的前提下获取最新的版本（参考 [package.json中版本号详解](https://blog.csdn.net/weixin_40817115/article/details/86611179)），此时满足该条件的最新版本号为 [aws-sdk-js-v3.731.0](https://github.com/aws/aws-sdk-js-v3/releases/tag/v3.731.0)，此版本号在上文提示的兼容版本之外。

![](https://04aceac.webp.li/b6090093f52a0205a23653c3ec9b9562.png)

这一点可以通过在 PicGo 插件安装目录下执行 `npm list` 进行确认，我将此问题的解决方法上传到了插件仓库的 [Github Issue 52](https://github.com/wayjam/picgo-plugin-s3/issues/52) 中，可以参考解决，总体思路就是通过改 package.json 并重新安装符合兼容性要求的依赖版本。

### WebP Cloud 图片优化

至此，我们就完成了 PicGo + R2 对象存储的个人图床搭建，但是还存在一个问题，R2 存储部署在境外，国内用户访问时基本都会存在打不开或者加载慢的问题，这里我们参考佬的做法。

#### 创建 WebP Cloud 代理

首先注册一下 [WebP Cloud](https://dashboard.webp.se/) 的账号，直接选择使用 Github 登录即可；然后右下角点击 `创建代理`，填入 R2 存储的公共 URL 前缀。

![](https://04aceac.webp.li/2025/01/d82d948786a7c0455cb96f488d2c4d1a.png)

点击 `确认`，然后就会在底部我的代理中看到刚刚创建的代理处于已启用状态：

![](https://04aceac.webp.li/2025/01/83391aef07675f7b7af93829ff3e3292.png)

#### 使用代理域名替换掉 PicGo 中的配置 URL

将代理地址复制到剪切板并替换到 PicGo 图床设置的 URL 模板中：

![](https://04aceac.webp.li/2025/01/cd668f5cc9b09844a666ee7a6dc6bba0.png)

完成修改后点击 `确定`，至此算是真正意义上的完成了所有配置。

### 关于免费额度

#### R2 存储的免费额度

每个月有10GB的免费存储空间，支持100万次上传和1000万次访问（简单理解下，实际是对应的不同类型的接口）；

![](https://04aceac.webp.li/2025/01/32ac2f2883f58563318d7be8afacdb4e.png)

#### PicGo 软件

开源软件，免费下载，持续有人在维护中，遇到问题也可以自己尝试着去通过看源码和issue解决，还挺不戳；

#### WebP Cloud 的免费额度

每天有 3000 个请求额度，另有 5 块钱的额度包可做补充，对于个人使用基本上不在话下；

![](https://04aceac.webp.li/2025/01/4a56b3b888509b3e7bbbe954d2545bbb.png)