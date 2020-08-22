const pathConfig = require('../../config/path.config');
const jsonfile = require('jsonfile');

module.exports = () => {
  const users = jsonfile.readFileSync(pathConfig.temporaryUserDatabase);
  return users;
}