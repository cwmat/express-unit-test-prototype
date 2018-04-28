var mongoose = require('mongoose');

/**
 * Smellprofile schema.
 */
var smellprofileSchema = mongoose.Schema({
    name: {
      type: String,
      requried: true
    },
    type: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    lat: {
      type: Number,
      required: true
    },
    long: {
      type: Number,
      required: true
    }
  });
  
  // Create Model
  var Smellprofile = mongoose.model('Smellprofile', smellprofileSchema);

  // Export
  module.exports = Smellprofile;