const config = require('config')
const request = require('superagent')
const crypto = require('crypto')
const redisDB = require('../../clients/redis')
const redisKeyStore = require('../../clients/redis/keys')
const logger = require('../../logger')
let appId = config.wechat.appId
let appSecret = config.wechat.secret

module.exports.getSDKConfig = async function (url) {
  let ticket = await redisDB.get(redisKeyStore.wechatCache('ticket'))
  if (!ticket) {
    let token = await redisDB.get(redisKeyStore.wechatCache('access-token'))
    if (!token) {
      let res1 = await getAccessToken(appId, appSecret)
      let res1Json = res1.body
      token = res1Json.access_token
      if (!token) {
        logger.error('wx get access token error', {
          res: res1Json
        })
      }
      await redisDB.set(redisKeyStore.wechatCache('access-token'), token, 'EX', 60 * 60)
    }
    let res2 = await getTicket(token)
    let res2Json = res2.body
    ticket = res2Json.ticket
    if (!ticket) {
      logger.error('wx get ticket error', {
        res: res2Json
      })
    }
    await redisDB.set(redisKeyStore.wechatCache('ticket'), ticket, 'EX', 60 * 60)
  }
  let nonceStr = uid()
  let timestamp = currentTimeStamp()
  let signature = getSignature(ticket, nonceStr, timestamp, url)
  return {
    appId,
    timestamp,
    nonceStr,
    signature
  }
}
module.exports.getOauth2Url = (redirectUrl, scope, state = 'none') => {
  let supportedScopes = ['snsapi_base', 'snsapi_userinfo']
  if (supportedScopes.indexOf(scope) === -1) {
    throw new Error('scope not supported, plz use scope in ' + JSON.stringify(supportedScopes))
  }
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`
}
module.exports.getUserInfo = async function (code) {
  let tokenRes = await getOauth2AccessToken(code)
  let tokenData = JSON.parse(tokenRes.text)

  let accessToken = tokenData.access_token
  let openId = tokenData.openid

  let infoRes = await getUserInfoByOauth2AccessToken(accessToken, openId)
  return JSON.parse(infoRes.text)
}

async function getOauth2AccessToken (code) {
  let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${appSecret}&code=${code}&grant_type=authorization_code`
  return request.get(url)
}

async function getUserInfoByOauth2AccessToken (oauth2AccessToken, openId) {
  let url = `https://api.weixin.qq.com/sns/userinfo?access_token=${oauth2AccessToken}&openid=${openId}&lang=zh_CN`
  return request.get(url)
}

function getSignature (ticket, noncestr, timestamp, url) {
  let str = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url.split('#')[0]}`
  return sha1(str)
}
async function getAccessToken (appId, appSecret) {
  let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`
  return request.get(url)
}

async function getTicket (accessToken) {
  let url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`
  return request.get(url)
}

function sha1 (input) {
  return crypto.createHash('sha1').update(input, 'utf8').digest('hex')
}
function currentTimeStamp () {
  return Math.floor(Date.now() / 1000)
}
function uid () {
  return Math.random().toString(36).slice(2)
}
