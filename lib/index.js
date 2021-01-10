const rawTable = require('./table.js');

module.exports = function rawTablePlugin(md) {
  md.block.ruler.before('table', 'raw-table', rawTable, {
    alt: ['paragraph', 'reference'],
  });
};
