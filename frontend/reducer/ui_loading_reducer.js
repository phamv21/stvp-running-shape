import { RECEIVE_LOADING,STOP_LOADING } from "../actions/loading_actions"


const uiLoadingReducer = (state = false,action) => {
    switch(action.type){
        case RECEIVE_LOADING:
            return true;
        case STOP_LOADING:
            return false;
        default:
            return state;
    }
}
export default uiLoadingReducer;