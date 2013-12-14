
module.exports.renderModels = function (models) {
    var rendered = [], i;
    for (i = 0; i < models.length; i += 1) {
        rendered.push(models[i].renderShort());
    }
    return rendered;
};
