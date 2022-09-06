const logger = (store) => next => action =>{
console.log('before action',store.getState().ui.loading)
console.log('action',action)
let result = next(action);
console.log('after action',store.getState().ui.loading)
return result
}
export default logger;