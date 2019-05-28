module.exports = require('../../index')(module, {
  extensions: ['.js', '.json'],
  blacklist: ['test.json']
});
