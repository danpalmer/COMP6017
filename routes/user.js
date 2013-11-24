var utils = require('../util.js');

/*
 * GET users listing.
 */

exports.list = function(req, res) {
  req.models.user.find({}, function(err, users) {
    res.json(utils.renderModels(users));
  });
};

exports.create = function(req, res) {
  req.models.user.create({
    name: req.body.name,
    email: req.body.email,
    dateSignedUp: new Date()
  }, function(err, user) {
    if (!user) {
      res.status(507); // server is unable to store the representation
      return res.json({error: err});
    }
    res.status(201);
    return res.json(user.render());
  });
};

exports.get = function(req, res) {
  req.models.user.get(req.params.uid, function(err, user) {
    if (!user) {
      res.status(404);
      return res.json({error: err});
    }
    res.json(user.render());
  });
};

exports.update = function(req, res) {
  req.models.user.get(req.params.uid, function(err, user) {
    
  });
};

exports.del = function(req, res) {
  req.models.user.find({id: req.params.uid}).remove(function(err) {
    if (err) {
      res.status(500);
      return res.json({error: err});
    }
    res.status(204); // request processed, no content returned
    return res.json({deleted: true});
  });
};
