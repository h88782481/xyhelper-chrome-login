# xyhelper-login 

```
变更通知

现已将登录模式改为“类型”选择：GPT 与 SORA。
为兼容旧接口，内部会将 GPT 映射为 auth，SORA 映射为 auth0，并同时透传 type 参数。
```


一个获取refreshToken的小工具.公益服务,请勿滥用.


[L站网友吃瓜专属链接](https://github.com/orgs/xyhelper/discussions/1)


## 插件安装方法

1. 下载插件

在 [Release](https://github.com/xyhelper/xyhelper-chrome-login/releases) 页面下载最新的插件

2. 安装插件

解压下载的插件，在Chrome浏览器中打开`chrome://extensions`，开启右上角“开发者模式”，点击“加载已解压的扩展程序”，选择解压后的文件夹即可。

Firefox 用户：
- 临时加载（关于 MV3 限制）：部分 Firefox 版本在临时加载时不启用 MV3 的 `background.service_worker`，会提示“background.service_worker is currently disabled. Add background.scripts.”。
- 解决方案：使用本仓库提供的 MV2 版本清单。
  1) 直接加载打包产物：解压 `dist/xyhelper-login-v<版本>-firefox.zip` 后，在 `about:debugging#/runtime/this-firefox` 选择“临时载入附加组件”，指定解压目录下的 `manifest.json`。
  2) 手工方式：将仓库根目录中的 `manifest.firefox.json` 重命名为 `manifest.json` 后再临时加载。
  3) 上架/签名：保持 `manifest.firefox.json` 作为源文件，提交 AMO 进行签名，上架后可使用 MV2 后台脚本正常工作。

## 打包与发布

- 生成压缩包：在项目根目录执行 `bash scripts/package.sh`
- 输出文件：
  - `dist/xyhelper-login-v<版本>-chrome.zip`
  - `dist/xyhelper-login-v<版本>-firefox.zip`
- 提交到 Release：将上述 zip 上传到 GitHub Release 或按需提交到 Chrome Web Store/AMO。

## 调试与生产环境

通过“选项”页进行本地配置，固定选择开发或生产：

- 打开扩展的“选项”页，选择环境：
  - 生产环境：`https://public.xyhelper.cn`
  - 开发环境：`http://127.0.0.1:8080`
- 登录接口：`/gptlogin?type=gpt|sora`
- 会话接口：`/api/getsession`
- 说明：选择后将固定使用所选环境，不再自动回退。

## 使用方法
点击插件图标，将自动打开chatgpt的登录页面，登录后即可获取refreshToken。


```shell
# refreshToken获取accessToken
curl --location --request POST 'https://public.xyhelper.cn/oauth/token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "grant_type": "refresh_token",
    "refresh_token": "your refresh_token"
}'
```


