const express = require('express');
const auth = require('../routes/auth');
const courses = require('../routes/courses');
const customers = require('../routes/customers');
const error = require('../middleware/error');
const home = require('../routes/home');
const users = require('../routes/users');

module.exports = function(app) {
  app.use(express.json());
  app.use('/', home);
  app.use('/api/auth', auth);
  app.use('/api/courses/', courses);
  app.use('/api/customers/', customers);
  app.use('/api/users/', users);
  app.use(error);
};
