var request = require('request');

var host = 'http://localhost:3000';

module.exports.type = {};
module.exports.type.ANSWER = 'ANSWER';
module.exports.type.QUESTION = 'QUESTION';
module.exports.host = host;

module.exports.createUser = function(callback) {
  var name = 'Test User';
  var email = 'test@example.com';
  request.post({
    url: host + '/user',
    json: true,
    form: {
      name: name,
      email: email
    }
  }, function(error, response, user) {
    callback(user);
  });
};

module.exports.createQuestion = function(userId, callback) {
  var title = 'Test Question';
  var content = 'Lorem ipsum dolor sit amet.';
  request.post({
    url: host + '/question',
    json: true,
    form: {
      title: title, 
      content: content,
      author_id: userId
    }
  }, function(error, response, question) {
    callback(question);
  });
};

module.exports.createAnswer = function(userId, questionId, callback) {
  var content = 'Lorem ipsum dolor sit amet.';
  request.post({
    url: host + '/question/' + questionId + '/answer',
    json: true,
    form: {
      content: content,
      author_id: userId
    }
  }, function(error, response, answer) {
    callback(answer);
  });
};

module.exports.createComment = function(userId, type, questionId, answerId, callback) {
  var content = 'Lorem ipsum dolor sit amet.';
  var url;
  if (type == module.exports.type.QUESTION) {
    url = host + '/question/' + questionId + '/comment';
  } else {
    url = host + '/question/' + questionId + '/answer/' + answerId + '/comment';
  }
  request.post({
    url: url,
    json: true,
    form: {
      content: content,
      author_id: userId
    }
  }, function(error, response, comment) {
    callback(comment);
  });
};
