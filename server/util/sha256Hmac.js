const crypto = require('crypto');

//! IMPORTANT, sha256 Hmac secrets are not what need to be used in production, you should salt and hash.
module.exports = (secret, password) => crypto.createHmac('sha256', secret).update(password).digest('hex');
