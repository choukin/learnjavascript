export default function (context) {
	// TODO
	if (context.isServer && !context.req) return
	context.userAgent = context.isServer ?context.req.headers['user-agent']:navigator.userAgent
}