var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var HttpError = require('./error/index').HttpError;
var errorHandler = require('express-error-handler');
var config = require('./config');
var mongoose = require('./lib/mongoose');
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var sessionStore = require('./lib/sessionStore');

app.use(session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  store: sessionStore // объект который умеет загружать/сохранять сессии
})); //connect.sid - cookie for user when it came first

app.use(require('./middleware/sendHttpError'));
app.use(require('./middleware/loadUser'));
require('./routes')(app);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
  if (typeof err == 'number') { // next(404);
    err = new HttpError(err);
  }

  if (err instanceof HttpError) {
    res.sendHttpError(err);
  } else {
    if (app.get('env') == 'development') {
      errorHandler()(err, req, res, next);
    } else {
      log.error(err);
      err = new HttpError(500);
      res.sendHttpError(err);
    }
  }
});

module.exports = app;
