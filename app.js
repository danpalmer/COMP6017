
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
var user = require('./routes/user');
var question = require('./routes/question');
var answer = require('./routes/answer');
var comment = require('./routes/comment');


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

/* URL Parameter Names:
    :uid - User Id,
    :qid - Question Id,
    :cid - Comment Id,
    :aid - Answer Id,
    :rid - Resource Id, where the Resource is unknown by the comment model
*/

app.get('/', routes.index);

app.get('/user', user.list);
app.post('/user', user.create);

app.get('/user/:uid', user.get);
app.put('/user/:uid', user.update);
app.head('/user/:uid', user.get);
app.delete('/user/:uid', user.del);

app.get('/question', question.list);
app.post('/question', question.create);

app.get('/question/:qid', question.get);
app.put('/question/:qid', question.update);
app.head('/question/:qid', question.get);
app.delete('/question/:qid', question.del);

app.get('/question/:rid/comment', comment.list.bind(this, 'question'));
app.post('/question/:rid/comment', comment.create.bind(this, 'question'));

app.get('/question/:rid/comment/:cid', comment.get.bind(this, 'question'));
app.put('/question/:rid/comment/:cid', comment.update.bind(this, 'question'));
app.head('/question/:rid/comment/:cid', comment.get.bind(this, 'question'));
app.delete('/question/:rid/comment/:cid', comment.del.bind(this, 'question'));

app.get('/question/:qid/answer', answer.list);
app.post('/question/:qid/answer', answer.create);

app.get('/question/:qid/answer/:aid', answer.get);
app.put('/question/:qid/answer/:aid', answer.update);
app.head('/question/:qid/answer/:aid', answer.get);
app.delete('/question/:qid/answer/:aid', answer.del);

app.get('/question/:qid/answer/:rid/comment', comment.list.bind(this, 'answer'));
app.post('/question/:qid/answer/:rid/comment', comment.create.bind(this, 'answer'));

app.get('/question/:qid/answer/:rid/comment/:cid', comment.get.bind(this, 'answer'));
app.put('/question/:qid/answer/:rid/comment/:cid', comment.update.bind(this, 'answer'));
app.head('/question/:qid/answer/:rid/comment/:cid', comment.get.bind(this, 'answer'));
app.delete('/question/:qid/answer/:rid/comment/:cid', comment.del.bind(this, 'answer'));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
