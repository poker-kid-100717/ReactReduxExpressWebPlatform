const searchReceipts = require('../util/searchReceipts');
const sendSuccessResponse = require('../api/success-response');
const sendErrorResponse = require('../api/error-response');
const validateSession = require('../util/validation/validateSession');

module.exports = (req, res) => {
  const sessionValid = validateSession(req, req.query.sessionToken);

  if (sessionValid) {
    const search = searchReceipts();
    sendSuccessResponse(res, {
      search,
    });
  } else {
    sendErrorResponse(res, 403, 'Invalid session', 'Session no longer valid, please log in again.');
  }
  
}