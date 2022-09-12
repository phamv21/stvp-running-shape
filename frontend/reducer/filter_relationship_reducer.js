import { RECEIVE_FRIENDS,RECEIVE_REQUESTED,RECEIVE_PEOPLE, RECEIVE_PENDING,RECEIVE_A_REQUEST, UNDO_A_REQUEST, RECEIVE_A_PENDING_RESPONSE,RECEIVE_UNFRIEND } from "../actions/relationship_actions";

//save the user id of each catagories
const default_state = {
    friends:[],
    people:[],
    requested:[],
    pending:[],
}

 const relationshipReducer = (state = default_state,action) =>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_FRIENDS:
            let friendIds = Object.keys(action.users);
            return Object.assign({},state,{friends:friendIds});
        case RECEIVE_UNFRIEND:
            friendIds = state.friends.filter(el => el != action.userId)
            return Object.assign({},state,{friends:friendIds});
        case RECEIVE_PENDING:
            let pendingIds = Object.keys(action.users);
            return Object.assign({},state,{pending:pendingIds});
        case RECEIVE_A_PENDING_RESPONSE:
            pendingIds = state.pending.filter(el => el != action.userId);    
            if(action.decision == 'Accept'){
             friendIds = [...state.friends, action.userId];      
            }
            if(action.decision == 'Deny'){
                friendIds = [...state.friends];
            }
            return Object.assign({},state,{friends:friendIds,pending:pendingIds});
            
        case RECEIVE_PEOPLE:
            let peopleIds = Object.keys(action.users);
            return Object.assign({},state,{people:peopleIds});
        case RECEIVE_REQUESTED:
            let requestedIds = Object.keys(action.users);
            return Object.assign({},state,{requested:requestedIds});
        case RECEIVE_A_REQUEST:
             peopleIds = state.people.filter(el => el != action.userId)
            requestedIds = [...state.requested, action.userId]
            return Object.assign({},state,{requested:requestedIds,people:peopleIds});
        case UNDO_A_REQUEST:
            requestedIds = state.requested.filter(el => el != action.userId)
            return Object.assign({},state,{requested:requestedIds});
        default:
            return state;
    }
}
export default relationshipReducer;