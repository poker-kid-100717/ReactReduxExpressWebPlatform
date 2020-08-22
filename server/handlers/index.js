const login = require('./login');
const logout = require('./logout');
const resetPassword = require('./resetPassword');
const verifyAuthUser = require('./verifyAuthUser');
const getReceipts = require('./getReceipts');
const forgotPasswordEmail = require('./forgotPasswordEmail');
const searchReceipts = require('./searchReceipts');

module.exports = {
  login,
  logout,
  resetPassword,
  verifyAuthUser,
  searchReceipts,
  getReceipts,
  forgotPasswordEmail,
}
