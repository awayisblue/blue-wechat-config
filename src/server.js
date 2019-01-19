const Koa = require('koa')
const koaLogger = require('koa-logger')
const koaBody = require('koa-body')
const config = require('config')
const route = require('./routes/route')
const resMiddleware = require('./middlewares/res')
const cors = require('@koa/cors')
const app = new Koa()
const port = config.server.port || 3000
const logger = require('./logger')
require('koa-qs')(app, 'first')
app.use(cors()) // 根据前端具体情况，设定指定的域名
app.use(koaLogger())
app.use(koaBody())
app.use(resMiddleware())
app.use(route.allowedMethods())
app.use(route.routes())
app.on('error', function (err) {
  logger.error(err)
})
logger.log('server start', {
  time: new Date().toString()
})
module.exports = app.listen(port, () => logger.log(`Listen on ${port}...`))
