import { combineReducers } from "redux";
import userReducer from "./user_reducer";
import routeReducer from "./route_reducer";
const entitiesReducer = combineReducers({users:userReducer,routes:routeReducer});
export default entitiesReducer