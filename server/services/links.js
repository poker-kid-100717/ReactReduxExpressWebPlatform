const routes = require('../../globals/client-routes');
const serverConfig = require('../../config/server.config');

const {
  protocol,
  domain,
  ports,
} = serverConfig;

const isDev = process.env.MODE === 'development';

const port = isDev
  ? ports.webpack
  : (
    [ 80 ].includes(ports.prod)
      ? false
      : ports.prod
  )

const generatePasswordResetLink = uuid => `${protocol}://${domain}${port ? `:${port}` : ''}${routes.resetPassword}/${uuid}`;

module.exports = {
  generatePasswordResetLink,
}
