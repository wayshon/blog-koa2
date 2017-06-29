/*
crypto 是 Node.js 的一个核心模块，用它生成散列值来加密密码
*/
const fs = require('fs'),
      koaBody = require('koa-body'),
      path = require('path'),
      ApiError = require('../error/ApiError'),
      ApiErrorNames = require('../error/ApiErrorNames');


const config = require('../config');

//获取局域网ip
const os = require('os'),
    iptable = {},
    ifaces = os.networkInterfaces();
for (let dev in ifaces) {
    ifaces[dev].forEach((details, alias) => {
        if (details.family == 'IPv4') {
            iptable[dev + (alias ? ':' + alias : '')] = details.address;
        }
    });
}
// console.log(iptable['en0:1']);

class UtilsController {

    constructor(d) {
        
    }

    async uploadBase64(ctx, next) {
        try {
            let dataBuffer = new Buffer(ctx.request.body.img, 'base64'),
                userid = ctx.state.user || 'test',
                name = ctx.request.body.imgName || Date.now(),
                imgpath = `images/${userid}/${name}.png`,
                absolutePath = `http://${iptable['en0:1']}:${config.port}/${imgpath}`;

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
                msg: '上传成功'
            }

        } catch (error) {
            console.log(error)
            if (error instanceof ApiError) 
                throw error
            else
                throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }
    }

    async upload(ctx, next) {
        try {
            let file = ctx.request.body.files.file;

            let userid = ctx.state.user || 'test',
                imgpath = `images/${userid}/${file.name}`,
                absolutePath = `http://${iptable['en0:1']}:${config.port}/${imgpath}`;

            let reader = fs.createReadStream(file.path),
                stream = fs.createWriteStream(`./public/${imgpath}`);

            reader.pipe(stream);

            ctx.body = {
                url: `http://${iptable['en0:1']}:${config.port}/${imgpath}`
            }

        } catch (error) {
            console.log(error)
            if (error instanceof ApiError) 
                throw error
            else
                throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }
    }
}


module.exports = UtilsController;
