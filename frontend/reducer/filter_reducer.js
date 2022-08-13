import { combineReducers } from "redux";
import relationshipReducer from "./filter_relationship_reducer";

const filterReducer = combineReducers({relationship:relationshipReducer})

export default filterReducer;