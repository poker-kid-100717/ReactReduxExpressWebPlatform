const jsonfile = require('jsonfile');
const pathConfig = require('../../config/path.config');

module.exports = () => {
  const search = jsonfile.readFileSync(pathConfig.demoReceipts);
  return search;
}
