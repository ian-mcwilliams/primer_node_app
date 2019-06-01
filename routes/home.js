const asyncMiddleware = require('../middleware/async');
const express = require('express');
const router = express.Router();

router.get('/', asyncMiddleware((req, res) => {
  res.send('Hello World!!!');
}));

module.exports = router;
