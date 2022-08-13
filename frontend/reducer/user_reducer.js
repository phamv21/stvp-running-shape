import { RECEIVE_CURRENT_USER,LOGOUT_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_REQUESTED, RECEIVE_FRIENDS, RECEIVE_PEOPLE, RECEIVE_PENDING } from "../actions/relationship_actions";
const userReducer = (state = {},action) =>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_FRIENDS:
            return Object.assign({},state,action.users);
        case RECEIVE_PENDING:
            return Object.assign({},state,action.users);
        case RECEIVE_REQUESTED:
            return Object.assign({},state,action.users);
        case RECEIVE_PEOPLE:
            return Object.assign({},state,action.users);
        case RECEIVE_CURRENT_USER:
            return Object.assign({},state,action.user);
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;

    }
}
export default userReducer;