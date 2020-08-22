const sendmail = require('sendmail')();
const devlog = require('../util/devlog');

const send = (
  to,
  subject,
  html,
  from = 'no-reply@pilot-test-app.com',
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