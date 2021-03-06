var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/getWeather/', function(req, res, next) {
  request("http://api.openweathermap.org/data/2.5/weather?lat="+req.query.lat+"&lon="+req.query.lon+"&APPID=2a1dfced24bf88fa9d326596f4c84973", // THIS API-KEY IS INVALID
          function(err, apiRes, apiBody) {
            res.send(apiRes);
          });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.send('An error occurred: ' + err.message);
//   });
// }

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('An error occurred: ' + err.message);
});

app.listen(process.env.PORT || 3000, console.log('Server is running...'));

module.exports = app;
