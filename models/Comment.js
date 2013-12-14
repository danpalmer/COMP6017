var User = require('./User');

module.exports.define = function (db, models) {
    var Comment = db.define('comment', {
        content:      { type: 'text' },
        dateCreated:  { type: 'date', time: true },
        dateModified: { type: 'date', time: true }
    }, {
        autoFetch: true,
        methods: {
            renderLong: function () {
                return {
                    content: this.content,
                    dateCreated: this.dateCreated,
                    dateModified: this.dateModified,
                    author: this.author_id,
                    href: this.href(),
                    id: this.id,
                    user: this.author.renderLong()
                };
            },
            renderShort: function () {
                return this.renderLong();
            },
            href: function () {
                var url, answer;
                if (this.answer_id) {
                    answer = this.getAnswer();
                    url = '/question/' + answer.question_id +
                                '/answer/' + answer.id +
                                '/comment/' + this.id;
                } else {
                    url = '/question/' + this.question_id +
                                '/comment/' + this.id;
                }
                return url;
            }
        }
    });

    Comment.hasOne('author', models.user, { reverse: 'comments' });
    Comment.hasOne('question', models.question, { reverse: 'comments' });
    Comment.hasOne('answer', models.answer, { reverse: 'comments' });

    return Comment;
};

