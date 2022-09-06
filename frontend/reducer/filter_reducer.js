import { combineReducers } from "redux";
import relationshipReducer from "./filter_relationship_reducer";
import myActivityReducer from "./filter_my_activity";
import userFeedReducer from "./filter_user_feed_reducer";
import { searchRouteFilterReducer } from "./filter_search_route";
import { searchedRouteResultReducer } from "./filter_searched_route_result";
const filterReducer = combineReducers({relationship:relationshipReducer,myActivities:myActivityReducer,userFeed:userFeedReducer,searchRouteFilters:searchRouteFilterReducer,searchedRouteResults:searchedRouteResultReducer})

export default filterReducer;