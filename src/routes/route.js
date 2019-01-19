const Router = require('koa-router')
const wechat = require('./wechat/route')
const root = require('./root/route')
const specialAllow = require('../middlewares/special-allow')
const router = new Router()
router.use(specialAllow())
router.use('/wechat', wechat.routes())
router.use(root.routes())
module.exports = router
