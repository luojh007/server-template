const Router = require("koa-router")
const router = new Router()
const fs = require('fs')
router.post("/pushPdf", async (ctx, next) => {

    const { response, request } = ctx
    const { name } = request.body
    const { file } = request.files
    const reader = fs.createReadStream(file.path)
    const writer = fs.createWriteStream(`pdf/${name}.pdf`)
    reader.on('data', (chunk) => writer.write(chunk))
    await new Promise((res, rej) => {
        reader.on('end', () => {
            writer.end()
            res()
            response.body = '写入成功'
        })
    })
});
module.exports = router