export default function ({app,store,route,params,error,redirect,hotReload}){
	if(hotReload) return
	const locale = params.lang || 'en'
	if (store.state.locales.indexOf(locale) === -1) {
		return error({message:'this page could not be found', statusCode:404})
	}
    store.commit('SET_LANG', locale)
    app.i18n.locale = store.state.locale

    if(locale === 'en' && route.fullPath.indexOf('/en') === 0){
    	return redirect(route.fullpath.replace(/^\/en/,'/'))
    }


}