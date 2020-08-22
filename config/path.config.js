const path = require('path');

const root = path.join(__dirname, '..');
const client = path.join(root, 'client');
const src = path.join(client, 'src');
const build = path.join(root, 'build');
const globals = path.join(root, 'globals');
const publicFiles = path.join(client, 'public');
const template = path.join(src, 'index.html');
const demoData = path.join(root, 'demo-data');
const temporaryUserDatabase = path.join(demoData, 'users.json');
const demoReceipts = path.join(demoData, 'receipts.json');
const components = path.join(src, 'components');
const searchReceipts = path.join(components, 'Home');

module.exports = {
  root,
  client,
  src,
  build,
  globals,
  template,
  publicFiles,
  demoData,
  temporaryUserDatabase,
  demoReceipts,
  components,
  searchReceipts,
}