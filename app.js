var express = require('express');
var app = express();
var glob = require('glob');
var main = './public/';
var bootstrap = './node_modules/bootstrap/dist/';
var logger = require('morgan');
app.use(logger('dev'));
const routes = [
  '/',
  '/menu',
  '/signin',
  '/signup',
  '/about',
  '/play',
  '/scores',
  '/logout'
];

routes.forEach(r => {
  app.use(r, express.static(main));
});

app.use('/css', express.static(bootstrap + 'css'));
app.use('/js', express.static(bootstrap + 'js'));
app.use('/css', express.static('./public/css'));
app.use('/img', express.static('./public/img'));

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup
var path = require('path');
app.set('views', path.normalize(__dirname + '/') + 'views/templates');
app.set('view engine', 'ejs');

// var renderer = glob.sync(path.normalize(__dirname +'/views/templates/header/header.js'));
// renderer.forEach(function(render){
//   require(render)(app);
// });

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
