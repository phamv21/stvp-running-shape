import { RECEIVE_ACTIVITIES, RECEIVE_ACTIVITY } from "../actions/activity_actions";

const activityReducer = (state ={}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_ACTIVITIES:
            return Object.assign({},state,action.activities);
        case RECEIVE_ACTIVITY:
            return Object.assign({},state,action.activity);
        default:
            return state;
        
    }
}

export default activityReducer;