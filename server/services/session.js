const securityConfig = require('../../config/security.config');

const {
  sessionIdentifier,
  cookieName,
} = securityConfig;

const logoutUser = req => new Promise((resolve, reject) => {
  if (
    req.cookies[cookieName]
    && req.session[sessionIdentifier]
    && req.session[sessionIdentifier].sessionToken
    && req.session[sessionIdentifier].sessionToken === req.body.sessionToken
  ) {
    req.session.destroy();
    resolve();
  } else {
    reject();
  }
});

module.exports = {
  logoutUser,
}
