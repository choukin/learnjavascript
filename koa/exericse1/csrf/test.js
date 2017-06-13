require('should')
const app = require('./index')
const request = require('supertest').agent(app.listen())

let token 
let cookie

describe('csrf', function(){
	describe('GET /token',function(){
		it('should get token', function(done){
			request
			.get('/token')
			.expect(200)
			.end(function(err,res){
				if(err) done(err)
				token = res.text
				token.should.be.String
				cookie = res.headers['set-cookie'].join(';')
				done()
			})
		})
	})

	describe('POST /post',function(){
		it('should 403 without token',function(done){
			request
			.post('/post')
			.send({foo:'bar'})
			.expect(403,done)
		})

		it('should 403 with wrong token',function(done){
			request
			.post('/post')
			.set('Cookie',cookie)
			.set('x-csrf-token','wrong')
			.send({foo:'bar'})
			.expect(403,done)
		})

		it('should 200 with token in head', function(done){
			request
			.post('/post')
			.set('Cookie', cookie)
			.set('x-csrf-token',token)
			.expect(200,done)
		})
		it('should 200 with token in body', function(done){
			request
			.post('/post')
			.set('Cookie', cookie)
			.send({_csrf:token})
			.expect(200,done)
		})
	})
})