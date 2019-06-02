const mongoose = require('mongoose');
const winston = require('winston');

module.exports = async function() {
  await mongoose.connect('mongodb://localhost/coursely');
  winston.info('Connected to MongoDB...');
};
