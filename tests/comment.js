var request = require('request');
var expect = require('expect.js');
var util = require('./util');

var host = util.host;

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

// TODO: Tests for /question/:id/answer/:id/comment
// TODO: Tests for /question/:id/answer/:id/comment/:id
