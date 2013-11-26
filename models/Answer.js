var User = require('./User');
var Comment = require('./Comment');

module.exports.define = function(db, models) {
  Answer = db.define('answer', {
    content:      { type: 'text' },
    dateCreated:  { type: 'date', time: true },
    dateModified: { type: 'date', time: true }
  }, {
    methods: {
      render: function() {
        return {
          // TODO: return user representation or link
          // TODO: return question representation or link
          content: this.content,
          dateCreated: this.dateCreated,
          dateModified: this.dateModified,
          href: '/question/' + this.question_id + '/answer/' + this.id,
          id: this.id
        }
      }
    }
  });

  Answer.hasOne('author', models.user);
  Answer.hasOne('question', models.question);

  return Answer;
};

