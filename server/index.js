const process = require('process');
const app = require('express')();
const http = require('http').createServer(app);
const serverConfig = require('../config/server.config');
const controllers = require('./controllers');

// Apply middleware
require('./middleware/express')(app);

// Start Routes
controllers.httpServer(app);

// Start Server
const port = process.env.MODE === 'development' ? serverConfig.ports.dev : serverConfig.ports.prod;

http.listen(port, () => {
  if (process.env.MODE === 'development') {
    console.log('Server Ready ✔️');
    console.log(`Mode: development ✔️`);
    console.log(`API/Server Port: ${port} ✔️`);
    console.log(`Webpack Port: ${serverConfig.ports.webpack} ✔️`);
  } else {
    console.log(`Server Running in production on port: ${port}`);
  }
})
