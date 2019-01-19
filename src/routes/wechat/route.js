const Router = require('koa-router')
const router = new Router()
const error = require('../../errors')
const validate = require('validate.js')
const wechatFunctions = require('./functions')
/**
 * @api {GET} /wechat/sdkConfig
 * @apiDescription 获取微信jssdk配置
 * @apiName /wechat/sdk-config
 * @apiRequestHeader {String} X-Special-Access-Token  必选,请求的时候带这个header，值是后端在部署的时候设置的
 *
 * @apiParam {String} url    必选，当前页面链接，可以用window.href来拿
 * @apiSuccess {Number} code 接口状态码
 * @apiSuccess {String} msg 返回信息
 * @apiSuccessExample {json}:
 *     {
 *        "code": 0,
 *        "msg": 'ok',
 *        "payload": {
 *           "appId": "wxd49b5b58202f68b6",
 *           "timestamp": 1536306430,
 *           "nonceStr": "kp134bu5ole",
 *           "signature": "f4f4f4da66590b3aaafd03815e6eaffdf7bf8eed"
 *        }
 *     }
 * @apiErrorExample {json}:
 *     {
 *         "code": 2001,
 *         "msg": "参数错误"
 *     }
 **/
router.get('/sdkConfig', async function (ctx, next) {
  let constrains = {
    url: {
      presence: {allowEmpty: false},
      url: true
    }
  }
  if (validate(ctx.query, constrains)) {
    throw error.PARAM_ERROR
  }
  ctx.body = await wechatFunctions.getSDKConfig(ctx.query.url)
})
module.exports = router
