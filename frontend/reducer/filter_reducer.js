import { combineReducers } from "redux";
import relationshipReducer from "./filter_relationship_reducer";
import myActivityReducer from "./filter_my_activity";
import userFeedReducer from "./filter_user_feed_reducer";
const filterReducer = combineReducers({relationship:relationshipReducer,myActivities:myActivityReducer,userFeed:userFeedReducer})

export default filterReducer;