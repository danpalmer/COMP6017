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
  }, function(err, item) {
    if (!item) {
      res.json({error: err});
      return res.status(507); // server is unable to store the representation
    }
    return res.json(item.render());
  });
};
