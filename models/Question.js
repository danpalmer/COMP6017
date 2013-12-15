var utils = require('../util.js');

module.exports.define = function (db, models) {
    var Question = db.define('question', {
        title:        { type: 'text', size: 50 },
        content:      { type: 'text' },
        dateCreated:  { type: 'date', time: true },
        dateModified: { type: 'date', time: true }
    }, {
        autoFetch: true,
        // We may need the authors of comments on answers...
        autoFetchLimit: 3,
        methods: {
            renderLong: function () {
                return {
                    title: this.title,
                    content: this.content,
                    dateCreated: this.dateCreated,
                    dateModified: this.dateModified,
                    id: this.id,
                    _links: {
                        self: { href: this.href() }
                    },
                    _embedded: {
                        author: this.author.renderLong(),
                        answers: utils.renderModels(this.answers),
                        comments: utils.renderModels(this.comments)
                    }
                };
            },
            renderShort: function () {
                return {
                    title: this.title,
                    content: this.content,
                    dateCreated: this.dateCreated,
                    dateModified: this.dateModified,
                    id: this.id,
                    _links: {
                        self: { href: this.href() },
                        author: { href: this.author.href() },
                        answers: { href: this.href() + '/answer' },
                        comments: { href: this.href() + '/comment' }
                    }
                };
            },
            href: function () {
                return '/question/' + this.id;
            }
        }
    });

    Question.hasOne('author', models.user);

    return Question;
};

