import { combineReducers } from "redux";
import uiNewRouteReducer from "./ui_new_route_reducer";
import uiLoadingReducer from "./ui_loading_reducer";

const uiReducer = combineReducers({newRouteId:uiNewRouteReducer,loading:uiLoadingReducer});
export default uiReducer;