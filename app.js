var express = require('express');
var app = express();

var main = './public/';
var bootstrap = './node_modules/bootstrap/dist/';

const routes = [
  '/',
  '/signin',
  '/signup',
  '/about',
  '/play',
  '/scores',
];

routes.forEach(r => {
  app.use(r, express.static(main));
});

app.use('/css', express.static(bootstrap + 'css'));
app.use('/js', express.static(bootstrap + 'js'));

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
