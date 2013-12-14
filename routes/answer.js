var utils = require('../util.js');
var _ = require('underscore');

exports.list = function (req, res) {
    req.models.answer.find({question_id: req.params.qid}, function (err, answers) {
        res.status(200);
        if (answers.length) {
            var latest = _.max(answers, function (a) { return a.dateModified; });
            res.setHeader('Last-Modified', latest.dateModified.toUTCString());
        }
        res.json(utils.renderModels(answers));
    });
};

exports.create = function (req, res) {
    req.checkBody('content', 'content cannot be empty').notEmpty();
    req.checkBody('author_id', 'author_id must be given').isInt();
    req.assert('qid', 'question_id must be given').isInt();
    var errors = req.validationErrors();
    if (errors) {
        return res.json(errors, 400);
    }

    req.models.answer.create({
        content: req.body.content,
        author_id: req.body.author_id,
        dateCreated: new Date(),
        dateModified: new Date(),
        question_id: req.params.qid
    }, function (err, answer) {
        if (!answer) {
            res.status(503); // server is unable to store the representation
            return res.json({error: err});
        }
        // Note: we need to ask for the question again in order for NodeORM to fill
        // associations. See this issue:
        // https://github.com/dresende/node-orm2/issues/406
        req.models.answer.get(answer.id, function (aErr, fullAnswer) {
            res.status(201);
            res.setHeader('Last-Modified', fullAnswer.dateModified.toUTCString());
            return res.json(fullAnswer.renderLong());
        });
    });
};

exports.get = function (req, res) {
    req.assert('aid', 'answer ID must be a valid integer').isInt();
    var errors = req.validationErrors();
    if (errors) {
        return res.json(errors, 400);
    }

    req.models.answer.get(req.params.aid, function (err, answer) {
        if (!answer) {
            res.status(404);
            return res.json({error: err});
        }
        res.status(200);
        res.setHeader('Last-Modified', answer.dateModified.toUTCString());
        return res.json(answer.renderLong());
    });
};

exports.update = function (req, res) {
    req.checkBody('content', 'content cannot be empty').notEmpty();
    req.checkBody('author_id', 'author_id must be given').isInt();
    req.assert('qid', 'question_id must be given').isInt();
    var errors = req.validationErrors();
    if (errors) {
        return res.json(errors, 400);
    }

    req.models.answer.get(req.params.aid, function (err, answer) {
        if (!answer) {
            res.status(404);
            return res.json({error: err});
        }
        answer.content = req.body.content;
        answer.author_id = req.body.author_id;
        answer.dateModified = new Date();
        answer.save(function (saveError) {
            if (saveError) {
                res.status(503); // server is unable to store the representation
                return res.json({error: saveError});
            }
            res.status(200);
            res.setHeader('Last-Modified', answer.dateModified.toUTCString());
            return res.json(answer.renderLong());
        });
    });
};

exports.del = function (req, res) {
    req.assert('aid', 'answer ID must be a valid integer').isInt();
    var errors = req.validationErrors();
    if (errors) {
        return res.json(errors, 400);
    }

    req.models.answer.find({id: req.params.aid}).remove(function (err) {
        if (err) {
            res.status(503);
            return res.json({error: err});
        }
        res.status(204); // request processed, no content returned
        return res.json({deleted: true});
    });
};
