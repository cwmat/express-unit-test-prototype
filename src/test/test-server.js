// Set to test env with a test DB
process.env.NODE_ENV = 'test';
process.env.DB_NAME = 'smellmapdev-testing';

// Imnport modules
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = require('chai').expect
var Smellprofile = require('../models/SmellprofileModel');

// Activate Chai HTTP
chai.use(chaiHttp);

/**
 * REST API Test Suite
 */
describe('Smells', function () {
  // clear test DB
  Smellprofile.collection.drop();

  /**
   * Before each - Add some dummy data.
   */
  beforeEach(function (done) {
    var newSmell = new Smellprofile({
      name: 'ajarvis',
      type: "Good",
      desc: "Dryer sheets, with a hint of jasmine. Very subtle but it has lingered for some time now.",
      lat: 37.51,
      long: -77.44
    });
    newSmell.save(function (err) {
      done();
    });
  });

  /**
   * After each - Clear data.
   */
  afterEach(function (done) {
    Smellprofile.collection.drop();
    done();
  });

  /**
   * Test get all.
   */
  it('should list ALL smells on /api/smellmap GET', function (done) {
    chai.request(server)
      .get('/api/smellmap')
      .end(function (err, res) {
        // Test that status succeeds and return is JSON and the body should contain an array
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        // Test that the return has the intended properties
        expect(res.body[0]).to.have.all.keys(
          '__v',
          '_id',
          'name',
          'lat',
          'long',
          'type',
          'desc');
        // Ensure data returned has correct type
        res.body[0]['name'].should.be.a.string;
        res.body[0]['lat'].should.be.a.number;
        expect(res.body[0]['lat']).to.be.within(-90, 90);
        res.body[0]['long'].should.be.a.number;
        expect(res.body[0]['long']).to.be.within(-180, 180);
        res.body[0]['type'].should.be.a.string;
        res.body[0]['desc'].should.be.a.string;
        done();
      });
  });

  /**
   * Test get one.
   */
  it('should list a SINGLE smell on /api/smellmap/<id> GET', function (done) {
    // Add data, store as var and use ID
    var newSingleSmell = new Smellprofile({
      name: 'gmcjeanie',
      type: "Neutral",
      desc: "Sort of chemically... I can't say it was bad, but it wasn't good either.",
      lat: 37.54,
      long: -77.43
    });
    newSingleSmell.save(function (err, data) {
      chai.request(server)
        .get('/api/smellmap/' + data._id)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          expect(res.body[0]).to.have.all.keys(
            '__v',
            '_id',
            'name',
            'lat',
            'long',
            'type',
            'desc');
          res.body[0]._id.should.equal(String(data._id));
          res.body[0]['name'].should.be.a.string;
          res.body[0]['lat'].should.be.a.number;
          expect(res.body[0]['lat']).to.be.within(-90, 90);
          res.body[0]['long'].should.be.a.number;
          expect(res.body[0]['long']).to.be.within(-180, 180);
          res.body[0]['type'].should.be.a.string;
          res.body[0]['desc'].should.be.a.string;
          done();
        });
    });
  });

  /**
   * Test creating via POST.
   */
  it('should add a SINGLE smell on /api/smellmap POST', function (done) {
    // Add new data and test allowable and not allowable (make sure error handling passes specific JSON response that can be tested)
    chai.request(server)
      .post('/api/smellmap')
      .send({
        name: 'kchang',
        type: "Bad",
        desc: "A smell most foul! Post-rain sewer runoff mixed with old socks.",
        lat: 37.54,
        lon: -77.46
      })
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        expect(res.body).to.have.all.keys(
          '__v',
          '_id',
          'name',
          'lat',
          'long',
          'type',
          'desc');
        res.body['name'].should.be.a.string;
        res.body['lat'].should.be.a.number;
        expect(res.body['lat']).to.be.within(-90, 90);
        res.body['long'].should.be.a.number;
        expect(res.body['long']).to.be.within(-180, 180);
        res.body['type'].should.be.a.string;
        res.body['desc'].should.be.a.string;
        done();
      });
  });

  /**
   * Test an update.
   */
  it('should update a SINGLE smell on /api/smellmap/<id> PUT', function (done) {
    var newSingleSmell = new Smellprofile({
      name: 'ajarvis',
      type: "Bad",
      desc: "Yuck!  This is terrible.  Rotten meat!",
      lat: 37.55,
      long: -77.45
    });
    newSingleSmell.save(function (err, data) {
      chai.request(server)
        .put('/api/smellmap/' + data._id)
        .send({
          name: 'aesposito',
          type: "Bad",
          desc: "I think I am going to throw up!",
          lat: 37.58,
          lon: -77.56
        })
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          expect(res.body).to.have.all.keys(
            '__v',
            '_id',
            'name',
            'lat',
            'long',
            'type',
            'desc');
          res.body._id.should.equal(String(data._id));
          res.body['name'].should.be.a.string;
          res.body['lat'].should.be.a.number;
          expect(res.body['lat']).to.be.within(-90, 90);
          res.body['long'].should.be.a.number;
          expect(res.body['long']).to.be.within(-180, 180);
          res.body['type'].should.be.a.string;
          res.body['desc'].should.be.a.string;
          res.body['name'].should.equal('aesposito');
          res.body['type'].should.equal('Bad');
          res.body['lat'].should.equal(37.58);
          res.body['long'].should.equal(-77.56);
          res.body['desc'].should.equal('I think I am going to throw up!');
          chai.request(server)
            .get('/api/smellmap/' + res.body._id)
            .end(function (err, res) {
              res.body[0]['name'].should.equal('aesposito');
              res.body[0]['type'].should.equal('Bad');
              res.body[0]['lat'].should.equal(37.58);
              res.body[0]['long'].should.equal(-77.56);
              res.body[0]['desc'].should.equal('I think I am going to throw up!');
              done();
            });
        });
    });
  });

  /**
   * Test deleting an entry.
   */
  it('should delete a SINGLE smell on /api/smellmap/<id> DELETE', function (done) {
    var newSingleSmell = new Smellprofile({
      name: 'gmcjeanie',
      type: "Bad",
      desc: "I think there may be a dead possum nearby or something...",
      lat: 37.53,
      long: -77.44
    });
    newSingleSmell.save(function (err, data) {
      chai.request(server)
        .delete('/api/smellmap/' + data._id)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          expect(res.body).to.have.all.keys(
            'n',
            'opTime',
            'electionId',
            'ok');
          done();
        });
    });
  });
  // End test suite.
});


// /**
//  * Example Tests
//  */
// expect("foo").to.be.a('string');                                            // This would pass
// expect("foo").to.equal('bar');                                              // This would fail
// expect("foo").to.have.lengthOf(3);                                          // This would pass
// expect({baz: "baz", bat: "bat"}).to.have.property('baz').with.lengthOf(3);  // This would pass

// npm install -g mocha
// npm install mocha --save-dev
// npm install chai --save-dev