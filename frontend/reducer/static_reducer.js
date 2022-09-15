import { RECEIVE_IMAGES } from "../actions/static_actions";
const defaultState = {
    images:[]
}
const staticReducer = (state = defaultState, action)=>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_IMAGES:
            let images = Object.values(action.statics.images);
            let newState = {...state};
            newState['images'] = images
            return newState;
        default:
            return state;
    }
}
export default staticReducer;