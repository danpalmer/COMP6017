var request = require('request');
var expect = require('expect.js');
var util = require('./util');

var host = util.host;

describe('/question/:id/comment', function() {

  it('server should respond', function(done) {
    util.createUser(function(user) {
      util.createQuestion(user.id, function(question) {
        request.get(host + '/question/' + question.id + '/comment', function(error, response) {
          expect(response).to.not.be(undefined);
          expect(response).to.not.be(null);
          done();
        });
      });
    });
  });
  
  it('should return 200 for GET', function(done) {
    util.createUser(function(user) {
      util.createQuestion(user.id, function(question) {
        request.get(host + '/question/' + question.id + '/comment', function(error, response) {
          expect(response.statusCode).to.be(200);
          done();
        });
      });
    });
  });
  
  it('should return 201 created for POST', function(done) {
    util.createUser(function(user) {
      util.createQuestion(user.id, function(question) {
        request.post(host + '/question/' + question.id + '/comment', {
          form: { 
            content:'test content',
            author_id: user.id
          }
        }, function(error, response) {
          expect(response.statusCode).to.be(201);
          done();
        });
      });
    });
  });
  
  it('should return a valid comment', function(done) {
    var content = 'lorem ipsum';
    util.createUser(function(user) {
      util.createQuestion(user.id, function(question) {
        request.post({
          url: host + '/question/' + question.id + '/comment',
          json: true,
          form: { 
            content: content,
            author_id: user.id
          }
        }, function(error, response) {
          expect(response.body.content).to.be(content);
          // TODO: validate returned author id or representation
          done();
        });
      });
    });
  });
  /*
  Need author key in POSTed form before test can be done
  it('should have a user', function(done) {
  });
  */
  
  /*
  Need author key in POSTed form before test can be done
  it('should link to a valid user', function(done) { 
  });
  */
});

describe('/question/:id/comment/:id', function() {

  it('server should respond', function(done) {
    util.createUser(function(user) {
      util.createQuestion(user.id, function(question) {
	    util.createUser(function(commenter) {
	      util.createComment(commenter.id, util.type.QUESTION, question.id, null, function(comment) {
            request.get(host + '/question/' + question.id + '/comment/' + comment.id, function(error, response) {
              expect(response).to.not.be(undefined);
              expect(response).to.not.be(null);
              done();
            });
		  });
		});
      });
    });
  });

  it('should return 200 for GET', function(done) {
    util.createUser(function(user) {
      util.createQuestion(user.id, function(question) {
	    util.createUser(function(commenter) {
	      util.createComment(commenter.id, util.type.QUESTION, question.id, null, function(comment) {
            request.get(host + '/question/' + question.id + '/comment/' + comment.id, function(error, response) {
              expect(response.statusCode).to.be(200);
              done();
            });
          });
        });
      });
	});
  });
  
  /*
  Needs POST implementation definitions first befre test can be properly written
  it('should return 201 created for POST', function(done) {
    //needs author key added to form
    request.post(host + '/question/:id/comment/:id', {form:{title:'foo', content:'bar?'}}, function(error, response) {
      expect(response.statusCode).to.be(201);
      done();
    });
  });
  */
  
  /*
  Need author key in POSTed form before test can be done
  it('should have a user', function(done) {
  });
  */
  
  /*
  Need author key in POSTed form before test can be done
  it('should link to a valid user', function(done) { 
  });
  */

  it('server should respond', function(done) {
    util.createUser(function(user) {
      util.createQuestion(user.id, function(question) {
	    util.createUser(function(commenter) {
	      util.createComment(commenter.id, util.type.QUESTION, question.id, null, function(comment) {
            request.head(host + '/question/' + question.id + '/comment/' + comment.id, function(error, response) {
              expect(response).to.not.be(undefined);
              expect(response).to.not.be(null);
              done();
            });
		  });
		});
      });
    });
  });
  
  it('should respond 200 for head', function(done) {
    util.createUser(function(user) {
      util.createQuestion(user.id, function(question) {
	    util.createUser(function(commenter) {
	      util.createComment(commenter.id, util.type.QUESTION, question.id, null, function(comment) {
            request.head(host + '/question/' + question.id + '/comment/' + comment.id, function(error, response) {
              expect(response.statusCode).to.be(200);
              done();
            });
		  });
		});
      });
    });
  });
  
  it('should respond 204 on delete', function(done) {
    util.createUser(function(user) {
      util.createQuestion(user.id, function(question) {
	    util.createUser(function(commenter) {
	      util.createComment(commenter.id, util.type.QUESTION, question.id, null, function(comment) {
          //check if created
            request.get(host + '/question/' + question.id + '/comment/' + comment.id, function(error, response) {
              expect(response.statusCode).to.be(200);
              request.del(host + '/question/' + question.id + '/comment/' + comment.id, function(error, response) {
                expect(response.statusCode).to.be(204);
                done();
              });
            });
		  });
		});
      });
    });
  });

  it('should respond 404 on GET after delete', function(done) {
    util.createUser(function(user) {
      util.createQuestion(user.id, function(question) {
	    util.createUser(function(commenter) {
	      util.createComment(commenter.id, util.type.QUESTION, question.id, null, function(comment) {
            //check if created
            request.get(host + '/question/' + question.id + '/comment/' + comment.id, function(error, response) {
              expect(response.statusCode).to.be(200);
              request.del(host + '/question/' + question.id + '/comment/' + comment.id, function(error, response) {
                request.get(host + '/question/' + question.id + '/comment/' + comment.id, function(error, response) {
                  expect(response.statusCode).to.be(404);
                  done();
                });
              });
            });
		  });
		});
      });
    });
  });

// TODO: Tests for /question/:id/answer/:id/comment
// TODO: Tests for /question/:id/answer/:id/comment/:id

});  