const Router = require('koa-router')
const router = new Router()
const config = require('config')
const errors = require('../../errors')
router.get('/:filename', async function (ctx, next) {
  let fileName = ctx.params.filename
  if (fileName !== config.file.name) {
    throw errors.NOT_FOUND
  }
  ctx.body = config.file.content
})
module.exports = router
