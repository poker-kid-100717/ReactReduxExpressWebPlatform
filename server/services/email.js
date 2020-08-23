const sendmail = require('sendmail')({  
  logger: {
  debug: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error
  },

silent: false,

smtpPort: 2525, // Default: 25
smtpHost: 'localhost' // Default: -1 - extra smtp host after resolveMX
})

const devlog = require('../util/devlog');

const send = (
  to,
  subject,
  html,
  from = 'no-reply@pilottravelcenters.com',
) => new Promise((resolve, reject) => {
  sendmail({
    from,
    to,
    subject,
    html,
  }, (err, reply) => {
    if (err) {
      devlog(err);
      reject(err);
    } else {
      devlog(reply);
      resolve(reply);
    }
  })
});

module.exports = {
  send,
}