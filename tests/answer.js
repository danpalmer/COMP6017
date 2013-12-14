/* global describe: true, it: true */
var request = require('request');
var expect = require('expect.js');
var util = require('./util');

var host = util.host;

describe('/question/:id/answer', function () {

    it('server should respond', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                request.get(host + '/question/' + question.id + '/answer', function (error, response) {
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
                request.get(host + '/question/' + question.id + '/answer', function (error, response) {
                    expect(response.statusCode).to.be(200);
                    done();
                });
            });
        });
    });
    
    it('should return 201 created for POST', function (done) {
        var content = 'content';
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    request.post({
                        url: host + '/question/' + question.id + '/answer',
                        form: {
                            content: content,
                            author_id: answerer.id
                        }
                    }, function (error, response) {
                        expect(response.statusCode).to.be(201);
                        done();
                    });
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
    
    it('server should respond for HEAD', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                request.head(host + '/question/' + question.id + '/answer', function (error, response) {
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
                request.head(host + '/question/' + question.id + '/answer', function (error, response) {
                    expect(response.statusCode).to.be(200);
                    done();
                });
            });
        });
    });
});

describe('/question/:id/answer/:id', function () {

    it('server should respond', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        request.get(host + '/question/' + question.id + '/answer/' + answer.id, function (error, response) {
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
                        request.get(host + '/question/' + question.id + '/answer/' + answer.id, function (error, response) {
                            expect(response.statusCode).to.be(200);
                            done();
                        });
                    });
                });
            });
        });
    });
    
    it('should return a valid answer', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        request.get({
                            url: host + '/question/' + question.id + '/answer/' + answer.id,
                            json: true
                        }, function (error, response, body) {
                            expect(body.id).to.be(answer.id);
                            expect(body.content).to.be(answer.content);
                            expect(body.author).to.be(answer.author_id);
                            done();
                        });
                    });
                });
            });
        });
    });
    
    it('server should respond for HEAD', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        request.head(host + '/question/' + question.id, function (error, response) {
                            expect(response).to.not.be(undefined);
                            expect(response).to.not.be(null);
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should return 200 for HEAD', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        request.head(host + '/question/' + question.id, function (error, response) {
                            expect(response.statusCode).to.be(200);
                            done();
                        });
                    });
                });
            });
        });
    });
});