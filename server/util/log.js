const process = require('process')

const logToConsole = message => {
  process.stdout.write(`${message}\n`)
}

module.exports = {
  logToConsole
}