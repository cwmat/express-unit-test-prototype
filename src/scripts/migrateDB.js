// For testing only, do not run once live as this will delete the DB.  Adds data foundation.
var mongoose = require('mongoose');
var Smellprofile = require('../models/SmellprofileModel.js');
var _ = require('underscore');

require('dotenv').config();

// Connect to DB
try {
  mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_INSTANCE}/${process.env.DB_NAME}?ssl=true&replicaSet=cscie31-shard-0&authSource=admin`);
} catch (err) {
  console.log(err);
  process.exit();
}
var db = mongoose.connection;
db.on('error', (err) => {
  console.error('connection error:${err}');
  process.exit();
})

// Drop exisitng test records
Smellprofile.find({}).remove().exec();

// Create starter data
var c1 = new Smellprofile({
  name: 'ajarvis',
  type: "Good",
  desc: "Dryer sheets, with a hint of jasmine. Very subtle but it has lingered for some time now.",
  lat: 37.51,
  long: -77.44
});
var c2 = new Smellprofile({
  name: 'kchang',
  type: "Bad",
  desc: "A smell most foul! Post-rain sewer runoff mixed with old socks.",
  lat: 37.54,
  long: -77.46
});
var c3 = new Smellprofile({
  name: 'gmcjeanie',
  type: "Neutral",
  desc: "Sort of chemically... I can't say it was bad, but it wasn't good either.",
  lat: 37.54,
  long: -77.43
});
var c4 = new Smellprofile({
  name: 'ajarvis',
  type: "Bad",
  desc: "Yuck!  This is terrible.  Rotten meat!",
  lat: 37.55,
  long: -77.45
});
var c5 = new Smellprofile({
  name: 'gmcjeanie',
  type: "Bad",
  desc: "I think there may be a dead possum nearby or something...",
  lat: 37.53,
  long: -77.44
});
var newC = [c1, c2, c3, c4, c5];

// Add each record to DB
_.each(newC, (d) => {
  d.save((err, c) => {
    if (err) {
      console.log(err)
    }
    console.log("saved character!");
    console.log(c);
  });
});