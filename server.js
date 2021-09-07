const Koa = require('koa')
const app = new Koa();
const koaBody = require('koa-body')

const router = require('./router')

app.use(koaBody({
  multipart: true,
  formidable: {
  }
}));

app.use(router.routes())
  .use(router.allowedMethods())


app.listen(3000, () => {
  console.log("Listening on:", 3000);
});