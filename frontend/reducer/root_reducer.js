import { combineReducers } from "redux";
import errorReducer from "./error_reducer";
import sessionReducer from "./session_reducer";
import entitiesReducer from "./entities_reducer";
import uiReducer from "./ui_reducer";

const rootReducer = combineReducers({errors:errorReducer,entities:entitiesReducer,session:sessionReducer,ui:uiReducer})
export default rootReducer;