const jsonfile = require('jsonfile');
const pathConfig = require('../../config/path.config');

module.exports = () => {
  const receipts = jsonfile.readFileSync(pathConfig.demoReceipts);
  return receipts;
}
