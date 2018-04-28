var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var mongoose = require('mongoose');
require('dotenv').config();

var indexRoute = require('./routes/index');
var aboutRoute = require('./routes/about');
var apismellmap = require('./routes/api/api-smellmap')

// Create Express application
var app = express();

// DB Connection
mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_INSTANCE}/${process.env.DB_NAME}?ssl=true&replicaSet=cscie31-shard-0&authSource=admin`);
var db = mongoose.connection;
db.on('error', (err) => {
  console.error('connection error:${err}');
})

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Add middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('medwynn goodall'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

// Static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/data')));

// Routes
app.use('/', indexRoute);
app.use('/about', aboutRoute);
app.use('/api/smellmap', apismellmap);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Export
module.exports = app;
