const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const router = require('koa-router')();
const api = require('./routes/api');

const responseFormatter = require('./middlewares/ResponseFormatter');

// error handler
onerror(app)

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

//添加格式化处理响应结果的中间件，在添加路由之前调用
app.use(responseFormatter('^/api'));

// routes
router.use('/api', api.routes(), api.allowedMethods());
app.use(router.routes(), router.allowedMethods());

module.exports = app
