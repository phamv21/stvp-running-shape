import { RECEIVE_CURRENT_ROUTE,RECEIVE_NEW_ROUTE, RECEIVE_CURRENT_ROUTES } from "../actions/route_actions";
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";

const routeReducer = (state ={}, action ) =>{
    Object.freeze(state);
    switch (action.type){
        case RECEIVE_CURRENT_ROUTES:
            return action.routes;
        case RECEIVE_CURRENT_ROUTE:
            return Object.assign({},state,action.route);
        case RECEIVE_NEW_ROUTE:
            return Object.assign({},state,action.route);
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
}

export default routeReducer;