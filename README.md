# blue-wechat-config

## 配置说明

```
{
  "appName": "APP_NAME",
  "server": {
    "port": "SERVER_PORT"
  },
  "wechat": {
    "appId": "WECHAT_APPID",
    "secret": "WECHAT_SECRET"
  },
  "file": {
    "name": "FILE_NAME",
    "content": "FILE_CONTENT"
  },
  "redis": "REDIS_URI",
  "specialToken": "SPECIAL_TOKEN",
  "sentryDSN": "SENTRY_DSN"
}

```
- APP_NAME , 应用名称, 主要用于Log的时候带上名称，及redis存储的时候当前缀
- SERVER_PORT, 服务器监听端口，默认3003
- WECHAT_APPID, 微信appid
- WECHAT_SECRET, 微信密钥
- FILE_NAME, 主要用于微信校验文件，这里是文件名，如abctsdfad.txt
- FILE_CONTENT, 主要用于微信校验文件，这里是文件内容
- REDIS_URI, redis访问uri, 本项目用于微信token，ticket的缓存
- SPECIAL_TOKEN, 主要用于访问控制，通过在header的x-special-token里带配置的值，才可以访问
- SENTRY_DSN, sentry配置，如果配置了，则log信息也会打到sentry里去