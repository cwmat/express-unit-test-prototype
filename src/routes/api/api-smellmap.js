var express = require('express');
var router = express.Router();
var smellprofile = require('../../controllers/smellprofile');

// Instantiate Data Service Class
const SmellprofileService = smellprofile.SmellprofileService;

/**
 * Handle CORS, pre-flights, and content-types.
 */
router.use((req, res, next) => {
  res.set({
    // Allow AJAX access from any domain
    'Access-Control-Allow-Origin': '*',
    // Allow methods and headers for 'preflight'
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers',
    // Set return content-type to JSON
    'Content-type': 'application/json',
  });
  // If this is a preflight we can send the response with our headers
  if (req.method == 'OPTIONS') {
    return res.status(200).end();
  }
  next();
})

/**
 * List - Return all records from DB.
 */
router.get('/', (req, res, next) => {
  SmellprofileService.list()
    .then((smells) => {
      console.log(`API: Found smells: ${smells}`);
      res.status(200);
      res.send(JSON.stringify(smells));
    })
    .catch(() => {
      throw new Error("DataBaseError");
    });
});

/**
 * Find - Return specifc record from DB.
 */
router.get('/:smellid', (req, res, next) => {
  SmellprofileService.find(req.params.smellid)
    .then((smell) => {
      console.log(`API: Found smell: ${smell}`);
      res.status(200);
      res.send(JSON.stringify(smell));
    })
    .catch(() => {
      throw new Error("DataBaseError");
    });
});

/**
 * Create - Make a new record in the DB.
 */
router.post('/', (req, res, next) => {
  /**
   * Check if input arg is numeric.
   * @param {String} n String/number to check if numeric.
   */
  function isNumeric(n) {
    // True if numeric, flase otherwise.
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  // Check if all params are present and that lat/long are numeric
  if (req.body.name && req.body.type && req.body.desc && req.body.lat && req.body.lon && isNumeric(req.body.lon) && isNumeric(req.body.lat)) {
    // Form data object
    var data = {
      name: req.body.name,
      type: req.body.type,
      desc: req.body.desc,
      lat: req.body.lat,
      long: req.body.lon
    }
    // Save to DB
    SmellprofileService.create(data)
      .then((returnEntry) => {
        res.status(200);
        res.send(JSON.stringify(returnEntry));
      })
      .catch(() => {
        throw new Error("DataBaseError");
      });
  } else {
    // An error occured and the data could not be updated - if statement above failed
    throw new Error("DataBaseError");
  }
});

/**
 * Update - Change a record in the DB.
 */
router.put('/:smellid', (req, res, next) => {
  /**
   * Check if input arg is numeric.
   * @param {String} n String/number to check if numeric.
   */
  function isNumeric(n) {
    // True if numeric, flase otherwise.
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  // Check if all params are present and that lat/long are numeric
  if (req.body.name && req.body.type && req.body.desc && req.body.lat && req.body.lon && isNumeric(req.body.lon) && isNumeric(req.body.lat)) {
    // Form data object
    var data = {
      name: req.body.name,
      type: req.body.type,
      desc: req.body.desc,
      lat: req.body.lat,
      long: req.body.lon
    }
    // Save to DB
    SmellprofileService.update(req.params.smellid, data)
      .then((returnEntry) => {
        res.status(200);
        res.send(JSON.stringify(returnEntry));
      })
      .catch(() => {
        throw new Error("DataBaseError");
      });
  } else {
    // An error occured and the data could not be updated - if statement above failed
    throw new Error("DataBaseError");
  }
});

/**
 * Delete - Remove a record form the DB.
 */
router.delete('/:smellid', (req, res, next) => {
  // Delete
  SmellprofileService.delete(req.params.smellid)
    .then((returnEntry) => {
      res.status(200);
      res.send(JSON.stringify(returnEntry));
    })
    .catch(() => {
      throw new Error("DataBaseError");
    });
});

/**
 * Error handling.
 */
router.use(function (err, req, res, next) {
  console.error(err.stack);
  if (err.message == "NotFound") {
    res.status(err.status || 404);
    res.render('error', {
      status: 404,
      message: err.message
    });
  } else if (err.message == "DatabaseError") {
    res.status(err.status || 500);
    res.render('error', {
      status: 500,
      message: err.message
    });
  } else {
    next(err);
  }
});


// Export
module.exports = router;