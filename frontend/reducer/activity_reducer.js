import { RECEIVE_ACTIVITIES, RECEIVE_ACTIVITY } from "../actions/activity_actions";
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";
const activityReducer = (state ={}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_ACTIVITIES:
            return Object.assign({},state,action.activities);
        case RECEIVE_ACTIVITY:
            return Object.assign({},state,action.activity);
        case LOGOUT_CURRENT_USER:
            return {}
        default:
            return state;
        
    }
}

export default activityReducer;