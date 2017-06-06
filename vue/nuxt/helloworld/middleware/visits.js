export default function ({isServer,req,store, route, redirect}) {
	  if (isServer && !req) return
	store.commit('ADD_VISIT',route.path)
}