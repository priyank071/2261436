const Log = require('../../logging-middleware/logger');

const logger = {
  info: (package, message) => Log('backend', 'info', package, message),
  error: (package, message) => Log('backend', 'error', package, message),
  warn: (package, message) => Log('backend', 'warn', package, message)
};

module.exports = logger;