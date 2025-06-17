# xyhelper-chrome-login 

```
变更通知

因官方接口变更,auth0模式不再支持触发邮件验证后的rt获取,新增auth模式,
该模式将返回XyhelperToken(自最后一次刷新或获取后有效期一年)
```


一个获取refreshToken的小工具.公益服务,请勿滥用.


[L站网友吃瓜专属链接](https://github.com/orgs/xyhelper/discussions/1)


## 插件安装方法

1. 下载插件

在 [Release](https://github.com/xyhelper/xyhelper-chrome-login/releases) 页面下载最新的插件

2. 安装插件

解压下载的插件，在Chrome浏览器中打开`chrome://extensions`,选择`加载已解压的扩展程序`，选择解压后的文件夹即可。

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