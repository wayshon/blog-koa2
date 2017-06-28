const userDao = require('./UserDao');

module.exports = {
  user: new userDao()
};