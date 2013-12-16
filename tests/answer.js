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

    it('should return 400 for POST without required fields', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    request.post({
                        url: host + '/question/' + question.id + '/answer',
                        form: {
                        }
                    }, function (error, response) {
                        expect(response.statusCode).to.be(400);
                        done();
                    });
                });
            });
        });
    });

    it('should return 400 for POST with invalid fields', function (done) {
        var content = 'content';
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    request.post({
                        url: host + '/question/' + question.id + '/answer',
                        form: {
                            content: content,
                            author_id: '99999'
                        }
                    }, function (error, response) {
                        expect(response.statusCode).to.be(400);
                        done();
                    });
                });
            });
        });
    });

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

    it('should have same dateModified as dateCreated for POST', function (done) {
        var content = 'content';
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    request.post({
                        url: host + '/question/' + question.id + '/answer',
                        json: true,
                        form: {
                            content: content,
                            author_id: answerer.id
                        }
                    }, function (error, response, body) {
                        expect(body.dateModified).to.be(body.dateCreated);
                        done();
                    });
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
                            expect(body._embedded.author.id).to.be(answer._embedded.author.id);
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
                        request.head(host + '/question/' + question.id + '/answer/' + answer.id, function (error, response) {
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
                        request.head(host + '/question/' + question.id + '/answer/' + answer.id, function (error, response) {
                            expect(response.statusCode).to.be(200);
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should return 204 for DELETE', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                    //check if created
                        request.get(host + '/question/' + question.id + '/answer/' + answer.id, function (error, checkResponse) {
                            expect(checkResponse.statusCode).to.be(200);
                            request.del(host + '/question/' + question.id + '/answer/' + answer.id, function (error, deleteResponse) {
                                expect(deleteResponse.statusCode).to.be(204);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });

    it('should return 404 for GET after DELETE', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                    //check if created
                        request.get(host + '/question/' + question.id + '/answer/' + answer.id, function (error, checkResponse) {
                            expect(checkResponse.statusCode).to.be(200);
                            request.del(host + '/question/' + question.id + '/answer/' + answer.id, function (error, deleteResponse) {
                                expect(deleteResponse.statusCode).to.be(204);
                                request.get(host + '/question/' + question.id + '/answer/' + answer.id, function (error, response) {
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

    it('should return 404 for existing QID and nonexistant AID', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                request.get(host + '/question/' + question.id + '/answer/99999', function (error, response) {
                    expect(response.statusCode).to.be(404);
                    done();
                });
            });
        });
    });

    it('should return 404 for nonexistant QID and nonexistant AID', function (done) {
        request.get(host + '/question/99999/answer/99999', function (error, response) {
            expect(response.statusCode).to.be(404);
            done();
        });
    });

    it('should have HREF', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        request.get({
                            url: host + '/question/' + question.id + '/answer/' + answer.id,
                            json: true
                        }, function (error, response, body) {
                            expect(body._links.self.href).to.not.be(undefined);
                            expect(body._links.self.href).to.not.be(null);
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should have HREF that can be followed correctly', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        request.get({
                            url: host + '/question/' + question.id + '/answer/' + answer.id,
                            json: true
                        }, function (error, response, body) {
                            var hrefUrl = host + body._links.self.href, hrefContent = body.content, hrefDateCreated = body.dateCreated,
                                hrefDateMod = body.dateModified, hrefHref = body._links.self.href, hrefID = body.id;
                            request.get({
                                url: hrefUrl,
                                json: true
                            }, function (error, response, hrefBody) {
                                expect(hrefBody.content).to.be(hrefContent);
                                expect(hrefBody.dateCreated).to.be(hrefDateCreated);
                                expect(hrefBody.dateModified).to.be(hrefDateMod);
                                expect(hrefBody._links.self.href).to.be(hrefHref);
                                expect(hrefBody.id).to.be(hrefID);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });

    it('should return 200 for PUT', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        var content = "foo";
                        request.put({
                            url: host + '/question/' + question.id + '/answer/' + answer.id,
                            json: true,
                            form: {
                                content: content,
                                author_id: answer._embedded.author.id,
                                question_id: question.id
                            }
                        }, function (error, response, body) {
                            expect(response.statusCode).to.be(200);
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should return 400 for PUT without required fields', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        request.put({
                            url: host + '/question/' + question.id + '/answer/' + answer.id,
                            json: true,
                            form: {
                            }
                        }, function (error, response, body) {
                            expect(response.statusCode).to.be(400);
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should update target for PUT', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        var firstContent = answer.content, content = "foo";
                        request.put({
                            url: host + '/question/' + question.id + '/answer/' + answer.id,
                            json: true,
                            form: {
                                content: content,
                                author_id: answer._embedded.author.id,
                                question_id: question.id
                            }
                        }, function (error, response, body) {
                            expect(body.content).to.not.be(firstContent);
                            expect(body.content).to.be(content);
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should return 404 for PUT on existing QID and nonexistent AID', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                var content = "foo";
                request.put({
                    url: host + '/question/' + question.id + '/answer/' + '99999',
                    json: true,
                    form: {
                        content: content,
                        author_id: '99999',
                        question_id: question.id
                    }
                }, function (error, response, body) {
                    expect(response.statusCode).to.be(404);
                    done();
                });
            });
        });
    });

    it('should return 404 for PUT on nonexistent QID and nonexistent AID', function (done) {
        var content = "foo";
        request.put({
            url: host + '/question/' + '99999' + '/answer/' + '99999',
            json: true,
            form: {
                content: content,
                author_id: '99999',
                question_id: '99999'
            }
        }, function (error, response, body) {
            expect(response.statusCode).to.be(404);
            done();
        });
    });

    it('should not modify dateModified for GET', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        var dateModified = answer.dateModified;
                        request.get({
                            url: host + '/question/' + question.id + '/answer/' + answer.id,
                            json: true
                        }, function (error, response, body) {
                            expect(body.dateModified).to.be(dateModified);
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should not modify dateModified for HEAD', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        //this evens out date resolution issues
                        var dateModified = Date.parse(new Date(Date.parse(answer.dateModified)).toUTCString());
                        request.head({
                            url: host + '/question/' + question.id + '/answer/' + answer.id,
                            json: true
                        }, function (error, response) {
                            var responseDateMod = Date.parse(response.headers['last-modified']);
                            expect(responseDateMod).to.be(dateModified);
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should modify dateModified for PUT', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        var dateModified = answer.dateModified, content = "foo";
                        request.put({
                            url: host + '/question/' + question.id + '/answer/' + answer.id,
                            json: true,
                            form: {
                                content: content,
                                author_id: answer._embedded.author.id,
                                question_id: question.id
                            }
                        }, function (error, response, body) {
                            expect(body.dateModified).to.be.greaterThan(dateModified);
                            done();
                        });
                    });
                });
            });
        });
    });
});