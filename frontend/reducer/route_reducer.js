import { RECEIVE_CURRENT_ROUTE, RECEIVE_CURRENT_ROUTES } from "../actions/route_actions";


const routeReducer = (state ={}, action ) =>{
    Object.freeze(state);
    switch (action.type){
        case RECEIVE_CURRENT_ROUTES:
            return action.routes;
        case RECEIVE_CURRENT_ROUTE:
            return Object.assign({},state,action.route);
        default:
            return state;
    }
}

export default routeReducer;