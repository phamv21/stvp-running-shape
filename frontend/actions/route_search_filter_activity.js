import { searchRoutes } from "./route_actions";
export const UPDATE_SEARCH_FILTER = 'UPDATE_SEARCH_FILTER';


export const updateSearchFilter = (filter,value) => ({
    type:UPDATE_SEARCH_FILTER,
    filter,
    value
})
//use to automatically trigger serach when changing the filter
export const updateFilterAndSearch = (filter,value) => (dispatch,getState)=>{
    dispatch(updateSearchFilter(filter,value));
    searchRoutes(getState().filters.searchRouteFilters)(dispatch)
}