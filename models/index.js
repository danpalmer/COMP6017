var Question = require('./Question');
var Answer = require('./Answer');
var Comment = require('./Comment');
var User = require('./User');

/*
    This function handles definition of each model, and is used
    as a Connect middleware by Node ORM.
*/
module.exports.define = function (db, models, next) {
    /*
        Creation order matters.
        Comments have Users, Questions and Answers,
        Answers have Users and Quesions,
        Questions have Users,
        Users have no dependencies.

        All models define the methods renderLong, renderShort and href.
        The render methods are used for returning serialisable representations
        of the models, embeddeding or linking to related resources as
        appropriate for the method. The href method is used for getting
        a link to the resource, so that the responsibility for defining the
        links is given to the resources themselves.
    */
    models.user = User.define(db, models);
    models.question = Question.define(db, models);
    models.answer = Answer.define(db, models);
    models.comment = Comment.define(db, models);
    db.sync(next);
};