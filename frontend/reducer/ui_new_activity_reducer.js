import { RECEIVE_NEW_ACTIVITY } from "../actions/activity_actions";

const uiNewActivityReducer = (state = null, action)=>{
    switch(action.type){
        case RECEIVE_NEW_ACTIVITY:
            return parseInt(Object.keys(action.activity)[0]);
        default:
            return null;
    }
}
export default uiNewActivityReducer;