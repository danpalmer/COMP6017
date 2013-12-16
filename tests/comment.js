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

    it('server should respond for HEAD', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                request.head(host + '/question/' + question.id + '/comment', function (error, response) {
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
                request.head(host + '/question/' + question.id + '/comment', function (error, response) {
                    expect(response.statusCode).to.be(200);
                    done();
                });
            });
        });
    });
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
                            expect(body._embedded.author.id).to.be(comment._embedded.author.id);
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

    it('server should respond for HEAD', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (commenter) {
                    util.createComment(commenter.id, util.type.QUESTION, question.id, null, function (comment) {
                        request.head(host + '/question/' + question.id + '/comment/' + comment.id, function (error, response) {
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

    it('should return 204 for DELETE', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (commenter) {
                    util.createComment(commenter.id, util.type.QUESTION, question.id, null, function (comment) {
                    //check if created
                        request.get(host + '/question/' + question.id + '/comment/' + comment.id, function (error, checkResponse) {
                            expect(checkResponse.statusCode).to.be(200);
                            request.del(host + '/question/' + question.id + '/comment/' + comment.id, function (error, deleteResponse) {
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
                util.createUser(function (commenter) {
                    util.createComment(commenter.id, util.type.QUESTION, question.id, null, function (comment) {
                    //check if created
                        request.get(host + '/question/' + question.id + '/comment/' + comment.id, function (error, checkResponse) {
                            expect(checkResponse.statusCode).to.be(200);
                            request.del(host + '/question/' + question.id + '/comment/' + comment.id, function (error, deleteResponse) {
                                expect(deleteResponse.statusCode).to.be(204);
                                request.get(host + '/question/' + question.id + '/comment/' + comment.id, function (error, errorResponse) {
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

    it('should return 404 for nonexistent QID and nonexistant CID', function (done) {
        request.get(host + '/question/99999/comment/99999', function (error, response) {
            expect(response.statusCode).to.be(404);
            done();
        });
    });

    it('should return 404 for existing QID and nonexistant CID', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                request.get(host + '/question/' + question.id + '/comment/99999', function (error, response) {
                    expect(response.statusCode).to.be(404);
                    done();
                });
            });
        });
    });

    it('should have HREF', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (commenter) {
                    util.createComment(commenter.id, util.type.QUESTION, question.id, null, function (comment) {
                        request.get({
                            url: host + '/question/' + question.id + '/comment/' + comment.id,
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
                util.createUser(function (commenter) {
                    util.createComment(commenter.id, util.type.QUESTION, question.id, null, function (comment) {
                        request.get({
                            url: host + '/question/' + question.id + '/comment/' + comment.id,
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
                util.createUser(function (commenter) {
                    util.createComment(commenter.id, util.type.QUESTION, question.id, null, function (comment) {
                        var content = "foo";
                        request.put({
                            url: host + '/question/' + question.id + '/comment/' + comment.id,
                            json: true,
                            form: {
                                content: content,
                                author_id: comment._embedded.author.id
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

    it('should update target for PUT', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (commenter) {
                    util.createComment(commenter.id, util.type.QUESTION, question.id, null, function (comment) {
                        var firstContent = comment.content, content = "foo";
                        request.put({
                            url: host + '/question/' + question.id + '/comment/' + comment.id,
                            json: true,
                            form: {
                                content: content,
                                author_id: comment._embedded.author.id
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

    it('should return 404 for PUT on existing QID and nonexistent CID', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                var content = "foo";
                request.put({
                    url: host + '/question/' + question.id + '/comment/' + '99999',
                    json: true,
                    form: {
                        content: content,
                        author_id: '99999'
                    }
                }, function (error, response, body) {
                    expect(response.statusCode).to.be(404);
                    done();
                });
            });
        });
    });

    it('should return 404 for PUT on nonexistent QID and nonexistent CID', function (done) {
        var content = "foo";
        request.put({
            url: host + '/question/' + '99999' + '/comment/' + '99999',
            json: true,
            form: {
                content: content,
                author_id: '99999'
            }
        }, function (error, response, body) {
            expect(response.statusCode).to.be(404);
            done();
        });
    });

    it('should not modify dateModified for GET', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (commenter) {
                    util.createComment(commenter.id, util.type.QUESTION, question.id, null, function (comment) {
                        var dateModified = comment.dateModified;
                        request.get({
                            url: host + '/question/' + question.id + '/comment/' + comment.id,
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
                util.createUser(function (commenter) {
                    util.createComment(commenter.id, util.type.QUESTION, question.id, null, function (comment) {
                        //this evens out date resolution issues
                        var dateModified = Date.parse(new Date(Date.parse(comment.dateModified)).toUTCString());
                        request.get({
                            url: host + '/question/' + question.id + '/comment/' + comment.id,
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

    it('server should respond for HEAD', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        request.head(host + '/question/' + question.id + '/answer/' + answer.id + '/comment', function (error, response) {
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
                        request.head(host + '/question/' + question.id + '/answer/' + answer.id + '/comment', function (error, response) {
                            expect(response.statusCode).to.be(200);
                            done();
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
                            util.createComment(commenter.id, util.type.ANSWER, question.id, answer.id, function (comment) {
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
                            util.createComment(commenter.id, util.type.ANSWER, question.id, answer.id, function (comment) {
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
                                    expect(body._embedded.author.id).to.be(comment._embedded.author.id);
                                    done();
                                });
                            });
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
                        util.createUser(function (commenter) {
                            util.createComment(commenter.id, util.type.ANSWER, question.id, answer.id, function (comment) {
                                request.head(host + '/question/' + question.id + '/answer/' + answer.id + '/comment/' + comment.id, function (error, response) {
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

    it('should return 200 for HEAD', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        util.createUser(function (commenter) {
                            util.createComment(commenter.id, util.type.ANSWER, question.id, answer.id, function (comment) {
                                request.head(host + '/question/' + question.id + '/answer/' + answer.id + '/comment/' + comment.id, function (error, response) {
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

    it('should return 204 for DELETE', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        util.createUser(function (commenter) {
                            util.createComment(commenter.id, util.type.ANSWER, question.id, answer.id, function (comment) {
                                request.get(host + '/question/' + question.id + '/answer/' + answer.id + '/comment/' + comment.id, function (error, response) {
                                    //check if created
                                    expect(response.statusCode).to.be(200);
                                    request.del(host + '/question/' + question.id + '/answer/' + answer.id + '/comment/' + comment.id, function (error, deleteResponse) {
                                        expect(deleteResponse.statusCode).to.be(204);
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

    it('should return 404 for GET after DELETE', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        util.createUser(function (commenter) {
                            util.createComment(commenter.id, util.type.ANSWER, question.id, answer.id, function (comment) {
                                request.get(host + '/question/' + question.id + '/answer/' + answer.id + '/comment/' + comment.id, function (error, checkResponse) {
                                    //check if created
                                    expect(checkResponse.statusCode).to.be(200);
                                    request.del(host + '/question/' + question.id + '/answer/' + answer.id + '/comment/' + comment.id, function (error, deleteResponse) {
                                        expect(deleteResponse.statusCode).to.be(204);
                                        request.get(host + '/question/' + question.id + '/answer/' + answer.id + '/comment/' + comment.id, function (error, response) {
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
        });
    });

    it('should return 404 for nonexistent QID, nonexistent AID and nonexistent CID', function (done) {
        request.get(host + '/question/99999/answer/99999/comment/99999', function (error, response) {
            expect(response.statusCode).to.be(404);
            done();
        });
    });

    it('should return 404 for existing QID, nonexistent AID and nonexistent CID', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                request.get(host + '/question/' + question.id + '/answer/99999/comment/99999', function (error, response) {
                    expect(response.statusCode).to.be(404);
                    done();
                });
            });
        });
    });

    it('should return 404 for existing QID, existing AID and nonexistent CID', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        request.get(host + '/question/' + question.id + '/answer/' + answer.id + '/comment/99999', function (error, response) {
                            expect(response.statusCode).to.be(404);
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should have HREF', function (done) {
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
                                    expect(body._links.self.href).to.not.be(undefined);
                                    expect(body._links.self.href).to.not.be(null);
                                    done();
                                });
                            });
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
                        util.createUser(function (commenter) {
                            util.createComment(commenter.id, util.type.ANSWER, question.id, answer.id, function (comment) {
                                request.get({
                                    url: host + '/question/' + question.id + '/answer/' + answer.id + '/comment/' + comment.id,
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
        });
    });

    it('should return 200 for PUT', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        util.createUser(function (commenter) {
                            util.createComment(commenter.id, util.type.ANSWER, question.id, answer.id, function (comment) {
                                var content = 'foo';
                                request.put({
                                    url: host + '/question/' + question.id + '/answer/' + answer.id + '/comment/' + comment.id,
                                    json: true,
                                    form: {
                                        content: content,
                                        author_id: comment._embedded.author.id
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
        });
    });

    it('should update target for PUT', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        util.createUser(function (commenter) {
                            util.createComment(commenter.id, util.type.ANSWER, question.id, answer.id, function (comment) {
                                var firstContent = comment.content, content = 'foo';
                                request.put({
                                    url: host + '/question/' + question.id + '/answer/' + answer.id + '/comment/' + comment.id,
                                    json: true,
                                    form: {
                                        content: content,
                                        author_id: comment._embedded.author.id
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
        });
    });

    it('should return 404 for PUT on existing QID, existing AID and nonexistent CID', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        var content = 'foo';
                        request.put({
                            url: host + '/question/' + question.id + '/answer/' + answer.id + '/comment/' + '99999',
                            json: true,
                            form: {
                                content: content,
                                author_id: '99999'
                            }
                        }, function (error, response, body) {
                            expect(response.statusCode).to.be(404);
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should return 404 for PUT on existing QID, nonexistent AID and nonexistent CID', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                var content = 'foo';
                request.put({
                    url: host + '/question/' + question.id + '/answer/' + '99999' + '/comment/' + '99999',
                    json: true,
                    form: {
                        content: content,
                        author_id: '99999'
                    }
                }, function (error, response, body) {
                    expect(response.statusCode).to.be(404);
                    done();
                });
            });
        });
    });

    it('should return 404 for PUT on nonexistent QID, nonexistent AID and nonexistent CID', function (done) {
        var content = 'foo';
        request.put({
            url: host + '/question/' + '99999' + '/answer/' + '99999' + '/comment/' + '99999',
            json: true,
            form: {
                content: content,
                author_id: '99999'
            }
        }, function (error, response, body) {
            expect(response.statusCode).to.be(404);
            done();
        });
    });

    it('should contain an HREF to its parent question', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createAnswer(user.id, question.id, function (answer) {
                    util.createComment(user.id, util.type.ANSWER, question.id, answer.id, function (comment) {
                        request.get({
                            url: host + '/question/' + question.id + '/answer/' + answer.id + '/comment/' + comment.id,
                            json: true
                        }, function (error, response) {
                            expect(response.body._links.parent).to.not.be(null);
                            expect(response.body._links.parent.href).to.not.be(null);
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should contain a parent HREF that dereferences to an answer', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createAnswer(user.id, question.id, function (answer) {
                    util.createComment(user.id, util.type.ANSWER, question.id, answer.id, function (comment) {
                        request.get({
                            url: host + comment._links.parent.href,
                            json: true
                        }, function (error, response) {
                            expect(response.body.content).to.not.be(null);
                            expect(response.body.content).to.be(question.content);
                            expect(response.body._links.self.href).to.be('/question/' + question.id + '/answer/' + answer.id);
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should contain a parent HREF that dereferences to a question', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createAnswer(user.id, question.id, function (answer) {
                    util.createComment(user.id, util.type.QUESTION, question.id, null, function (comment) {
                        request.get({
                            url: host + comment._links.parent.href,
                            json: true
                        }, function (error, response) {
                            expect(response.body.title).to.not.be(null);
                            expect(response.body.title).to.be(question.title);
                            expect(response.body.content).to.not.be(null);
                            expect(response.body.content).to.be(question.content);
                            expect(response.body._links.self.href).to.be('/question/' + question.id);
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should not modify dateModified for GET', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        util.createUser(function (commenter) {
                            util.createComment(commenter.id, util.type.ANSWER, question.id, answer.id, function (comment) {
                                var dateModified = comment.dateModified;
                                request.get({
                                    url: host + '/question/' + question.id + '/answer/' + answer.id + '/comment/' + comment.id,
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
        });
    });

    it('should not modify dateModified for HEAD', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                util.createUser(function (answerer) {
                    util.createAnswer(answerer.id, question.id, function (answer) {
                        util.createUser(function (commenter) {
                            util.createComment(commenter.id, util.type.ANSWER, question.id, answer.id, function (comment) {
                                //this evens out date resolution issues
                                var dateModified = Date.parse(new Date(Date.parse(comment.dateModified)).toUTCString());
                                request.head({
                                    url: host + '/question/' + question.id + '/answer/' + answer.id + '/comment/' + comment.id,
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
        });
    });
});
