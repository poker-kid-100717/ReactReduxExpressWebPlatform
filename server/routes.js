const apiRoutes = require('../globals/api')
const handlers = require('./handlers')
const { POST, GET } = require('../globals/constants').api

module.exports = [
  {
    name: 'Search Receipts',
    baseRoute: apiRoutes.search,
    method: POST,
    handler: handlers.searchReceipts,
  },
  {
    name: 'Reset Password',
    baseRoute: apiRoutes.resetPassword,
    method: POST,
    handler: handlers.resetPassword,
  },
  {
    name: 'Forgot Password Email Request',
    baseRoute: apiRoutes.forgotPasswordEmail,
    method: POST,
    handler: handlers.forgotPasswordEmail,
  },
  {
    name: 'Login',
    baseRoute: apiRoutes.login,
    method: POST,
    handler: handlers.login,
  },
  {
    name: 'Logout',
    baseRoute: apiRoutes.logout,
    method: POST,
    handler: handlers.logout,
  },
  {
    name: 'Verify Auth User',
    baseRoute: apiRoutes.verifyAuthUser,
    method: GET,
    handler: handlers.verifyAuthUser,
  },
  {
    name: 'Get Receipts',
    baseRoute: apiRoutes.receipts,
    method: GET,
    handler: handlers.getReceipts,
  }
]