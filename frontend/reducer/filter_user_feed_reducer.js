import { RECEIVE_USER_ACTIVITIES } from "../actions/activity_actions";


const userFeedReducer = (state ={},action) =>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_USER_ACTIVITIES:
            let user_activity_ids = Object.keys(action.activities);
            let result = {...state};
            result[action.user_id] = user_activity_ids;
            return result;
        default:
            return state;
    }
}
export default userFeedReducer;