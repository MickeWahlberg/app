var express = require('express');
//var stormpath = require('express-stormpath');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var test = require('./routes/test');
var users = require('./routes/users');
var garch = require('./routes/garch');
var markowitz = require('./routes/markowitz');

var app = express();
locale = require("locale");
supported = ["en", "en_US", "ja"];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(locale(supported));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/test', test);
app.use('/users', users);
app.use('/garch', garch);
app.use('/markowitz', markowitz);

// Stormpath will let you know when it's ready to start authenticating users.
//app.on('stormpath.ready', function () {
 // console.log('Stormpath Ready!');
//});

//app.use(stormpath.init(app, {
// client: {
//    apiKey: {
//      file: '~/.stormpath/apiKey-2Z935FTTKBV65ZJDF0KJW4HFG.properties'
//    }
// },
// application: {
//   href: 'https://api.stormpath.com/v1/applications/6Ocl8DT1iVJrxzSf8qJ53R',
// }
//}));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
