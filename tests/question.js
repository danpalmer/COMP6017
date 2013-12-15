/* global describe: true, it: true */
var request = require('request');
var expect = require('expect.js');
var util = require('./util');

var host = util.host;

describe('/question', function () {

    it('server should respond', function (done) {
        request.get(host + '/question', function (error, response) {
            expect(response).to.not.be(undefined);
            expect(response).to.not.be(null);
            done();
        });
    });

    it('should return 200 for GET', function (done) {
        request.get(host + '/question', function (error, response) {
            expect(response.statusCode).to.be(200);
            done();
        });
    });
    
    it('should return 201 created for POST', function (done) {
        var title = 'title',
            content = 'content';
        util.createUser(function (user) {
            request.post({
                url: host + '/question',
                json: true,
                form: {
                    title: title,
                    content: content,
                    author_id: user.id
                }
            }, function (error, response) {
                expect(response.statusCode).to.be(201);
                done();
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
    
    it('server should respond for HEAD', function (done) {
        request.head(host + '/question', function (error, response) {
            expect(response).to.not.be(undefined);
            expect(response).to.not.be(null);
            done();
        });
    });

    it('should return 200 for HEAD', function (done) {
        request.head(host + '/question', function (error, response) {
            expect(response.statusCode).to.be(200);
            done();
        });
    });

    // POST with invalid author returns 400 bad request
    // POST with missing values returns 400 bad request
});

describe('/question/:id', function () {

    it('server should respond', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                request.get(host + '/question/' + question.id, function (error, response) {
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
                request.get(host + '/question/' + question.id, function (error, response) {
                    expect(response.statusCode).to.be(200);
                    done();
                });
            });
        });
    });
    
    it('should return a valid question', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                request.get({
                    url: host + '/question/' + question.id,
                    json: true
                }, function (error, response, body) {
                    expect(body.id).to.be(question.id);
                    expect(body.title).to.be(question.title);
                    expect(body.content).to.be(question.content);
                    expect(body.author).to.be(question.author_id);
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

    it('server should respond for HEAD', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                request.head(host + '/question/' + question.id, function (error, response) {
                    expect(response).to.not.be(undefined);
                    expect(response).to.not.be(null);
                    done();
                });
            });
        });
    });

    it('should return 200 for HEAD', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                request.head(host + '/question/' + question.id, function (error, response) {
                    expect(response.statusCode).to.be(200);
                    done();
                });
            });
        });
    });
  
    it('should return 204 for DELETE', function(done) {
        util.createUser(function(user) {
            util.createQuestion(user.id, function(question) {
            //check if created
                request.get(host + '/question/' + question.id, function (error, checkResponse) {
                    expect(checkResponse.statusCode).to.be(200);
                    request.del(host + '/question/' + question.id, function(deleteError, deleteResponse) {
                        expect(deleteResponse.statusCode).to.be(204);
                        done();
                    });
                });
            });
        });
    });
  
  it('should return 404 for GET after DELETE', function(done) {
    util.createUser(function(user) {
      util.createQuestion(user.id, function(question) {
        request.del(host + '/question/' + question.id, function(deleteError, deleteResponse) {
          expect(deleteResponse.statusCode).to.be(204);
          request.get(host + '/question/' + question.id, function(checkError, checkResponse) {
            expect(checkResponse.statusCode).to.be(404);
            done();
          });
        });
      });
    });
  });
  
  it('should return 404 for nonexistent QID', function(done) {
    request.get(host + '/question/99999', function(error, response) {
      expect(response.statusCode).to.be(404);
      done();
    });
  });
});