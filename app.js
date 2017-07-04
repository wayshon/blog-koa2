const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaBody = require('koa-body');

const router = require('koa-router')();
const api = require('./routes/api');

const responseFormatter = require('./middlewares/ResponseFormatter');
const jwtFilter = require("./middlewares/JwtFilter");

const mysql = require('promise-mysql'),
      $db = require('./config/db'),
      pool = mysql.createPool($db.mysql);

const ApiError = require('./error/ApiError');

// error handler
// onerror(app)
//处理未捕获的错误
app.use((ctx, next) => {
  return next().catch((err) => {
    console.log(err)
    if(!(err instanceof ApiError)) {
      ctx.status = 500;
      ctx.body = 'server error'
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
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

pool.getConnection().then((connection) => {
    global.poolConnection = connection;
}).catch((err) => {
    throw err;
});

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
// app.use(jwtFilter([/^\/api/]).unless({ path: [/\/login$/] }))
// app.use(jwtFilter([/^\/api/]).unless(function(ctx) {
//   if (ctx.request.method == 'OPTIONS' || [/\/login$/].some(reg => ctx.request.url.match(reg)) || (ctx.request.url.match(/\/users$/) && ctx.request.method == 'POST')) 
//     return true;
//   return false;
// }))

//添加格式化处理响应结果的中间件，在添加路由之前调用
app.use(responseFormatter('^/api'));

// routes
router.use('/api', api.routes(), api.allowedMethods());

app.use(router.routes(), router.allowedMethods());

module.exports = app
