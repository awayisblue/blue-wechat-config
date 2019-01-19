const config = require('config')
function compose (...rest) {
  return rest.join(':')
}
// 综合管理redis的key
// 应用配置
let appName = config.appName || '__special.custom'
module.exports.wechatCache = function (key) {
  return compose(appName, '__wechatCache', key)
}
