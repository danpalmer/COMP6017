
module.exports.renderModels = function(models) {
  var rendered = [];
  for (var i = 0; i < models.length; i++) {
    rendered.push(models[i].render());
  }
  return rendered;
};
