// Smell Profile Module

var mongoose = require('mongoose');
var _ = require('underscore');
var Smellprofile = require('../models/SmellprofileModel.js');

/**
 * Data Service Class - Access to application DB.
 */
class SmellprofileService {
  /**
   * List - Return all records from DB.
   */
  static list() {
    // Query DB for all records.
    return Smellprofile.find({})
      .then((smells) => {
        return smells;
      }).catch((err) => {
        console.log(err);
        return err;
      });
  }

  /**
   * Find - Return specifc record from DB.
   */
  static find(id) {
    // Specify a specific ID to return.
    return Smellprofile.find({
        _id: id
      })
      .then((smell) => {
        return smell;
      }).catch((err) => {
        console.log(err);
        return err;
      });
  }

  /**
   * Create - Make a new record in the DB.
   */
  static create(data) {
    var smell = new Smellprofile(data);
    return smell.save()
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  /**
   * Update - Change a record in the DB.
   */
  static update(id, data) {
    return Smellprofile.findById(id)
      .then((smell) => {
        smell.set(data);
        smell.save();
        return smell;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  /**
   * Delete - Remove a record form the DB.
   */
  static delete(id) {
    return Smellprofile.remove({
        _id: id
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
}

// Export
module.exports.SmellprofileService = SmellprofileService;