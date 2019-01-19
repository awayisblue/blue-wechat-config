let errCode = 1000
module.exports = {
  commonStatus: {
    '200': {
      statusCode: 200,
      data: {
        code: 0,
        msg: 'OK'
      }
    },
    '301': {
      statusCode: 301,
      data: {
        code: 301,
        msg: 'Moved Permanently'
      }
    },
    '302': {
      statusCode: 302,
      data: {
        code: 302,
        msg: 'Redirecting'
      }
    },
    '404': {
      statusCode: 404,
      data: {
        code: 404,
        msg: 'Not Found'
      }
    },
    '403': {
      statusCode: 403,
      data: {
        code: 403,
        msg: 'Forbidden'
      }
    }
  },
  OK: {
    statusCode: 200,
    data: {
      code: 0,
      msg: 'OK'
    }
  },
  PARAM_ERROR: {
    statusCode: 400,
    data: {
      code: errCode++,
      msg: '参数错误'
    }
  },
  SERVER_ERROR: {
    statusCode: 500,
    data: {
      code: errCode++,
      msg: '服务器错误'
    }
  },
  UNAUTHORIZED: {
    statusCode: 403,
    data: {
      code: errCode++,
      msg: '未登录'
    }
  },
  NOT_FOUND: {
    statusCode: 404,
    data: {
      code: errCode++,
      msg: '访问资源不存在'
    }
  }
}
