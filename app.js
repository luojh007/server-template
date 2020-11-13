const Koa = require('koa');
const app = new Koa()
const port = 8081;
var cors = require('koa-cors');
const router = require('./src/routers');
app.use(
  cors({
    origin: function (ctx) { //设置允许来自指定域名请求
      // const whiteList = ['http://127.0.0.1:8081', 'http://localhost:8081']; //可跨域白名单   
      // //允许浏览器上直接地址（无referer）
      // let url = ctx.header.referer ? ctx.header.referer.substr(0, ctx.header.referer.length - 1) : '';
      // if (whiteList.includes(url)) {
      //   return url //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
      // }
      return ctx.header.origin // 允许访问的接口跨域
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE',], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
)
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => {
  console.log('success on port：' + port)
})