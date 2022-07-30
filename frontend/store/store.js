import { createStore, applyMiddleware } from "redux";
import rootReducer from '../reducer/root_reducer'
import thunk from '../middleware/thunk'
const configureStore = (preLoadedStore = {}) => {
    return createStore(rootReducer,preLoadedStore,applyMiddleware(thunk))
}

export default configureStore;