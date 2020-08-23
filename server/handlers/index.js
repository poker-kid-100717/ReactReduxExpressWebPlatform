const login = require('./login');
const logout = require('./logout');
const resetPassword = require('./resetPassword');
const verifyAuthUser = require('./verifyAuthUser');
const getReceipts = require('./getReceipts');
const forgotPasswordEmail = require('./forgotPasswordEmail');

module.exports = {
  login,
  logout,
  resetPassword,
  verifyAuthUser,
  getReceipts,
  forgotPasswordEmail,
}
