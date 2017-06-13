const app = require('./index')
const request = require('supertest').agent(app.listen())

require('should')

describe('Blog', function(){
	describe('GET /',function(){
		it('should see title "posts"', function(done){
			request
			.get('/')
			.expect(200,function(err,res){
				if(err) return done(err)
				res.should.be.html
				res.text.should.match(/<h1>Posts<\/h1>/)
				done()	
			})
		})

		it('should see 0 post', function(done){
			request
			.get('/')
			.expect(200,function(err,res){
				if(err) return done(err)

				  res.should.be.html
				//console.log(res.text +'=======')
  				  res.text.should.match(/<p>You have <strong>0<\/strong> posts!<\/p>/)
  				  done()
			})
		})
	})

	describe('/POST /post/new', function(){
		it('should create post and redirect to /',function(done){
			request
			.post('/post')
			.send({title:'Title',body: 'contents'})
			.end(function(err,res){
				if(err) return done(err)

				res.header.location.should.be.equal('/')	
			done()
			})
		})
	})

	describe('Get /post/0', function(){
		it('should see post ',function(done){
			request
			.get('/post/0')
			.expect(200, function(err,res) {
				if(err) return done(err)

			    res.should.be.html
			    res.text.should.match(/<h1>Title<\/h1>/)
			    res.text.should.match(/<p>contents<\/p>/)
			    done()
			})
		})
	})
})