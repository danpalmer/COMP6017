var utils = require('../util.js');
var _ = require('underscore');

exports.list = function (req, res) {
    req.models.user.find({}, function (err, users) {
        res.status(200);
        if (users.length) {
            var latest = _.max(users, function (u) { return u.dateModified; });
            res.setHeader('Last-Modified', latest.dateModified.toUTCString());
        }
        res.json(utils.renderModels(users));
    });
};

exports.create = function (req, res) {
    req.models.user.create({
        name: req.body.name,
        email: req.body.email,
        dateSignedUp: new Date(),
        dateModified: new Date()
    }, function (err, user) {
        if (!user) {
            res.status(503); // server is unable to store the representation
            return res.json({error: err});
        }
        res.status(201);
        res.setHeader('Last-Modified', user.dateModified.toUTCString());
        return res.json(user.renderLong());
    });
};

exports.get = function (req, res) {
    req.models.user.get(req.params.uid, function (err, user) {
        if (!user) {
            res.status(404);
            return res.json({error: err});
        }
        res.status(200);
        res.setHeader('Last-Modified', user.dateModified.toUTCString());
        return res.json(user.renderLong());
    });
};

exports.update = function (req, res) {
    req.models.user.get(req.params.uid, function (err, user) {
        if (!user) {
            res.status(404);
            return res.json({error: err});
        }
        user.name = req.body.name;
        user.email = req.body.email;
        user.dateModified = new Date();
        user.save(function (saveError) {
            if (saveError) {
                res.status(503); // server is unable to store the representation
                return res.json({error: saveError});
            }
            res.status(200);
            res.setHeader('Last-Modified', user.dateModified.toUTCString());
            return res.json(user.renderLong());
        });
    });
};

exports.del = function (req, res) {
    req.models.user.find({id: req.params.uid}).remove(function (err) {
        if (err) {
            res.status(503);
            return res.json({error: err});
        }
        res.status(204); // request processed, no content returned
        return res.json({deleted: true});
    });
};
