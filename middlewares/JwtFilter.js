const jwt = require("jsonwebtoken"),
      config = require("../config");

const unless = require('koa-unless');

module.exports = (regs) => {
  const filterProtected = (url) => {
    if (!regs) return true;
    return regs.some(reg => url.match(reg))
  }

  const mymid = async (ctx, next) => {
    if (!filterProtected(ctx.url)) return await next();

    if (!ctx.header.authorization) {
      ctx.throw(401, 'UnauthorizedError');
    }
          
    let decoded;
    try {
      decoded = jwt.verify(ctx.header.authorization, config.jwtSecret);
    } catch(err) {
      ctx.throw(401, 'UnauthorizedError');
    }
    if (decoded.exp <= Date.now()) {
      ctx.throw(401, 'Access token has expired');
    } else {
      ctx.state.user = decoded.user;
      next();
    }
  };

  mymid.unless = unless;

  return mymid;
};