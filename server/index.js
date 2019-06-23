const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const config = require('./config');
const Cors = require('koa2-cors')
const app = new Koa();

// 请求头和跨域设置
app.use(Cors({
  origin: function (ctx) {
    if (ctx.url === '/cors') {
        return "*"; // 允许来自所有域名请求
    }
    return ctx.request.header.origin;
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 60*60,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE','OPTIONS','PUT'], //设置允许的HTTP请求类型
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// post请求body解析
app.use(bodyParser({
  formLimit: '1mb'
}))


/**错误捕捉中间件*/
app.use(async(ctx, next) => {
  try {
    ctx.error = (code, message) => {
        console.log('threw error:');
        if (typeof code === 'string') {
          message = code;
          code = 500;
        }
        ctx.throw(code || 500, message || '服务器错误');
    };

    await next();
  } catch (e) {
    let status = e.status || 500;
    let message = e.message || '服务器错误';
    ctx.body = {
      code: status,
      data: [],
      message: message
    };

    // 手动释放 error 事件
    ctx.app.emit('error', e, ctx);
  }
});
// nodejs 未捕获异常拦截
process.on('uncaughtException', function (err) {
  console.error('An uncaught error occurred!');
  //console.error(err.stack);
  console.log(new Date(), " uncaughtException:", err.message, err.status);
});

// 注册路由
app.use(require('./routers/user').routes());
app.use(require('./routers/types').routes());
app.use(require('./routers/records').routes());
app.use(require('./routers/statistics').routes());
// 启动后台服务器
app.listen(config.port)
console.log(`listening on port ${config.port}`)