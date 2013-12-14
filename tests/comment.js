/* global describe: true, it: true */
var request = require('request');
var expect = require('expect.js');
var util = require('./util');

var host = util.host;

describe('/question/:id/comment', function () {

    it('server should respond', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                request.get(host + '/question/' + question.id + '/comment', function (error, response) {
                    expect(response).to.not.be(undefined);
                    expect(response).to.not.be(null);
                    done();
                });
            });
        });
    });

    it('should return 200 for GET', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                request.get(host + '/question/' + question.id + '/comment', function (error, response) {
                    expect(response.statusCode).to.be(200);
                    done();
                });
            });
        });
    });

    it('should return 201 created for POST', function (done) {
        var content = 'lorem ipsum';
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                request.post({
                    url: host + '/question/' + question.id + '/comment',
                    form: {
                        content: content,
                        author_id: user.id
                    }
                }, function (error, response) {
                    expect(response.statusCode).to.be(201);
                    done();
                });
            });
        });
    });
    /*
    Need author key in POSTed form before test can be done
    it('should have a user', function (done) {
    });
    */

    /*
    Need author key in POSTed form before test can be done
    it('should link to a valid user', function (done) { 
    });
    */
});

describe('/question/:id/comment/:id', function () {

    it('server should respond', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (commenter) {
                    util.createComment(commenter.id, util.type.QUESTION, question.id, null, function (comment) {
                        request.get(host + '/question/' + question.id + '/comment/' + comment.id, function (error, response) {
                            expect(response).to.not.be(undefined);
                            expect(response).to.not.be(null);
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should return 200 for GET', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (commenter) {
                    util.createComment(commenter.id, util.type.QUESTION, question.id, null, function (comment) {
                        request.get(host + '/question/' + question.id + '/comment/' + comment.id, function (error, response) {
                            expect(response.statusCode).to.be(200);
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should return a valid comment', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (commenter) {
                    util.createComment(commenter.id, util.type.QUESTION, question.id, null, function (comment) {
                        request.get({
                            url: host + '/question/' + question.id + '/comment/' + comment.id,
                            json: true
                        }, function (error, response, body) {
                            expect(body.id).to.be(comment.id);
                            expect(body.content).to.be(comment.content);
                            expect(body.author).to.be(commenter.id);
                            done();
                        });
                    });
                });
            });
        });
    });

    /*
    Need author key in POSTed form before test can be done
    it('should have a user', function (done) {
    });
    */

    /*
    Need author key in POSTed form before test can be done
    it('should link to a valid user', function (done) { 
    });
    */

    it('should respond 200 for head', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (commenter) {
                    util.createComment(commenter.id, util.type.QUESTION, question.id, null, function (comment) {
                        request.head(host + '/question/' + question.id + '/comment/' + comment.id, function (error, response) {
                            expect(response.statusCode).to.be(200);
                            done();
                        });
                    });
                });
            });
        });
    });
  
  it('should respond 204 on DELETE', function(done) {
    util.createUser(function(user) {
      util.createQuestion(user.id, function(question) {
	    util.createUser(function(commenter) {
	      util.createComment(commenter.id, util.type.QUESTION, question.id, null, function(comment) {
          //check if created
            request.get(host + '/question/' + question.id + '/comment/' + comment.id, function(error, checkResponse) {
              expect(checkResponse.statusCode).to.be(200);
              request.del(host + '/question/' + question.id + '/comment/' + comment.id, function(error, deleteResponse) {
                expect(deleteResponse.statusCode).to.be(204);
                done();
              });
            });
          });
        });
      });
    });
  });

  it('should respond 404 on GET after DELETE', function(done) {
    util.createUser(function(user) {
      util.createQuestion(user.id, function(question) {
	    util.createUser(function(commenter) {
	      util.createComment(commenter.id, util.type.QUESTION, question.id, null, function(comment) {
            //check if created
            request.get(host + '/question/' + question.id + '/comment/' + comment.id, function(error, checkResponse) {
              expect(checkResponse.statusCode).to.be(200);
              request.del(host + '/question/' + question.id + '/comment/' + comment.id, function(error, deleteResponse) {
                expect(deleteResponse.statusCode).to.be(204);
                request.get(host + '/question/' + question.id + '/comment/' + comment.id, function(error, errorResponse) {
                  expect(errorResponse.statusCode).to.be(404);
                  done();
                });
              });
            });
		  });
		});
      });
    });
  });
  
  it('should return 404 for nonexistent QID + CID', function(done) {
    request.get(host + '/question/99999/comment/99999', function(error, response) {
      expect(response.statusCode).to.be(404);
      done();
    });
  });
  
   it('should return 404 for existing QID with nonexistant CID', function(done) {
    util.createUser(function(user) {
      util.createQuestion(user.id, function(question) {
        request.get(host + '/question/' + question.id + '/comment/99999', function(error, response) {
          expect(response.statusCode).to.be(404);
          done();
        });
      });
    });
  });
// TODO: Tests for /question/:id/answer/:id/comment
// TODO: Tests for /question/:id/answer/:id/comment/:id

});

describe('/question/:id/answer/:id/comment', function () {

    it('server should respond', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        request.get(host + '/question/' + question.id + '/answer/' + answer.id + '/comment', function (error, response) {
                            expect(response).to.not.be(undefined);
                            expect(response).to.not.be(null);
                            done();
                        });
                    });
                });
            });
        });
    });
    
    it('should return 200 for GET', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        request.get(host + '/question/' + question.id + '/answer/' + answer.id + '/comment', function (error, response) {
                            expect(response.statusCode).to.be(200);
                            done();
                        });
                    });
                });
            });
        });
    });
    
    it('should return 201 created for POST', function (done) {
        var content = 'content';
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        util.createUser(function (commenter) {                            
                            request.post({
                                url: host + '/question/' + question.id + '/answer/' + answer.id + '/comment',
                                form: {
                                    content: content,
                                    author_id: commenter.id
                                }
                            }, function (error, response) {
                                expect(response.statusCode).to.be(201);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
});

describe('/question/:id/answer/:id/comment/:id', function () {

    it('server should respond', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        util.createUser(function (commenter) {
                            util.createComment(commenter.id, util.type.ANSWER, null, answer.id, function (comment) {
                                request.get(host + '/question/' + question.id + '/answer/' + answer.id + '/comment/' + comment.id, function (error, response) {
                                    expect(response).to.not.be(undefined);
                                    expect(response).to.not.be(null);
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    it('should return 200 for GET', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        util.createUser(function (commenter) {
                            util.createComment(commenter.id, util.type.ANSWER, null, answer.id, function (comment) {
                                request.get(host + '/question/' + question.id + '/answer/' + answer.id + '/comment/' + comment.id, function (error, response) {
                                    expect(response.statusCode).to.be(200);
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    it('should return a valid comment', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        util.createUser(function (commenter) {
                            util.createComment(commenter.id, util.type.ANSWER, question.id, answer.id, function (comment) {
                                request.get({
                                    url: host + '/question/' + question.id + '/answer/' + answer.id + '/comment/' + comment.id,
                                    json: true
                                }, function (error, response, body) {
                                    expect(body.id).to.be(comment.id);
                                    expect(body.content).to.be(comment.content);
                                    expect(body.author).to.be(commenter.id);
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
