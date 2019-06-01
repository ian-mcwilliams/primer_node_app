const mongoose = require('mongoose');
const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const express = require('express');
const app = express();
const auth = require('./routes/auth');
const error = require('./middleware/error');
const home = require('./routes/home');
const courses = require('./routes/courses');
const customers = require('./routes/customers');
const users = require('./routes/users');
debug(courses);
debug(customers);
const port = process.env.PORT || 3000;

// ensure jwtPrivateKey is set
if (!config.get('jwtPrivateKey')) {
  debug('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/coursely')
  .then(() => debug('Connected to MongoDB...'))
  .catch(err => debug('ERROR - Could not connect to MongoDB...', err));

app.use(express.json());
// use helmet security features for express app
app.use(helmet());
app.use('/', home);
app.use('/api/auth', auth);
app.use('/api/courses/', courses);
app.use('/api/customers/', customers);
app.use('/api/users/', users);
app.use(error);

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
