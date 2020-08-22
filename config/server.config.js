const process = require('process');

module.exports = {
  allowCORS: process.env.MODE === 'development' ? true : false,
  protocol: 'http',
  domain: 'localhost',
  ports: {
    webpack: 9000,
    dev: 9001,
    prod: 80,
  },
}