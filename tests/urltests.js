var request = require('request');
var expect = require('expect.js');
var host = 'http://localhost:3000';

describe('/', function(){
	
	it('server should respond', function(done){
		request.get(host + '/', function(error, response){
			expect(response).to.not.be(undefined);
			expect(response).to.not.be(null);
			done();
		});
	});
	
	it('should return 200 for GET', function(done){
		request.get(host + '/', function(error, response){
			expect(response.statusCode).to.be(200);
			done();
		});
	});
	/*
	needs fleshing out once the home page is fleshed out
	it('should return the home page on get', function(done){
		request.get({url:host + '/', json:true}, function(error, response){
			expect(body[contents]).to.be(something relevant here);
			done();
		});
	});
	*/
});

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
	
	/*
	Needs POST test
	it('should return 201 created for POST', function(done){
	});
	*/
	
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
				expect(getResponse.statusCode).to.be(200); // should have created the temporary user
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

describe('/question', function(){

	it('server should respond', function(done){
		request.get(host + '/question', function(error, response){
			expect(response).to.not.be(undefined);
			expect(response).to.not.be(null);
			done();
		});
	});
	
	it('should return 200 for GET', function(done){
		request.get(host + '/question', function(error, response){
			expect(response.statusCode).to.be(200);
			done();
		});
	});
	
	it('should return 201 created for POST', function(done){
		//needs author key added to form
		request.post(host + '/question', {form:{title:'foo', content:'bar?'}}, function(error, response){
			expect(response.statusCode).to.be(201);
			done();
		});
	});
	
	it('should return a valid question', function(done){
		request.get({url:host + '/question/:id', json:true}, function(error, response, body){
			expect(body['content']).to.not.be(null);
			done();
		});
	});
	/*
	Need author key in POSTed form before test can be done
	it('should have a user', function(done){
	});
	*/
	
	/*
	Need author key in POSTed form before test can be done
	it('should link to a valid user', function(done){	
	});
	*/
});

describe('/question/:id', function(){

	it('server should respond', function(done){
		request.get(host + '/question/:id', function(error, response){
			expect(response).to.not.be(undefined);
			expect(response).to.not.be(null);
			done();
		});
	});
	
	it('should return 200 for GET', function(done){
		request.get(host + '/question/:id', function(error, response){
			expect(response.statusCode).to.be(200);
			done();
		});
	});
	
	it('should return 201 created for POST', function(done){
		//needs author key added to form
		request.post(host + '/question/:id', {form:{title:'foo', content:'bar?'}}, function(error, response){
			expect(response.statusCode).to.be(201);
			done();
		});
	});
	
	it('should return a valid question', function(done){
		request.get({url:host + '/question/:id', json:true}, function(error, response, body){
			expect(body['content']).to.not.be(null);
			done();
		});
	});
	/*
	Need author key in POSTed form before test can be done
	it('should have a user', function(done){
	});
	*/
	
	/*
	Need author key in POSTed form before test can be done
	it('should link to a valid user', function(done){	
	});
	*/

	it('server should respond for HEAD', function(done){
		request.head(host + '/question/:id', function(error, response){
			expect(response).to.not.be(undefined);
			expect(response).to.not.be(null);
			done();
		});
	});
	
	it('should return 200 for HEAD', function(done){
		request.head(host + '/question/:id', function(error, response){
			expect(response.statusCode).to.be(200);
			done();
		});
	});
	
	it('should return 404 for GET after DELETE', function(done){
		request.del(host + '/question/:id', function(error, response){
			request.get(host + '/question/:id', function(error, response){
				expect(response.statusCode).to.be(404);
				done();			
			});
		});
	});
});

describe('/question/:id/comment', function(){

	it('server should respond', function(done){
		request.get(host + '/question/:id/comment', function(error, response){
			expect(response).to.not.be(undefined);
			expect(response).to.not.be(null);
			done();
		});
	});
	
	it('should return 200 for GET', function(done){
		request.get(host + '/question/:id/comment', function(error, response){
			expect(response.statusCode).to.be(200);
			done();
		});
	});
	
	it('should return 201 created for POST', function(done){
		//needs author key added to form
		request.post(host + '/question/:id/comment', {form:{title:'foo', content:'bar?'}}, function(error, response){
			expect(response.statusCode).to.be(201);
			done();
		});
	});
	
	it('should return a valid comment', function(done){
		request.get({url:host + '/question/:id/comment', json:true}, function(error, response, body){
			expect(body['content']).to.not.be(null);
			done();
		});
	});
	/*
	Need author key in POSTed form before test can be done
	it('should have a user', function(done){
	});
	*/
	
	/*
	Need author key in POSTed form before test can be done
	it('should link to a valid user', function(done){	
	});
	*/
});

describe('/question/:id/comment/:id', function(){

	it('server should respond', function(done){
		request.get(host + '/question/:id/comment/:id', function(error, response){
			expect(response).to.not.be(undefined);
			expect(response).to.not.be(null);
			done();
		});
	});
	
	it('should return 200 for GET', function(done){
		request.get(host + '/question/:id/comment/:id', function(error, response){
			expect(response.statusCode).to.be(200);
			done();
		});
	});
	
	/*
	Needs POST implementation definitions first befre test can be properly written
	it('should return 201 created for POST', function(done){
		//needs author key added to form
		request.post(host + '/question/:id/comment/:id', {form:{title:'foo', content:'bar?'}}, function(error, response){
			expect(response.statusCode).to.be(201);
			done();
		});
	});
	*/
	
	it('should return a valid comment', function(done){
		request.get({url:host + '/question/:id/comment/:id', json:true}, function(error, response, body){
			expect(body['content']).to.not.be(null);
			done();
		});
	});
	/*
	Need author key in POSTed form before test can be done
	it('should have a user', function(done){
	});
	*/
	
	/*
	Need author key in POSTed form before test can be done
	it('should link to a valid user', function(done){	
	});
	*/

	it('server should respond for HEAD', function(done){
		request.head(host + '/question/:id/comment/:id', function(error, response){
			expect(response).to.not.be(undefined);
			expect(response).to.not.be(null);
			done();
		});
	});
	
	it('should return 200 for HEAD', function(done){
		request.head(host + '/question/:id/comment/:id', function(error, response){
			expect(response.statusCode).to.be(200);
			done();
		});
	});
	
	it('should return 404 for GET after DELETE', function(done){
		request.del(host + '/question/:id/comment/:id', function(error, response){
			request.get(host + '/question/:id/comment/:id', function(error, response){
				expect(response.statusCode).to.be(404);
				done();			
			});
		});
	});
});

describe('/question/:id/answer', function(){

	it('server should respond', function(done){
		request.get(host + '/question/:id/answer', function(error, response){
			expect(response).to.not.be(undefined);
			expect(response).to.not.be(null);
			done();
		});
	});
	
	it('should return 200 for GET', function(done){
		request.get(host + '/question/:id/answer', function(error, response){
			expect(response.statusCode).to.be(200);
			done();
		});
	});
	
	/*
	POST tests need writing later
	it('should return 201 created for POST', function(done){
		//needs author key added to form
		request.post(host + '/question/:id/answer', {form:{title:'foo', content:'bar?'}}, function(error, response){
			expect(response.statusCode).to.be(201);
			done();
		});
	});
	*/
	
	it('should return a valid answer', function(done){
		request.get({url:host + '/question/:id/answer', json:true}, function(error, response, body){
			expect(body['content']).to.not.be(null);
			done();
		});
	});
	/*
	Need author key in POSTed form before test can be done
	it('should have a user', function(done){
	});
	*/
	
	/*
	Need author key in POSTed form before test can be done
	it('should link to a valid user', function(done){	
	});
	*/
});
