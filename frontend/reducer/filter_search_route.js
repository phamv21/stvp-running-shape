import { UPDATE_SEARCH_FILTER } from "../actions/route_search_filter_activity";


export const searchRouteFilterReducer = (state ={}, action) =>{
    Object.freeze(state);
    switch (action.type){
        case UPDATE_SEARCH_FILTER:
            let newFilter = {};
            newFilter[action.filter]= action.value;
            return Object.assign({},state,newFilter);
        default:
            return state;
    }
}