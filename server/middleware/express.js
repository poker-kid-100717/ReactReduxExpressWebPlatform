const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const morgan = require('morgan');
const pathConfig = require('../../config/path.config');
const secureConfig = require('../../config/security.config');
const serverConfig = require('../../config/server.config');

module.exports = (app) => {
  if (serverConfig.allowCORS && process.env.MODE === 'development') {
    app.use(cors({
      origin: `http://localhost:${serverConfig.ports.webpack}`,
      credentials: true,
    }));
  }
  app.use(express.static(pathConfig.build));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.use(session({
    key: secureConfig.cookieName,
    secret: 'PtA823az988op03y7cx01hy987ghj3nkf',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      expires: secureConfig.cookieAge,
    }
  }));
}
