import { RECEIVE_ACTIVITIES,RECEIVE_USER_ACTIVITIES, RECEIVE_ACTIVITY,RECEIVE_NEW_ACTIVITY, RECEIVE_MY_ACTIVITIES } from "../actions/activity_actions";
import { RECEIVE_LIKE, REMOVE_LIKE } from "../actions/like_action";
import { RECEIVE_COMMENT } from "../actions/comment_action";
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";
const activityReducer = (state ={}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_ACTIVITIES:
            return Object.assign({},state,action.activities);
        case RECEIVE_USER_ACTIVITIES:
            return Object.assign({},state,action.activities);
        case RECEIVE_MY_ACTIVITIES:
            return Object.assign({},action.activities,state);
        case RECEIVE_ACTIVITY:
            return Object.assign({},state,action.activity);
        case RECEIVE_NEW_ACTIVITY:
            return Object.assign({},state,action.activity);
        case RECEIVE_LIKE:
            let actId = Object.keys(action.like)[0];
            let newState = {...state};
            newState[actId]['like_count'] += 1;
            return newState;
        case RECEIVE_COMMENT:
            actId = Object.keys(action.comment)[0];
            newState = {...state};
            newState[actId]['comment_count'] += 1;
            return newState;
        case REMOVE_LIKE:
            actId = Object.keys(action.like)[0];
            newState = {...state};
            newState[actId]['like_count'] -= 1
            return newState;

        case LOGOUT_CURRENT_USER:
            return {}
        default:
            return state;
        
    }
}

export default activityReducer;