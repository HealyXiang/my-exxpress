var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var socket = require('./socket/websocket.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var requestTime = function(req, res, next) {
  req.requestTime = Date.now()
  next()
};

app.use(requestTime);

const testMiddleware = (req, res, next) => {
  let str = 'This is from middleware!';
  req.str = str;
  next();
}
const settingMiddleware = (req, res, next) => {
  res.cookie('name', 'User');
  res.send({});
}

app.get('/api/settings', settingMiddleware);

app.get('/time', testMiddleware)

app.get('/time', function(req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText + req.str)
})

app.all('/secret', function(req, res, next) {
  // console.log('Accessing the secret section ...')
  next() // pass control to the next handler
});
app.get('/about', function(req, res) {
  // res.send('GET request to the homepage');
  res.render('index', { title: '这是新的title' });
});
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd')
})
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params);
})
app.get('/api/ajax', (req, res) => {
  res.send({data: 'ajax success', nested_data: {under_data: 'this for test underline'}});
})
app.post('/api/post', (req, res) => {
  console.log('req in post:', req.body);
  res.send({
    data: 'post success',
    nested_data: {
      under_data: 'this for test post underline'
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // console.log(req);
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

module.exports = app;