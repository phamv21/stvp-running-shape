import { RECEIVE_SEARCHED_ROUTES } from "../actions/route_actions";

export const searchedRouteResultReducer = (state=[],action)=>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_SEARCHED_ROUTES:
            return Object.keys(action.routes);
        default:
            return state;
    }
}