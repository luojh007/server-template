const Koa = require('koa');
const app = new Koa()
const port = 8081;
var cors = require('koa-cors');
const router = require('./src/routers');
const proxy = require('koa2-proxy-middleware'); //引入代理模块
const options = {
  targets: {
    '/devApi/(.*)': {
      target: 'http://172.17.91.23:7272/Acme',
      pathRewrite: { '^/devApi': '' },
      changeOrigin: true //处理跨域
    },
  }
}
app.use(async (ctx, next) => {
  console.log(ctx.url)
  await next()
})
app.use(proxy(options));
app.use(async (ctx, next) => {
  console.log(ctx.url)
  await next()
})
app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(cors())

app.listen(port, () => {
  console.log('success on port：' + port)
})