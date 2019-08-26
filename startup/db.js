const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = async function() {
  const hostname = config.get('mongo.hostname');
  const port = config.get('mongo.port');
  const dbName = config.get('dbName');
  const db = `mongodb://${hostname}:${port}/${dbName}`;
  winston.info(`Connecting to db via url: ${db}`);
  try {
    await mongoose.connect(db);
    winston.info(`Connected to ${db}...`);
  } catch(e) {
    winston.error(e);
  }
};
