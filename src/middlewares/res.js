const error = require('../errors')
const logger = require('../logger')

module.exports = function () {
  return async (ctx, next) => {
    try {
      await next()
      if (typeof ctx.body === 'string') {
        // 支持页面返回
        ctx.set('Content-Type', 'text/html; charset=utf8')
        ctx.status = ctx.status || error.OK.statusCode
      } else {
        let res = {
          payload: ctx.body || {}
        }
        ctx.status = ctx.status || error.OK.statusCode
        let commonRes = error.commonStatus[ctx.status]
        ctx.body = Object.assign(res, commonRes ? commonRes.data : error.OK.data)
      }
    } catch (err) {
      if (err.statusCode && err.data) { // 自定义的错误
        ctx.status = err.statusCode
        ctx.body = ctx.body = Object.assign({
          payload: ctx.body || {}
        }, err.data)
      } else {
        logger.error(err)
        ctx.status = error.SERVER_ERROR.statusCode
        ctx.body = ctx.body = Object.assign({
          payload: ctx.body || {}
        }, error.SERVER_ERROR.data)
      }
    }
  }
}
