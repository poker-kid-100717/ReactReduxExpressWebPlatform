const sendSuccessResponse = require('../api/success-response');
const sendErrorResponse = require('../api/error-response');
const securityConfig = require('../../config/security.config');
const authUserModel = require('../models/authUser');

module.exports = (req, res) => {
  if (
    req.cookies[securityConfig.cookieName]
    && req.session[securityConfig.sessionIdentifier]
    && req.session[securityConfig.sessionIdentifier].sessionToken
    && req.session[securityConfig.sessionIdentifier].sessionToken === req.query.sessionToken
  ) {
    const {
      authUser,
      expiresAt,
      sessionToken,
    } = req.session[securityConfig.sessionIdentifier];

    sendSuccessResponse(res, {
      authUser: authUserModel(authUser),
      expiresAt,
      sessionToken,
    });
  } else {
    sendErrorResponse(res, 403, 'Invalid auth session', 'Session not found, please login.');
  }
}