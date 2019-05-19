const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./logger');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const port = process.env.PORT || 3000;

app.use(express.json());
// use helmet security features for express app
app.use(helmet());
app.use('/api/courses/', courses);

// Configuration
debug(`Application Name: ${config.get('name')}`);
debug(`Mail Server: ${config.get('mail.host')}`);
debug(`Mail Password: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...')
}

app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
