const secureConfig = require('../../../config/security.config');

module.exports = (req, sessionToken) => {
  const { sessionIdentifier, cookieName } = secureConfig;
  if (
    req.session[sessionIdentifier]
    && sessionToken
    && req.cookies[cookieName]
    && req.session[sessionIdentifier].sessionToken === sessionToken
  ) {
    return req.session[sessionIdentifier]
  }

  return false;
}
