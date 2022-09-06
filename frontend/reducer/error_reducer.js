import { RECEIVE_ERRORS } from "../actions/session_actions";


const errorReducer = (state = [], action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_ERRORS:
            return state.concat(action.errors);
        default: 
        return [];
    }
}

export default errorReducer;