const should = require('should')
const app = require('./index')
const request = require('supertest').agent(app.listen())

describe('404',function(){
	describe('when Get /',function(){
		it('should return the 404 page', function(done){
			request
			.get('/')
			.expect(404)
			.expect(/Page Not Found/, done);
		})

	})

	describe('when Get /',function(){

		it('should return the 404 page width application/json', function(done){
			request
			.get('/')
			.set('Accept', 'application/json')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(404)
			.expect({
				message:'Page Not Found'
			}, done);
		})
	})

	describe('when Get /',function(){
		
		it('should return the 404 page width text/html', function(done){
			request
			.get('/')
			.set('Accept', 'text/html')
			.expect('Content-Type', 'text/html; charset=utf-8')
			.expect(404)
			.expect('<p>Page Not Found</p>', done);
		})
	})
})