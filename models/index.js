var Question = require('./Question');
var Answer = require('./Answer');
var Comment = require('./Comment');
var User = require('./User');

module.exports.define = function(db, models, next) {
  models.user = User.define(db, models);
  models.comment = Comment.define(db, models);
  models.question = Question.define(db, models);
  models.answer = Answer.define(db, models);
  db.sync(next);
};