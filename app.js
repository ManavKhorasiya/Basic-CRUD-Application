var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

const http = require('http');

var indexRouter = require('./api/routes/index');
var usersRouter = require('./api/routes/users');

var app = express();

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.get('/test', function(req,res,next) {
  res.send({statusMessage : "working"});
});

let port = process.env.PORT;
app.set('port',port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening on port ${port}!`);
})

process.on('exit', function() {
  console.log('exitting');
})

// process.on('uncaughtException', function(err) {
//   console.error('An uncaught error occured!');
//   console.error(err.stack);
// })

module.exports = app;
