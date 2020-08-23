const uuid = require('uuid');
const jsonfile = require('jsonfile');
const sendSuccessResponse = require('../api/success-response');
const sendErrorResponse = require('../api/error-response');
const getUsers = require('../util/getUsers');
const email = require('../services/email');
const links = require('../services/links');
const securityConfig = require('../../config/security.config');
const pathConfig = require('../../config/path.config');

module.exports = (req, res) => {
  if (req.body.email) {
    const users = getUsers();
    const foundEmailIndex = users.findIndex(f => f.email === req.body.email);
    
    if (foundEmailIndex !== -1) {
      const uid = uuid.v4();
      const newUsers = [ ...users ];
      newUsers[foundEmailIndex].lastPasswordRequestDate = new Date().getTime();
      newUsers[foundEmailIndex].passwordResetToken = uid;
      jsonfile.writeFileSync(pathConfig.temporaryUserDatabase, newUsers, { EOL: '\r\n', spaces: 4 });

      const resetLink = links.generatePasswordResetLink(uid);
      if(req.body.email === false)
      {
        res.redirect(`/prf-reset/${temporaryResetToken}`)
      }
      email.send(req.body.email, 'Password Reset Link', `<h2>Pilot Password Reset</h2><br /><p>Click <a href="${resetLink}">here</a> to reset your password.</p><p><b>This link expires in ${securityConfig.passwordResetLinkExpiration / 60000} minutes.</b></p>`)
        .then(() => {
          sendSuccessResponse(res, {});
        })
        .catch(() => {
          sendErrorResponse(res, 500, 'Email send failed', 'Error sending email, please try again.');
        });
    } else {
      sendErrorResponse(res, 404, 'User not found', 'There does\'t appear to be a user with that email registered.');
    }
  } else {
    sendErrorResponse(res, 400, 'Bad request', 'Having trouble sending email at this time, please try again later.');
  }
}