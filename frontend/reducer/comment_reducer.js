import { RECEIVE_COMMENT, RECEIVE_COMMENTS } from "../actions/comment_action";

// the state of comment will be activity_id => {comment_id=>{comment_data}}
const commentReducer = (state = {}, action) =>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_COMMENTS:
            return Object.assign({},state,action.comments);
        case RECEIVE_COMMENT:
            let action_id = Object.keys(action.comment)[0];
            let oldStateEl = state[action_id];
            let newStateEl = {};
            newStateEl[action_id] = Object.assign({},oldStateEl,action.comment[action_id]);
            return Object.assign({},state,newStateEl);
        default:
            return state;


    }
}

export default commentReducer;