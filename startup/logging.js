require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function() {
  // handle uncaught exceptions exceptions and promise rejections outside of express
  winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  // configure logging for unhandled errors in express
  winston.add(winston.transports.File, { filename: 'logfile.log' });
  winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/coursely',
    level: 'error'
  });
};
