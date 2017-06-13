const app = require('./index')
const request = require('supertest').agent(app.listen())

describe('Cookies', function(){
	[1,2,3].forEach(function(i){
	it('should cookies views =  1 ',function(done){
		request
		.get('/')
		.expect(200)
		.expect('Set-Cookie',new RegExp('view='+i))
		.expect(i + ' views',done)
	})
	})
})