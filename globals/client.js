const constants = require('./constants')
const apiRoutes = require('./api')
const process = require('process')
const clientConfig = require('../config/client.config');
const clientRoutes = require('./client-routes');
const serverConfig = require('../config/server.config');

module.exports = {
  '_mode': JSON.stringify(process.env.MODE),
  '_constants': JSON.stringify(constants),
  '_api': JSON.stringify(apiRoutes),
  '_routes': JSON.stringify(clientRoutes),
  '_config': JSON.stringify(clientConfig),
  '_serverConfig': JSON.stringify(serverConfig),
}