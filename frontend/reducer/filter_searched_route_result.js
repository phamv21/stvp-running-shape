import { RECEIVE_SEARCHED_ROUTES } from "../actions/route_actions";

export const searchedRouteResultReducer = (state=[],action)=>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_SEARCHED_ROUTES:
            if (action.page == 0){
                return Object.keys(action.routes)
            }else{
                let oldState = [...state];
                let newIds = Object.keys(action.routes);
                return [...oldState,...newIds]
            }
            
        default:
            return state;
    }
}