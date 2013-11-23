var utils = require('../util.js');

/*
 * GET questions listing.
 */

exports.list = function(req, res) {
  req.models.question.find({}, function(err, questions) {
    res.json(utils.renderModels(questions));
  });
};

exports.create = function(req, res) {
  req.models.question.create({
    title: req.body.title,
    content: req.body.content,
    dateCreated: new Date(),
    dateModified: new Date(),
    author_id: req.body.author_id
  }, function(err, question) {
    if (!question) {
      res.json({error: err});
      return res.status(507); // server is unable to store the representation
    }
    return res.json(question.render());
  });
};
