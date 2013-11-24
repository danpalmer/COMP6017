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
      res.status(503); // server is unable to store the representation
      return res.json({error: err});
    }
    res.status(201);
    return res.json(question.render());
  });
};

exports.get = function(req, res) {
  req.models.question.get(req.params.qid, function(err, question) {
    if (!question) {
      res.status(404);
      return res.json({error: err});
    }
    res.status(200);
    return res.json(question.render());
  });
};

exports.update = function(req, res) {
  req.models.question.get(req.params.qid, function(err, question) {
    if (!question) {
      res.status(404);
      return res.json({error: err});
    }
    question.title = req.body.title;
    question.content = req.body.content;
    question.dateModified = new Date();
    question.save(function(saveError) {
      if (saveError) {
        res.status(503); // server is unable to store the representation
        return res.json({error: saveError});
      }
      res.status(200);
      return res.json(user.render());
    });
  });
};

exports.del = function(req, res) {
  req.models.question.find({id: req.params.qid}).remove(function(err) {
    if (err) {
      res.status(503);
      return res.json({error: err});
    }
    res.status(204); // request processed, no content returned
    return res.json({deleted: true});
  });
};
