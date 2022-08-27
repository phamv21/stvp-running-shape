import { combineReducers } from "redux";
import uiNewRouteReducer from "./ui_new_route_reducer";
import uiLoadingReducer from "./ui_loading_reducer";
import uiNewActivityReducer from "./ui_new_activity_reducer";
const uiReducer = combineReducers({newRouteId:uiNewRouteReducer,newActivityId:uiNewActivityReducer,loading:uiLoadingReducer});
export default uiReducer;