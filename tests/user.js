/* global describe: true, it: true */
var request = require('request');
var expect = require('expect.js');
var util = require('./util');

var host = util.host;

describe('/user', function () {

    it('server should respond', function (done) {
        request.get(host + '/user', function (error, response) {
            expect(response).to.not.be(undefined);
            expect(response).to.not.be(null);
            done();
        });
    });

    it('should return 200 for GET', function (done) {
        request.get(host + '/user', function (error, response) {
            expect(response.statusCode).to.be(200);
            done();
        });
    });

    it('should return 201 created for POST', function (done) {
        request.post(host + '/user', {form: {'name': 'foo', 'email': 'bar@example.com', 'dateSignedUp': Date.now()}}, function (error, response) {
            expect(response.statusCode).to.be(201);
            done();
        });
    });
    
    it('server should respond for HEAD', function (done) {
        request.head(host + '/user', function (error, response) {
            expect(response).to.not.be(undefined);
            expect(response).to.not.be(null);
            done();
        });
    });

    it('should return 200 for HEAD', function (done) {
        request.head(host + '/user', function (error, response) {
            expect(response.statusCode).to.be(200);
            done();
        });
    });
});

describe('/user/:id', function() {	
	
	it('server should respond', function(done) {
        util.createUser(function (user) {
            request.get(host + '/user/' + user.id, function(error, response) {
                expect(response).to.not.be(undefined);
                expect(response).to.not.be(null);
                done();
            });
		});
	});
	
	it('should return 200 for GET', function(done) {
		var name = 'foo';
		var email = 'foo@bar.com';
		request.post({url:host + '/user', json:true, form:{name: name, email: email}}, function(error, response, user) {
			request.get(host + '/user/' + user.id, function(error, response) {
				expect(response.statusCode).to.be(200);
				done();
			});
		});
	});

    it('should return a valid user', function (done) {
        util.createUser(function (user) {
            request.get({
                url: host + '/user/' + user.id,
                json: true
            }, function (error, response, body) {
                expect(body.id).to.be(user.id);
                expect(body.name).to.be(user.name);
                expect(body.email).to.be(user.email);
                done();
            });
        });
    });
    
	it('server should respond for HEAD', function(done) {
        util.createUser(function (user) {
            request.head(host + '/user/' + user.id, function(error, response) {
                expect(response).to.not.be(undefined);
                expect(response).to.not.be(null);
                done();
            });
		});
	});
	
	it('should return 200 for HEAD', function(done) {
		var name = 'foo';
		var email = 'foo@bar.com';
		request.post({url:host + '/user', json:true, form:{name: name, email: email}}, function(error, response, user) {
			request.head(host + '/user/' + user.id, function(error, response) {
				expect(response.statusCode).to.be(200);
				done();
			});
		});
	});
    
	it('should return 204 for DELETE', function(done) {
		var name = 'foo';
		var email = 'foo@bar.com';
		request.post({url:host + '/user', json:true, form:{name: name, email: email}}, function(error, createResponse, user) {
			expect(createResponse.statusCode).to.be(201); // created
			request.get(host + '/user/' + user.id, function(error, getResponse) {
				expect(getResponse.statusCode).to.be(200); // should return the temporary user
				request.del(host + '/user/' + user.id, function(error, deleteResponse) {
					expect(deleteResponse.statusCode).to.be(204); // 204 deleted
					done();			
				});
			});
		});
	});
    
	it('should return 404 for GET after DELETE', function(done) {
		var name = 'foo';
		var email = 'foo@bar.com';
		request.post({url:host + '/user', json:true, form:{name: name, email: email}}, function(error, createResponse, user) {
			expect(createResponse.statusCode).to.be(201); // created
			request.get(host + '/user/' + user.id, function(error, getResponse) {
				expect(getResponse.statusCode).to.be(200); // should return the temporary user
				request.del(host + '/user/' + user.id, function(error, deleteResponse) {
					expect(deleteResponse.statusCode).to.be(204); // 204 deleted
					request.get(host + '/user/' + user.id, function(error, checkResponse) {
						expect(checkResponse.statusCode).to.be(404); // user should now be deleted
						done();			
					});
				});
			});
		});
	});
    
    it('should return 404 for nonexistant UID', function(done) {
        request.get(host + '/user/99999', function(error, response) {
            expect(response.statusCode).to.be(404);
            done();
        });
    });
    
    it('should have HREF', function(done) {
        util.createUser(function (user) {
            request.get({
                url: host + '/user/' + user.id,
                json: true
            }, function (error, response, body) {
                expect(body.href).to.not.be(undefined);
                expect(body.href).to.not.be(null);
                done();
            });
        });
	});    
    
    it('should have HREF that can be followed correctly', function(done) {
        util.createUser(function (user) {
            request.get({
                url: host + '/user/' + user.id,
                json: true
            }, function (error, response, body) {
                var hrefUrl = host + body.href;
                var hrefName = body.name;
                var hrefEmail = body.email;
                var hrefDateSU = body.dateSignedUp;
                var hrefDateMod = body.dateModified;
                var hrefHref = body.href;
                var hrefID = body.id;
                request.get({
                    url: hrefUrl,
                    json: true
                }, function (error, response, hrefBody) {
                    expect(hrefBody.name).to.be(hrefName);
                    expect(hrefBody.email).to.be(hrefEmail);
                    expect(hrefBody.dateSignedUp).to.be(hrefDateSU);
                    expect(hrefBody.dateModified).to.be(hrefDateMod);
                    expect(hrefBody.href).to.be(hrefHref);
                    expect(hrefBody.id).to.be(hrefID);
                    done();
                });
            });
        });
	});
    
    

    // PUT should update an existing user
    // PUT should return 404 for unknown user

});
