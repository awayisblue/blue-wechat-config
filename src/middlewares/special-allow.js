// const error = require('../errors')
// const config = require('config')
module.exports = function () {
  return async (ctx, next) => {
    return next()
    // let token = ctx.get('X-Special-Access-Token')
    // if (config.specialToken === token) return next()
    // throw error.UNAUTHORIZED
  }
}
