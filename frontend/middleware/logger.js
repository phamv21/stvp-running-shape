const logger = (store) => next => action =>{
// console.log('before action',store.getState().filters)
// console.log('action',action)
let result = next(action);
// console.log('after action',store.getState().filters)
return result
}
export default logger;