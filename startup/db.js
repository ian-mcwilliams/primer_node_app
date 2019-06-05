const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = async function() {
  const db = config.get('db');
  await mongoose.connect(db);
  winston.info(`Connected to ${db}...`);
};
