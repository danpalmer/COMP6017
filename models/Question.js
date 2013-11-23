module.exports.define = function(db, models) {
  Question = db.define('question', {
    title:        { type: 'text', size: 50 },
    content:      { type: 'text' },
    dateCreated:  { type: 'date', time: true },
    dateModified: { type: 'date', time: true }
  });

  Question.hasOne('author', models.user);
  Question.hasMany('comments', models.comment);

  return Question;
};

