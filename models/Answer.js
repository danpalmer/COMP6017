var User = require('./User');
var Comment = require('./Comment');
var utils = require('../util.js');

module.exports.define = function (db, models) {
    var Answer = db.define('answer', {
        content:      { type: 'text' },
        dateCreated:  { type: 'date', time: true },
        dateModified: { type: 'date', time: true }
    }, {
        autoFetch: true,
        methods: {
            renderLong: function () {
                return {
                    author: this.author.renderLong(),
                    content: this.content,
                    dateCreated: this.dateCreated,
                    dateModified: this.dateModified,
                    href: this.href(),
                    id: this.id,
                    comments: utils.renderModels(this.comments)
                };
            },
            renderShort: function () {
                return {
                    author: this.author.renderLong(),
                    content: this.content,
                    dateCreated: this.dateCreated,
                    dateModified: this.dateModified,
                    href: this.href(),
                    id: this.id,
                    comments: this.href() + '/comment'
                };
            },
            href: function () {
                return '/question/' + this.question_id + '/answer/' + this.id;
            }
        }
    });

    Answer.hasOne('author', models.user);
    Answer.hasOne('question', models.question, { reverse: 'answers' });

    return Answer;
};

