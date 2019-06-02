const winston = require('winston');

module.exports = (err, req, res, next) => {
  winston.error(err.message, err);

  // using "if (err)" so that next parameter is not unused and so no commit warning
  if (err) res.status(500).send('Something failed.');
  next();
};