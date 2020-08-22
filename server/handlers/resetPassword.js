const jsonfile = require('jsonfile');

const pathConfig = require('../../config/path.config');
const getUsers = require('../util/getUsers');
const createSecret = require('../util/createSecret');
const sha256Hmac = require('../util/sha256Hmac');
const sessions = require('../services/session');
const securityConfig = require('../../config/security.config');

const sendErrorResponse = require('../api/error-response');
const sendSuccessResponse = require('../api/success-response');

module.exports = (request, response) => {
  if (request.body.resetToken && request.body.password) {
    const {
      resetToken,
      password,
    } = request.body;

    const users = getUsers();
    const foundUserIndex = users.findIndex(x => x.passwordResetToken === resetToken);
    if (foundUserIndex !== -1) {

      const userExpireTime = users[foundUserIndex].lastPasswordRequestDate + securityConfig.passwordResetLinkExpiration;
      if (new Date().getTime() > userExpireTime) {
        sendErrorResponse(response, 403, 'Token Expired', 'Reset Token Expired, please request a new password reset email.');
      } else {
        const secret = createSecret();
        const encrypted = sha256Hmac(secret, password);
        const newUserList = [ ...users ];
        newUserList[foundUserIndex] = {
          ...newUserList[foundUserIndex],
          secret,
          password: encrypted,
        }
        jsonfile.writeFile(pathConfig.temporaryUserDatabase, newUserList, { EOL: '\r\n', spaces: 2 }, err => {
          if (err) {
            sendErrorResponse(
              response,
              500,
              'Error writing user data',
              'Unknown server error, please contact customer support.'
            );
          } else {
            sessions.logoutUser(request).finally(() => sendSuccessResponse(response, {}))
          }
        });  
      }
    } else {
      sendErrorResponse(
        response,
        403,
        'Reset token not found',
        'Invalid reset token, please try again.'
      );
    }
  } else {
    sendErrorResponse(
      response,
      400,
      'Invalid request',
      'Unknown error, please contact customer support'
    )
  }
}
