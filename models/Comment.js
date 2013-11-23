var User = require('./User');

module.exports.define = function(db, models) {
  Comment = db.define('comment', {
    content:      { type: 'text' },
    dateCreated:  { type: 'date', time: true },
    dateModified: { type: 'date', time: true }
  });

  Comment.hasOne('author', models.user);

  return Comment;
};

