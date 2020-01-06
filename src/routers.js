const router = require('koa-router')();
const db = require('../db/db')
const Response = require('./Modal/Commin/Response');
const config = require('./Config/index')
var Common = require('./Common/index')
var request = require('request')
router.get('/item/page', async (ctx, next) => {
  var sql = 'select * FROM item_type;'
  const result = await db(sql);
  const res = new Response();
  res.data = result;
  ctx.response.body = res
});
router.get('/k-chart/index', async (ctx, next) => {
  return new Promise((resolve, reject) => {
    let { period = 'D', pidx = '1', psize = '100', symbol = 'GBPJPY' } = ctx.params;
    let params = {
      period,
      pidx,
      psize,
      symbol
    }
    let url = `http://alirm-gbft.konpn.com/query/comkm${Common.serialize(params)}`;
    request({
      url,
      method: 'GET',
      headers: { "Authorization": 'APPCODE ' + config.appCode }
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        ctx.response.body = JSON.parse(body);
        resolve()
      } else {
        reject('掉不同第三方api接口了')
      }
    })
  })
});

router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>Index</h1>';
});
module.exports = router;