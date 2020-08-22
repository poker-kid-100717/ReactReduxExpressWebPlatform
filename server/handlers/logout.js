const sendSuccessResponse = require('../api/success-response');
const sendErrorResponse = require('../api/error-response');
const session = require('../services/session');

module.exports = (req, res) => {
  session.logoutUser(req)
    .then(() => sendSuccessResponse(res))
    .catch(() => sendErrorResponse(res, 403, 'Invalid Session Token', 'Unable to locate a user session, please try again.'));
}
