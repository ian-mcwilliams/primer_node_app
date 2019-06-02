const config = require('config');
const winston = require('winston');

module.exports = function() {
  // ensure jwtPrivateKey is set, eg: export coursely_jwtPrivateKey=jwtPrivateKey
  if (!config.get('jwtPrivateKey')) throw new Error('jwtPrivateKey is not defined.');

  // ensure mail.password is set, eg: export coursely_mailPassword=mailPassword
  if (!config.get('mail.password')) throw new Error('mail.password is not defined.');

  winston.info(`Application Name: ${config.get('name')}`);
  winston.info(`Mail Server: ${config.get('mail.host')}`);
  winston.info(`Mail Password: ${config.get('mail.password')}`);
};
