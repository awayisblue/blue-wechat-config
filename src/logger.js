const config = require('config')
const winston = require('winston')
const Sentry = require('winston-sentry')
require('winston-daily-rotate-file')

const logsPath = './logs'
let transports = [
  new winston.transports.Console(),
  new (winston.transports.DailyRotateFile)({
    name: 'info',
    filename: `${logsPath}/%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    maxSize: '10m',
    level: 'info'
  })
]

if (config.sentryDSN) {
  transports.push(
    new Sentry({
      level: 'warn',
      dsn: config.sentryDSN,
      tags: { app: config.appName }
    })
  )
}
const logger = new winston.Logger({
  transports
})
module.exports = logger
