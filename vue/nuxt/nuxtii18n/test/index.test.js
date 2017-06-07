import test from 'ava'
import Nuxt from 'nuxt'
import {resolve} from 'path'

let nuxt = null
let server = null

test.before('Init Nuxt.js',async t => {
	const rootDir = resolve(__dirname,'..')
	let config = {}
	try{
		config = require(resolve(rootDir, 'nuxt.config.js'))
    }catch(e){

    }
    config.rootDir = rootDir
    config.dev =  false
    nuxt = new Nuxt(config)
    await nuxt.build()
    server = new nuxt.Server(nuxt)
    server.listen(4000,'localhost')
})

test('route / exits and render Html', async t => {
	let context = {}
	const {html} = await nuxt.renderRoute('/', context)
	t.true(html.includes('<h1 class="content_title">Welcome</h1>'))
})

test('Route / exits and render Html with css applied', async t => {
	const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
	const element = window.document.querySelector('.content_title')
	t.not(element, null)
	t.is(element.className,'content_title')
	t.is(window.getComputedStyle(element).display,'block')
})

test.after('Closing server and nuxt.js',t => {
	server.close()
	nuxt.close()
})