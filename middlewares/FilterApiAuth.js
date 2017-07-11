const jwt = require("jsonwebtoken"),
      config = require("../config");

module.exports = async (ctx, next) => {

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
      await next();
    }
}