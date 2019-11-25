const router = require('koa-router')();
router.get('/item-type',async (ctx,next)=>{
  var params = ctx.params;
  console.log(params);

})
module.exports = router.routes();