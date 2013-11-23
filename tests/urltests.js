var request = require('request');
var expect = require('expect.js');
var host = 'http://localhost:3000';

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
		request.post({url:host + '/user', json:true}, {form:{'name':'foo', 'email':'bar@example.com', 'dateSignedUp': Date.now()}}, function(error, response, body){
			expect(body['name']).to.be('foo');
			expect(body['email']).to.be('bar@example.com');
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
		request.get(host + '/user/:id', function(error, response){
			expect(response.statusCode).to.be(200);
			done();
		});
	});
	
	/*
	Needs POST test
	it('should return 201 created for POST', function(done){
	});
	*/
	
	it('server should respond for HEAD', function(done){
		request.head(host + '/user/:id', function(error, response){
			expect(response).to.not.be(undefined);
			expect(response).to.not.be(null);
			done();
		});
	});
	
	it('should return 200 for HEAD', function(done){
		request.head(host + '/user/:id', function(error, response){
			expect(response.statusCode).to.be(200);
			done();
		});
	});
	
	it('should return 404 for GET after DELETE', function(done){
		request.del(host + '/user/:id', function(error, response){
			request.get(host + '/user/:id', function(error, response){
				expect(response.statusCode).to.be(404);
				done();			
			});
		});
	});
});