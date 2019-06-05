const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const winston = require('winston');
const express = require('express');
const app = express();

winston.info('Starting Coursely...');

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config');
const port = process.env.PORT || 3000;


// use helmet security features for express app
app.use(helmet());

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  winston.info('Morgan enabled...');
}

app.use(logger);

app.listen(port, () => console.log(`Listening on port ${port}...`));
