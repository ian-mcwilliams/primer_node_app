const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const express = require('express');
const app = express();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
const port = process.env.PORT || 3000;

// ensure jwtPrivateKey is set, eg: export coursely_jwtPrivateKey=jwtPrivateKey
if (!config.get('jwtPrivateKey')) throw new Error('jwtPrivateKey is not defined.');

// ensure mail.password is set, eg: export coursely_mailPassword=mailPassword
if (!config.get('mail.password')) throw new Error('mail.password is not defined.');



// use helmet security features for express app
app.use(helmet());

// Configuration
debug(`Application Name: ${config.get('name')}`);
debug(`Mail Server: ${config.get('mail.host')}`);
// if the following line errors it may be because the password environment variable needs to be added
// in the terminal window, eg: export app_password=1234
debug(`Mail Password: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...')
}

app.use(logger);

app.listen(port, () => console.log(`Listening on port ${port}...`));
