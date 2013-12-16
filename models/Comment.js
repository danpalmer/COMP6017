var User = require('./User');

module.exports.define = function (db, models) {
    var Comment = db.define('comment', {
        content:      { type: 'text' },
        dateCreated:  { type: 'date', time: true },
        dateModified: { type: 'date', time: true }
    }, {
        autoFetch: true,
        autoFetchLimit: 2,
        methods: {
            renderLong: function () {
                return {
                    content: this.content,
                    dateCreated: this.dateCreated,
                    dateModified: this.dateModified,
                    id: this.id,
                    _links: {
                        self: { href: this.href() },
                        parent: { href: this.parent().href() }
                    },
                    _embedded: {
                        author: this.author.renderLong()
                    }
                };
            },
            renderShort: function () {
                return this.renderLong();
            },
            href: function () {
                var url, answer;
                if (this.answer_id) {
                    url = '/question/' + this.answer.question_id +
                                '/answer/' + this.answer_id +
                                '/comment/' + this.id;
                } else {
                    url = '/question/' + this.question_id +
                                '/comment/' + this.id;
                }
                return url;
            },
            parent: function () {
                if (this.answer_id) {
                    return this.answer;
                }
                return this.question;
            }
        }
    });

    Comment.hasOne('author', models.user, { reverse: 'comments' });
    Comment.hasOne('question', models.question, { reverse: 'comments' });
    Comment.hasOne('answer', models.answer, { reverse: 'comments' });

    return Comment;
};

