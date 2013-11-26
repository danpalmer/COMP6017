var User = require('./User');

module.exports.define = function(db, models) {
  Comment = db.define('comment', {
    content:      { type: 'text' },
    dateCreated:  { type: 'date', time: true },
    dateModified: { type: 'date', time: true }
  }, {
    methods: {
      render: function() {
        var url;
        if (this.answer_id) {
          var answer = this.getAnswer();
          url = '/question/' + answer.question_id +
                '/answer/' + answer.id +
                '/comment/' + this.id;
        } else {
          url = '/question/' + this.question_id +
                '/comment/' + this.id;
        }
        return {
          // TODO: return user representation or link?
          content: this.content,
          dateCreated: this.dateCreated,
          dateModified: this.dateModified,
          author: this.author_id,
          href: url,
          id: this.id
        }
      }
    }
  });

  Comment.hasOne('author', models.user);
  Comment.hasOne('question', models.question);
  Comment.hasOne('answer', models.answer);

  return Comment;
};

