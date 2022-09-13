import { RECEIVE_LIKE, RECEIVE_LIKES, REMOVE_LIKE } from "../actions/like_action";
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_FEED_ACTIVITIES } from "../actions/activity_actions";
export default function likeReducer(state={},action){
    Object.freeze(state);
    switch (action.type){
        case RECEIVE_LIKES:
            return Object.assign({},state,action.likes);
        case RECEIVE_FEED_ACTIVITIES:
            let likes = action.feedActivities.likes || {};
            return Object.assign({},state,likes);
        case RECEIVE_LIKE:
            return Object.assign({},state,action.like);
        case REMOVE_LIKE:
            let stateCopy = {...state};
            let likeToDelete = Object.keys(action.like)[0];
            delete stateCopy[likeToDelete];
            return stateCopy;
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
}