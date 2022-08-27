import { RECEIVE_ACTIVITIES, RECEIVE_ACTIVITY,RECEIVE_NEW_ACTIVITY, RECEIVE_MY_ACTIVITIES } from "../actions/activity_actions";
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";
const activityReducer = (state ={}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_ACTIVITIES:
            return Object.assign({},state,action.activities);
        case RECEIVE_MY_ACTIVITIES:
            return Object.assign({},state,action.activities);
        case RECEIVE_ACTIVITY:
            return Object.assign({},state,action.activity);
        case RECEIVE_NEW_ACTIVITY:
            return Object.assign({},state,action.activity);
        case LOGOUT_CURRENT_USER:
            return {}
        default:
            return state;
        
    }
}

export default activityReducer;