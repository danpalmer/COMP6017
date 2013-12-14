var utils = require('../util.js');
var _ = require('underscore');

exports.list = function (model, req, res) {
    req.models[model].get(req.params.rid, function (modelError, item) {
        if (!item) {
            res.status(404);
            return res.json({error: modelError});
        }
        item.getComments(function (commentErr, comments) {
            if (!comments) {
                res.status(503);
                return res.json({error: commentErr});
            }
            res.status(200);
            if (comments.length) {
                var latest = _.max(comments, function (c) { return c.dateModified; });
                res.setHeader('Last-Modified', latest.dateModified.toUTCString());
            }
            return res.json(utils.renderModels(comments));
        });
    });
};

exports.create = function (model, req, res) {
    var newComment = {
        content: req.body.content,
        dateCreated: new Date(),
        dateModified: new Date(),
        author_id: req.body.author_id
    };
    newComment[model + '_id'] = req.param.rid;
    req.models.comment.create(newComment, function (err, comment) {
        if (!comment) {
            res.status(503);
            return res.json({error: err});
        }
        res.status(201);
        res.setHeader('Last-Modified', comment.dateModified.toUTCString());
        return res.json(comment.render());
    });
};

exports.get = function (model, req, res) {
    req.models.comment.get(req.params.cid, function (err, comment) {
        if (!comment) {
            res.status(404);
            return res.json({error: err});
        }
        res.status(200);
        res.setHeader('Last-Modified', comment.dateModified.toUTCString());
        return res.json(comment.render());
    });
};

exports.update = function (model, req, res) {
    req.models.comment.get(req.params.cid, function (err, comment) {
        if (!comment) {
            res.status(404);
            return res.json({error: err});
        }
        comment.content = req.body.content;
        comment.dateModified = new Date();
        comment.save(function (saveError) {
            if (saveError) {
                res.status(503); // server is unable to store the representation
                return res.json({error: saveError});
            }
            res.status(200);
            res.setHeader('Last-Modified', comment.dateModified.toUTCString());
            return res.json(comment.render());
        });
    });
};

exports.del = function (model, req, res) {
    req.models.comment.find({id: req.params.cid}).remove(function (err) {
        if (err) {
            res.status(500);
            return res.json({error: err});
        }
        res.status(204); // request processed, no content returned
        return res.json({deleted: true});
    });
};
