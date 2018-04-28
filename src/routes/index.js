var express = require('express');
var router = express.Router();

/**
 * Get homepage (/).
 */
router.get('/', function (req, res, next) {
  res.render('test-api', {});
});

module.exports = router;