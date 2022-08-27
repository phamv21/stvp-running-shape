import { combineReducers } from "redux";
import relationshipReducer from "./filter_relationship_reducer";
import myActivityReducer from "./filter_my_activity";
const filterReducer = combineReducers({relationship:relationshipReducer,myActivities:myActivityReducer})

export default filterReducer;