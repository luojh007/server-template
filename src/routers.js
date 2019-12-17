const router = require('koa-router')();
const db = require('../db/db')
router.get('/item/page', async (ctx, next) => {
  // ctx.
  var sql = 'select * FROM item_type;'
  const result = await db(sql);
  ctx.response.body = {
    data: result,
    success: true,
    errMsg: '111',
  }
});
router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>Index</h1>';
});
module.exports = router;