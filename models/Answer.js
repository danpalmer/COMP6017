var User = require('./User');
var Comment = require('./Comment');

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
                    // TODO: return user representation or link
                    // TODO: return question representation or link
                    content: this.content,
                    dateCreated: this.dateCreated,
                    dateModified: this.dateModified,
                    href: this.href(),
                    id: this.id
                };
            },
            renderShort: function () {
                return {
                    // TODO: return user representation or link
                    // TODO: return question representation or link
                    content: this.content,
                    dateCreated: this.dateCreated,
                    dateModified: this.dateModified,
                    href: this.href(),
                    id: this.id
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

