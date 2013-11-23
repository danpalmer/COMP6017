var User = require('./User');
var Comment = require('./Comment');

module.exports.define = function(db, models) {
  Answer = db.define('answer', {
    content:      { type: 'text' },
    dateCreated:  { type: 'date', time: true },
    dateModified: { type: 'date', time: true }
  });

  Answer.hasOne('author', models.user);
  Answer.hasMany('comments', models.comment);

  return Answer;
};

