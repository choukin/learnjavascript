const app = require('./index.js')

const request = require('supertest').agent(app.listen())

describe('base-auth', function(){
	describe('with no credentials',function(){
		it('should throw 401', function(done){
			request.get('/')
			  .expect(401,done)
		})
	})

	describe('with invalid credentials',function(){
		it('should throw 401', function(done){
			request.get('/').
			  auth('user','invalid password')
			  .expect(401,done);
		})
	})

	describe('width valid credentials', function(){
		it('should call the next middleware',function(done){
			request.get('/')
			 .auth('tj','tobi')
			 .expect(200)
			 .expect('secret',done)
		})
	})
})