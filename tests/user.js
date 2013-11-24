var request = require('request');
var expect = require('expect.js');
var util = require('./util');

var host = util.host;

describe('/user', function(){
	
	it('server should respond', function(done){
		request.get(host + '/user', function(error, response){
			expect(response).to.not.be(undefined);
			expect(response).to.not.be(null);
			done();
		});
	});
	
	it('should return 200 for GET', function(done){
		request.get(host + '/user', function(error, response){
			expect(response.statusCode).to.be(200);
			done();
		});
	});

	it('should return 201 created for POST', function(done){
		request.post(host + '/user', {form:{'name':'foo', 'email':'bar@example.com', 'dateSignedUp': Date.now()}}, function(error, response){
			expect(response.statusCode).to.be(201);
			done();
		});
	});
	
	it('should return the correct, new user on POST', function(done){
		var name = 'foo';
		var email = 'foo@bar.com';
		request.post({url:host + '/user', json:true, form:{name: name, email: email}}, function(error, response, body){
			expect(body.name).to.be(name);
			expect(body.email).to.be(email);
			done();
		});
	});

});

describe('/user/:id', function(){	
	
	it('server should respond', function(done){
		request.get(host + '/user/:id', function(error, response){
			expect(response).to.not.be(undefined);
			expect(response).to.not.be(null);
			done();
		});
	});
	
	it('should return 200 for GET', function(done){
		var name = 'foo';
		var email = 'foo@bar.com';
		request.post({url:host + '/user', json:true, form:{name: name, email: email}}, function(error, response, user){
			request.get(host + '/user/' + user.id, function(error, response){
				expect(response.statusCode).to.be(200);
				done();
			});
		});
	});
	
	it('server should respond for HEAD', function(done){
		var name = 'foo';
		var email = 'foo@bar.com';
		request.post({url:host + '/user', json:true, form:{name: name, email: email}}, function(error, response, user){
			request.get(host + '/user/' + user.id, function(error, response){
				expect(response).to.not.be(undefined);
				expect(response).to.not.be(null);
				done();
			});
		});
	});
	
	it('should return 200 for HEAD', function(done){
		var name = 'foo';
		var email = 'foo@bar.com';
		request.post({url:host + '/user', json:true, form:{name: name, email: email}}, function(error, response, user){
			request.get(host + '/user/' + user.id, function(error, response){
				expect(response.statusCode).to.be(200);
				done();
			});
		});
	});
	
	it('should return 404 for GET after DELETE', function(done){
		var name = 'foo';
		var email = 'foo@bar.com';
		request.post({url:host + '/user', json:true, form:{name: name, email: email}}, function(error, createResponse, user){
			expect(createResponse.statusCode).to.be(201); // created
			request.get(host + '/user/' + user.id, function(error, getResponse){
				expect(getResponse.statusCode).to.be(200); // should return the temporary user
				request.del(host + '/user/' + user.id, function(error, deleteResponse){
					expect(deleteResponse.statusCode).to.be(204); // 204 deleted
					request.get(host + '/user/' + user.id, function(error, checkResponse){
						expect(checkResponse.statusCode).to.be(404); // user should now be deleted
						done();			
					});
				});
			});
		});
	});

	// PUT should update an existing user
	// PUT should return 404 for unknown user
	// DELETE should return 404 for unknown user

});