const app = require('./index')
const request = require('supertest').agent(app.listen())

describe('Compose', function(){
	describe('When GET /',function(){
		it('should say "hello world"',function(done){
			request
			.get('/')
			.expect(200)
			.expect('Hello World', done)
		})

		it('should set X-Response-Time',function(done){
			request
			.get('/')
			.expect('X-Response-Time',/ms$/)
			.expect(200,done)
		})
	})

	describe('when not GET /', function(){
		it('should 404',function(done){
			request
			.get('/akmd')
			.expect(404,done)
		})
	})
})