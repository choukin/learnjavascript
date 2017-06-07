export default function ({store,redirect,error}){
  if(!store.state.authUser){
  	error({
  		message: 'you are not connected',
  		statusCode: 403
  	})
  }
}