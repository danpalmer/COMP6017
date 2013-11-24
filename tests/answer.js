var request = require('request');
var expect = require('expect.js');
var util = require('./util');

var host = util.host;

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