/*
crypto 是 Node.js 的一个核心模块，用它生成散列值来加密密码
*/
const fs = require('fs'),
      koaBody = require('koa-body'),
      path = require('path'),
      ApiError = require('../error/ApiError'),
      ApiErrorNames = require('../error/ApiErrorNames'),
      config = require('../config'),
      tool = require("../utils/Tools");


//获取局域网ip
// const os = require('os'),
//     iptable = {},
//     ifaces = os.networkInterfaces();
// for (let dev in ifaces) {
//     ifaces[dev].forEach((details, alias) => {
//         if (details.family == 'IPv4') {
//             iptable[dev + (alias ? ':' + alias : '')] = details.address;
//         }
//     });
// }
// console.log(iptable['en0:1']);

class UtilsController {

    async uploadBase64(ctx, next) {
        let req = ctx.request.body;

        if (tool.isBlank(req.img)) throw new ApiError(ApiErrorNames.PARAMS_ERROR, '缺少 img');

        let dataBuffer = new Buffer(req.img, 'base64'),
            userid = ctx.state.user || 'test',
            name = req.imgName || Date.now(),
            imgpath = `images/${userid}/${name}.png`;
            // absolutePath = `http://${iptable['en0:1']}:${config.port}/${imgpath}`;

        if (!fs.existsSync(`./public/images/${userid}`)) {
            fs.mkdirSync(`./public/images/${userid}`);
        }
            
        let promiseFS = new Promise((resolve, reject) => {
            fs.writeFile(`./public/${imgpath}`, dataBuffer, error => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });

        await promiseFS;
        ctx.body = {
            url: imgpath
        }
    }

    async upload(ctx, next) {

        let req = ctx.request.body;

        if (tool.isBlank(req.files.file)) throw new ApiError(ApiErrorNames.PARAMS_ERROR, '缺少 file');

        let file = req.files.file;

        let userid = ctx.state.user || 'test',
            imgpath = `/images/${userid}/${file.name}`;
            // absolutePath = `http://${iptable['en0:1']}:${config.port}/${imgpath}`;

        if (!fs.existsSync(`./public/images/${userid}`)) {
            fs.mkdirSync(`./public/images/${userid}`);
        }

        let reader = fs.createReadStream(file.path),
            stream = fs.createWriteStream(`./public${imgpath}`);

        reader.pipe(stream);

        ctx.body = {
            url: imgpath
        }
    }
}


module.exports = new UtilsController();
