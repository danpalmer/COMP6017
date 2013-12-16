/*
    Route handlers relating to Question resources.
    GET -> get/list for single/multiple
    POST -> create
    PUT -> update
    DELETE -> del
*/
var utils = require('../util.js');
var _ = require('underscore');

exports.list = function (req, res) {
    req.models.question.find({}, function (err, questions) {
        res.status(200);
        if (questions.length) {
            var latest = _.max(questions, function (q) { return q.dateModified; });
            res.setHeader('Last-Modified', latest.dateModified.toUTCString());
        }
        res.json({
            _links: {
                self: { href: '/question' }
            },
            _embedded: {
                questions: utils.renderModels(questions)
            },
            count: questions.length
        });
    });
};

exports.create = function (req, res) {
    req.checkBody('content', 'content cannot be empty').notEmpty();
    req.checkBody('author_id', 'author_id must be given').isInt();
    req.checkBody('title', 'title cannot be empty').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.json(errors, 400);
    }

    req.models.user.get(req.body.author_id, function (err, user) {
        if (!user) {
            res.status(400);
            return res.json(err);
        }
        req.models.question.create({
            title: req.body.title,
            content: req.body.content,
            dateCreated: new Date(),
            dateModified: new Date(),
            author_id: req.body.author_id
        }, function (err, question) {
            if (!question) {
                res.status(503); // server is unable to store the representation
                return res.json({error: err});
            }
            // Note: we need to ask for the question again in order for NodeORM to fill
            // associations. See this issue:
            // https://github.com/dresende/node-orm2/issues/406
            req.models.question.get(question.id, function (qErr, fullQuestion) {
                res.status(201);
                res.setHeader('Last-Modified', fullQuestion.dateModified.toUTCString());
                res.setHeader('Location', fullQuestion.href());
                return res.json(fullQuestion.renderLong());
            });
        });
    });
};

exports.get = function (req, res) {
    req.assert('qid', 'question ID must be an integer').isInt();
    var errors = req.validationErrors();
    if (errors) {
        return res.json(errors, 400);
    }

    req.models.question.get(req.params.qid, function (err, question) {
        if (!question) {
            res.status(404);
            return res.json({error: err});
        }
        res.status(200);
        res.setHeader('Last-Modified', question.dateModified.toUTCString());
        return res.json(question.renderLong());
    });
};

exports.update = function (req, res) {
    req.checkBody('content', 'content cannot be empty').notEmpty();
    req.checkBody('author_id', 'author_id must be given').isInt();
    req.checkBody('title', 'title cannot be empty').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.json(errors, 400);
    }

    req.models.question.get(req.params.qid, function (err, question) {
        if (!question) {
            res.status(404);
            return res.json({error: err});
        }
        question.title = req.body.title;
        question.content = req.body.content;
        question.dateModified = new Date();
        question.save(function (saveError) {
            if (saveError) {
                res.status(503); // server is unable to store the representation
                return res.json({error: saveError});
            }
            res.status(200);
            res.setHeader('Last-Modified', question.dateModified.toUTCString());
            return res.json(question.renderLong());
        });
    });
};

exports.del = function (req, res) {
    req.assert('qid', 'question ID must be an integer').isInt();
    var errors = req.validationErrors();
    if (errors) {
        return res.json(errors, 400);
    }

    req.models.question.find({id: req.params.qid}).remove(function (err) {
        if (err) {
            res.status(503);
            return res.json({error: err});
        }
        res.status(204); // request processed, no content returned
        return res.json({deleted: true});
    });
};
