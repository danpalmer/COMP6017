module.exports.define = function (db, models) {
    var Question = db.define('question', {
        title:        { type: 'text', size: 50 },
        content:      { type: 'text' },
        dateCreated:  { type: 'date', time: true },
        dateModified: { type: 'date', time: true }
    }, {
        methods: {
            render: function () {
                return {
                    // TODO: return user representation or link
                    // TODO: return answer representations or links
                    // TODO: return comments representations or links
                    title: this.title,
                    content: this.content,
                    dateCreated: this.dateCreated,
                    dateModified: this.dateModified,
                    href: '/question/' + this.id,
                    id: this.id
                };
            }
        }
    });

    Question.hasOne('author', models.user);

    return Question;
};

