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

    it('should have same dateModified as dateCreated for POST', function (done) {
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
            }, function (error, response, body) {
                expect(body.dateModified).to.be(body.dateCreated);
                done();
            });
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
                    expect(body._embedded.author.id).to.be(question._embedded.author.id);
                    done();
                });
            });
        });
    });

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

    it('should return 204 for DELETE', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
            //check if created
                request.get(host + '/question/' + question.id, function (error, checkResponse) {
                    expect(checkResponse.statusCode).to.be(200);
                    request.del(host + '/question/' + question.id, function (deleteError, deleteResponse) {
                        expect(deleteResponse.statusCode).to.be(204);
                        done();
                    });
                });
            });
        });
    });

    it('should return 404 for GET after DELETE', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                request.del(host + '/question/' + question.id, function (deleteError, deleteResponse) {
                    expect(deleteResponse.statusCode).to.be(204);
                    request.get(host + '/question/' + question.id, function (checkError, checkResponse) {
                        expect(checkResponse.statusCode).to.be(404);
                        done();
                    });
                });
            });
        });
    });

    it('should return 404 for nonexistent QID', function (done) {
        request.get(host + '/question/99999', function (error, response) {
            expect(response.statusCode).to.be(404);
            done();
        });
    });

    it('should have HREF', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                request.get({
                    url: host + '/question/' + question.id,
                    json: true
                }, function (error, response, body) {
                    expect(body._links.self.href).to.not.be(undefined);
                    expect(body._links.self.href).to.not.be(null);
                    done();
                });
            });
        });
    });

    it('should have HREF that can be followed correctly', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                request.get({
                    url: host + '/question/' + question.id,
                    json: true
                }, function (error, response, body) {
                    var hrefUrl = host + body._links.self.href, hrefTitle = body.title, hrefContent = body.content, hrefDateCreated = body.dateCreated,
                        hrefDateMod = body.dateModified, hrefHref = body._links.self.href, hrefID = body.id;
                    request.get({
                        url: hrefUrl,
                        json: true
                    }, function (error, response, hrefBody) {
                        expect(hrefBody.title).to.be(hrefTitle);
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

    it('should return 200 for PUT', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                var title = 'foo', content = 'bar';
                request.put({
                    url: host + '/question/' + question.id,
                    json: true,
                    form: {
                        title: title,
                        content: content,
                        author_id: question._embedded.author.id
                    }
                }, function (error, response, body) {
                    expect(response.statusCode).to.be(200);
                    done();
                });
            });
        });
    });

    it('should update target for PUT', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                var firstTitle = question.title, firstContent = question.content, title = 'foo', content = 'bar';
                request.put({
                    url: host + '/question/' + question.id,
                    json: true,
                    form: {
                        title: title,
                        content: content,
                        author_id: question._embedded.author.id
                    }
                }, function (error, response, body) {
                    expect(body.title).to.not.be(firstTitle);
                    expect(body.content).to.not.be(firstContent);
                    expect(body.title).to.be(title);
                    expect(body.content).to.be(content);
                    done();
                });
            });
        });
    });

    it('should return 404 for PUT on nonexistant QID', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                var title = 'foo', content = 'bar';
                request.put({
                    url: host + '/question/' + '99999',
                    json: true,
                    form: {
                        title: title,
                        content: content,
                        author_id: question._embedded.author.id
                    }
                }, function (error, response, body) {
                    expect(response.statusCode).to.be(404);
                    done();
                });
            });
        });
    });

    it('should not modify dateModified for GET', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                var dateModified = question.dateModified;
                request.get({
                    url: host + '/question/' + question.id,
                    json: true
                }, function (error, response, body) {
                    expect(body.dateModified).to.be(dateModified);
                    done();
                });
            });
        });
    });

    it('should not modify dateModified for HEAD', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                //this evens out date resolution issues
                var dateModified = Date.parse(new Date(Date.parse(question.dateModified)).toUTCString());
                request.head({
                    url: host + '/question/' + question.id,
                    json: true
                }, function (error, response) {
                    var responseDateMod = Date.parse(response.headers['last-modified']);
                    expect(responseDateMod).to.be(dateModified);
                    done();
                });
            });
        });
    });

    it('should modify dateModified for PUT', function (done) {
        util.createUser(function (user) {
            util.createQuestion(user.id, function (question) {
                var dateModified = question.dateModified, title = 'foo', content = 'bar';
                request.put({
                    url: host + '/question/' + question.id,
                    json: true,
                    form: {
                        title: title,
                        content: content,
                        author_id: question._embedded.author.id
                    }
                }, function (error, response, body) {
                    expect(body.dateModified).to.be.greaterThan(dateModified);
                    done();
                });
            });
        });
    });
});