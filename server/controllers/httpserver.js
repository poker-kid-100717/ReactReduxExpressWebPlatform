const express = require('express');
const path = require('path');
const secureConfig = require('../../config/security.config');
const pathConfig = require('../../config/path.config');
const devlog = require('../util/devlog');
const routes = require('../routes');

module.exports = (app) => {

  // Middleware to clear cookie when needed
  app.use((req, res, next) => {
    if (req.cookies[secureConfig.cookieName] && !req.session[secureConfig.sessionIdentifier]) {
      res.clearCookie(secureConfig.cookieName);
    }
    next();
  });

  // API Routes
  routes.forEach(configuration => {
    const { method, baseRoute, handler } = configuration
    app[method](baseRoute, handler)
  });

  // Public Files
  app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.resolve(pathConfig.publicFiles, 'favicon.ico'))
  });

  // Production Server Build
  if (process.env.MODE !== 'development') {
    app.use(express.static(pathConfig.build));
    app.get('*', (req, res) => {
      res.sendFile(path.join(pathConfig.build, 'index.html'));
    })
  }

}