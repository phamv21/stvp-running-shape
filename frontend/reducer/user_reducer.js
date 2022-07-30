import { RECEIVE_CURRENT_USER,LOGOUT_CURRENT_USER } from "../actions/session_actions";

const userReducer = (state = {},action) =>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_CURRENT_USER:
            return Object.assign({},state,action.user);
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;

    }
}
export default userReducer;