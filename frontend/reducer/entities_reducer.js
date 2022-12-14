import { combineReducers } from "redux";
import userReducer from "./user_reducer";
import routeReducer from "./route_reducer";
import activityReducer from "./activity_reducer";
import commentReducer from "./comment_reducer";
import likeReducer from "./like_reducer";
import staticReducer from "./static_reducer";
const entitiesReducer = combineReducers({users:userReducer,routes:routeReducer,activities:activityReducer, comments:commentReducer, likes:likeReducer,statics:staticReducer});
export default entitiesReducer