import { combineReducers } from "redux";
import userReducer from "./user_reducer";
import routeReducer from "./route_reducer";
import activityReducer from "./activity_reducer";

const entitiesReducer = combineReducers({users:userReducer,routes:routeReducer,activities:activityReducer});
export default entitiesReducer