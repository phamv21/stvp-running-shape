import { RECEIVE_USER_ACTIVITIES,RECEIVE_USER_FEED_ACTIVITIES } from "../actions/activity_actions";
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";

const userFeedReducer = (state ={},action) =>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_USER_FEED_ACTIVITIES:
            let user_activities = action.feedActivities.activities != null ? action.feedActivities.activities : {};
            let result = {...state};
            result[action.user_id] ||= {};
            result[action.user_id] = Object.assign({},result[action.user_id],user_activities)
            return result;
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
}
export default userFeedReducer;