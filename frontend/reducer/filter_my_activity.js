import { RECEIVE_MY_ACTIVITIES } from "../actions/activity_actions";


const myActivityReducer = (state=[], action) =>{
    Object.freeze(state);
    switch (action.type){
        case RECEIVE_MY_ACTIVITIES:
            return Object.keys(action.activities)
        default:
            return state;
    }
}
export default myActivityReducer