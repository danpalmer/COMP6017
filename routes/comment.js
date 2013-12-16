/*
    Route handlers relating to Comment resources.
    GET -> get/list for single/multiple
    POST -> create
    PUT -> update
    DELETE -> del

    Note that comments can be related to either an answer or a model.
    To differentiate requests, a 'model' argument is passed to all
    handlers, and is a string containing either 'question' or 'answer'.
*/
var utils = require('../util.js');
var _ = require('underscore');

function validateURLParameters(model, req) {
    if (model === 'answer') {
        req.assert('rid', 'answer ID must be an integer').isInt();
        req.assert('qid', 'question ID must be an integer').isInt();
    } else if (model === 'question') {
        req.assert('rid', 'question ID must be an integer').isInt();
    }
}

exports.list = function (model, req, res) {
    validateURLParameters(model, req);
    var errors = req.validationErrors();
    if (errors) {
        return res.json(errors, 400);
    }

    req.models[model].get(req.params.rid, function (modelError, item) {
        if (!item) {
            res.status(404);
            return res.json({error: modelError});
        }
        item.getComments(function (commentErr, comments) {
            var url, latest;
            if (!comments) {
                res.status(503);
                return res.json({error: commentErr});
            }
            res.status(200);
            if (comments.length) {
                latest = _.max(comments, function (c) { return c.dateModified; });
                res.setHeader('Last-Modified', latest.dateModified.toUTCString());
            }
            if (model === 'question') {
                url = '/question/' + req.params.rid + '/comment';
            } else if (model === 'answer') {
                url = '/question/' + req.params.qid + '/answer/' + req.params.rid + '/comment';
            }
            res.json({
                _links: {
                    self: { href: url }
                },
                _embedded: {
                    comments: utils.renderModels(comments)
                },
                count: comments.length
            });
        });
    });
};

exports.create = function (model, req, res) {
    var newComment, errors;
    validateURLParameters(model, req);
    req.checkBody('content', 'content must not be empty').notEmpty();
    req.checkBody('author_id', 'author_id must be an integer').isInt();
    errors = req.validationErrors();
    if (errors) {
        return res.json(errors, 400);
    }

    newComment = {
        content: req.body.content,
        dateCreated: new Date(),
        dateModified: new Date(),
        author_id: req.body.author_id
    };

    if (model === 'question') {
        newComment.question_id = req.params.rid;
    } else if (model === 'answer') {
        newComment.question_id = req.params.qid;
        newComment.answer_id = req.params.rid;
    }

    req.models.user.get(req.body.author_id, function (err, user) {
        if (!user) {
            res.status(400);
            return res.json(err);
        }
        req.models.comment.create(newComment, function (err, comment) {
            if (!comment) {
                res.status(503);
                return res.json({error: err});
            }
            // Note: we need to ask for the question again in order for NodeORM to fill
            // associations. See this issue:
            // https://github.com/dresende/node-orm2/issues/406
            req.models.comment.get(comment.id, function (cErr, fullComment) {
                res.status(201);
                res.setHeader('Last-Modified', fullComment.dateModified.toUTCString());
                res.setHeader('Location', fullComment.href());
                return res.json(fullComment.renderLong());
            });
        });
    });
};

exports.get = function (model, req, res) {
    validateURLParameters(model, req);
    req.assert('cid', 'comment ID must be an integer').isInt();
    var errors = req.validationErrors();
    if (errors) {
        return res.json(errors, 400);
    }

    req.models.comment.get(req.params.cid, function (err, comment) {
        if (!comment) {
            res.status(404);
            return res.json({error: err});
        }
        res.status(200);
        res.setHeader('Last-Modified', comment.dateModified.toUTCString());
        return res.json(comment.renderLong());
    });
};

exports.update = function (model, req, res) {
    validateURLParameters(model, req);
    req.checkBody('content', 'content must not be empty').notEmpty();
    req.checkBody('author_id', 'author_id must be an integer').isInt();
    var errors = req.validationErrors();
    if (errors) {
        return res.json(errors, 400);
    }

    req.models.comment.get(req.params.cid, function (err, comment) {
        if (!comment) {
            res.status(404);
            return res.json({error: err});
        }
        comment.content = req.body.content;
        comment.author_id = req.body.author_id;
        comment.dateModified = new Date();
        comment.save(function (saveError) {
            if (saveError) {
                res.status(503); // server is unable to store the representation
                return res.json({error: saveError});
            }
            res.status(200);
            res.setHeader('Last-Modified', comment.dateModified.toUTCString());
            return res.json(comment.renderLong());
        });
    });
};

exports.del = function (model, req, res) {
    validateURLParameters(model, req);
    req.assert('cid', 'comment ID must be an integer').isInt();
    var errors = req.validationErrors();
    if (errors) {
        return res.json(errors, 400);
    }

    req.models.comment.find({id: req.params.cid}).remove(function (err) {
        if (err) {
            res.status(500);
            return res.json({error: err});
        }
        res.status(204); // request processed, no content returned
        return res.json({deleted: true});
    });
};
