var Question = require('./Question');
var Answer = require('./Answer');
var Comment = require('./Comment');
var User = require('./User');

module.exports.define = function(db, models, next) {
  /*
    Creation order matters.
    Comments have Users, Questions and Answers,
    Answers have Users and Quesions,
    Questions have Users,
    Users have no dependencies.
  */
  models.user = User.define(db, models);
  models.question = Question.define(db, models);
  models.answer = Answer.define(db, models);
  models.comment = Comment.define(db, models);
  db.sync(next);
};