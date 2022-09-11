import { RECEIVE_FEED_PAGE, RECEIVE_USER_FEED_PAGE } from "../actions/pagination_action";
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";
const defaultState = {
    feedPage: 0,
    userFeedPage:0,
}
export const uiFeedPageReducer = (state = defaultState, action) =>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_FEED_PAGE:
            let newState = {...state};
            newState['feedPage'] = action.page;
            return newState;

        case RECEIVE_USER_FEED_PAGE:
            newState = {...state};
            newState['userFeedPage'] = action.page;
            return newState;
        case LOGOUT_CURRENT_USER:
            return defaultState;
        default:
            return state;
    }
}

export default uiFeedPageReducer;