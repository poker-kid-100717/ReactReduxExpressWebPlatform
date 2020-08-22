const { v4 : uuidv4 } = require('uuid');

const secureConfig = require('../../config/security.config');
const getUsers = require('../util/getUsers');
const sendSuccessResponse = require('../api/success-response');
const sendErrorResponse = require('../api/error-response');
const sha256Hmac = require('../util/sha256Hmac');
const authUserModel = require('../models/authUser');

module.exports = (request, response) => {
  if (request.body.username && request.body.password) {
    const {
      username,
      password,
    } = request.body;

    const users = getUsers();
    const foundUser = users.find(x => x.username === username || x.email === username);
    if (foundUser) {
      const providedPassword = sha256Hmac(foundUser.secret, password);
      if (providedPassword === foundUser.password) {
        const sid = uuidv4();
        const expiresAt = new Date().setTime(new Date().getTime() + secureConfig.cookieAge);
        const { password, secret, ...serverAuthUser } = foundUser;
        request.session[secureConfig.sessionIdentifier] = {
          authUser: serverAuthUser,
          expiresAt,
          sessionToken: sid,
        }
        sendSuccessResponse(
          response,
          {
            message: 'Login Success',
            userMessage: `Welcome back ${foundUser.name.first}!`,
            sessionToken: sid,
            expiresAt,
            authUser: authUserModel(foundUser),
          }
        )
      } else {
        sendErrorResponse(
          response,
          403,
          'Password authentication failed',
          'Login failed, please check username/email and password and try again.'
        )
      }
    } else {
      sendErrorResponse(
        response,
        403,
        'Authentication failed',
        'Login failed, please check username/email and password and try again.'
      );
    }
  }
}
