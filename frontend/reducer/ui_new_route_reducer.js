import { RECEIVE_NEW_ROUTE } from "../actions/route_actions";

 const uiNewRouteReducer = (state = null,action) => {
    switch(action.type){
        case RECEIVE_NEW_ROUTE:
            let newId = parseInt(Object.keys(action.route)[0]);
            return newId;
        default:
            return state;
    }
}

export default uiNewRouteReducer;