/*
crypto 是 Node.js 的一个核心模块，用它生成散列值来加密密码
*/
const fs = require('fs'),
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

    async upload(ctx, next) {
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
}


module.exports = UtilsController;
