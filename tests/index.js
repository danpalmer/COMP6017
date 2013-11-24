var request = require('request');
var expect = require('expect.js');
var util = require('./util');

var host = util.host;

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
  
  // Do we want to return anything from the home page?
  // Perhaps we could return a list of endpoints and ways to access them?

});