
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var orm = require('orm');
var models = require('./models');
var validate = require('express-validator');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(orm.express('sqlite://database.db', models));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(validate());
app.use(function(req, res, next) {
  req.uri = req.protocol + '://' + req.get('host') + req.url;
  next();
});

app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
// app.get('/index.:format?', routes.index);

// app.get('/collections.:format?', collections.list);
// app.post('/collections.:format?', collections.create);

// app.get('/collections/:id.:format?', collections.collection);
// app.get('/collections/:cid/images.:format?', images.list);
// app.get('/collections/:cid/images/:id.:format?', images.image);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
