const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
// const logger = require('koa-logger')
//log工具
const logUtil = require('./utils/LogUtil');
const koaBody = require('koa-body');

const router = require('koa-router')();
const rou = require('./routes');
const api = require('./routes/api');

const responseFormatter = require('./middlewares/ResponseFormatter');
const jwtFilter = require("./middlewares/JwtFilter");

const ApiError = require('./error/ApiError');

const Raven = require('raven');
Raven.config('http://125b0b09eff94f69b2ea8f47488e675d:bccbdeef6b17490a81d23c81716ee991@106.14.40.56:9000/4').install();

app.use(async (ctx, next) => {
  await next();
  if (ctx.body || !ctx.idempotent) return;
  ctx.status = 404;
  ctx.body = 'Not Found'
})
// error handler
// onerror(app)
//处理未捕获的错误
app.use((ctx, next) => {
  return next().catch((err) => {
    console.log(err)
    
    Raven.captureException(err, function (err, eventId) {
        console.log('Reported error ' + eventId);
    });

    if(!(err instanceof ApiError)) {
      ctx.status = 500;
      ctx.body = 'Server Error'
    }
  });
});

//Support multipart, urlencoded and json request bodies. Provides same functionality as Express's bodyParser - multer
app.use(koaBody({ multipart: true }));

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })
app.use(async (ctx, next) => {
  //响应开始时间
  const start = new Date();
  //响应间隔时间
  var ms;
  try {
    //开始进入到下一个中间件
    await next();

    ms = new Date() - start;
    //记录响应日志
    logUtil.logResponse(ctx, ms);

  } catch (error) {

    ms = new Date() - start;
    //记录异常日志
    logUtil.logError(ctx, error, ms);

    throw error;
  }
});

const mysql = require('mysql'),
      $db = require('./config/db'),
      pool = mysql.createPool($db.mysql),
      dbExec = require('./config/DBExec');

pool.getConnection((err, connection) => {
  if (err) {
    throw err
  } else {
    global.connection = new dbExec(connection);
  }
});

app.use(async (ctx, next) => {
  if (global.connection) {
    await next()
  } else {
    body = 'Mysql Init Error'
  }
})

//处理jwt 401 报错
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status == 401) {
      ctx.status = 401;
      ctx.body = 'UnauthorizedError';
    } else {
      throw err;
    }
  });
});

//jwt过滤, 第一个参数为需要验证的路径，不写就是全部验证。第二个参数是需要忽略的路径
// app.use(jwtFilter([/^\/api/]).unless({ path: [/\/login$/, /\/regist$/, , /\/article$/] }))
// app.use(jwtFilter([/^\/api/]).unless(function(ctx) {
//   if (ctx.request.method == 'OPTIONS' || [/\/login$/].some(reg => ctx.request.url.match(reg)) || (ctx.request.url.match(/\/users$/) && ctx.request.method == 'POST')) 
//     return true;
//   return false;
// }))

//添加格式化处理响应结果的中间件，在添加路由之前调用
app.use(responseFormatter('^/api'));

// routes
router.use('/', rou.routes(), rou.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
app.use(router.routes(), router.allowedMethods());

module.exports = app
