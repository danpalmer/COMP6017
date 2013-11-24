var utils = require('../util.js');

/*
 * GET questions listing.
 */

exports.list = function(model, req, res) {
  req.models[model].get(req.params.rid, function(modelError, item) {
    if (!item) {
      res.status(503);
      return res.json({error: modelError});
    }
    item.getComments(function(commentErr, comments) {
      if (!comments) {
        res.status(503);
        return res.json({error: commentErr});
      }
      res.json(utils.renderModels(comments));
    });
  });
};

exports.create = function(model, req, res) {
  req.models.comment.create({
    content: req.body.content,
    dateCreated: new Date(),
    dateModified: new Date(),
    author_id: req.body.author_id
  }, function(commentErr, comment) {
    if (!comment) {
      res.status(503);
      return res.json({error: err});
    }
    req.models[model].get(req.params.rid, function(resourceErr, item) {
      if (!item) {
        res.status(503);
        return res.json({error: resourceErr});
      }
      item.addComment(comment, function(linkErr) {
        if (err) {
          res.status(503);
          return res.json({error: linkErr});
        }
        res.status(201);
        return res.json(comment.render());
      });
    });
  })
};

exports.get = function(model, req, res) {
  req.models.comment.get(req.params.cid, function(err, comment) {
    if (!comment) {
      res.status(404);
      return res.json({error: err});
    }
    res.status(200);
    return res.json(comment.render());
  });
};

exports.update = function(model, req, res) {
  req.models.comment.get(req.params.cid, function(err, comment) {
    if (!comment) {
      res.status(404);
      return res.json({error: err});
    }
    comment.content = req.body.content;
    comment.dateModified = new Date();
    comment.save(function(saveError) {
      if (saveError) {
        res.status(503); // server is unable to store the representation
        return res.json({error: saveError});
      }
      res.status(200);
      return res.json(comment.render());
    });
  });
};

exports.del = function(model, req, res) {
  req.models.comment.find({id: req.params.cid}).remove(function(err) {
    if (err) {
      res.status(500);
      return res.json({error: err});
    }
    res.status(204); // request processed, no content returned
    return res.json({deleted: true});
  });
};
