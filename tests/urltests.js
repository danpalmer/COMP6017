var request = require('request');
var expect = require('expect.js');
var host = 'localhost:3000';

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
/*
describe('/question/:id', function(){

});*/