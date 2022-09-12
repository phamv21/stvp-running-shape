import * as API from '../utils/community_util'
import { receiveLoading,stopLoading } from './loading_actions';
import { receiveErrors } from './session_actions';
export const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS';
export const RECEIVE_PEOPLE = 'RECEIVE_PEOPLE';
export const RECEIVE_REQUESTED = 'RECEIVE_REQUESTED';
export const RECEIVE_PENDING = 'RECEIVE_PENDING';
export const RECEIVE_A_REQUEST = 'RECEIVE_A_REQUEST'
export const UNDO_A_REQUEST = 'UNDO_A_REQUEST';
export const RECEIVE_UNFRIEND = 'RECEIVE_UNFRIEND';
export const RECEIVE_A_PENDING_RESPONSE = 'RECEIVE_A_PENDING_RESPONSE'

export const receiveAPendingResponse= (userId,decision)=>({
    type: RECEIVE_A_PENDING_RESPONSE,
    userId,
    decision
})

export const receivePeople = (users) => ({
    type: RECEIVE_PEOPLE,
    users
})

export const receiveFriends = (users) =>({
    type: RECEIVE_FRIENDS,
    users
})

export const receiveRequested = (users) =>({
    type: RECEIVE_REQUESTED,
    users
})

export const receiveARequest = (userId) =>({
    type: RECEIVE_A_REQUEST,
    userId
})
export const undoARequest = (userId) =>({
    type: UNDO_A_REQUEST,
    userId
})
export const receiveUnFriend = (userId) =>({
    type: RECEIVE_UNFRIEND,
    userId
})
// use to show the pending request
export const receivePending = users =>({
    type: RECEIVE_PENDING,
    users
})

export const findPending = () => dispatch =>{
    dispatch(receiveLoading());
    API.fetchPendingRequests().then(
        users =>{
            dispatch(stopLoading());
            dispatch(receivePending(users));
        },
        errors =>{
            dispatch(stopLoading());
            dispatch(receiveErrors(errors.responseJSON));
        }
    )
}
//Respond to the pending request
export const requestRespond = ({other_user_id,decision}) => dispatch =>{
    dispatch(receiveLoading());
    API.requestRespond({other_user_id,decision}).then(
        users =>{
            dispatch(stopLoading());
            dispatch(receiveAPendingResponse(other_user_id,decision));
        },
        errors =>{
            dispatch(stopLoading());
            dispatch(receiveErrors(errors.responseJSON));
        }
    )
}



export const findPeople = query => dispatch => {
    dispatch(receiveLoading());
    API.findPeople(query).then(
        users => {
            dispatch(receivePeople(users));
            dispatch(stopLoading());
        },
        errors => {
            dispatch(stopLoading());
            dispatch(receiveErrors(errors.responseJSON));
        }
    )
}

export const findFriends = () => dispatch =>{
    dispatch(receiveLoading())
    API.fetchFriends().then(
        users =>{
            dispatch(stopLoading());
            dispatch(receiveFriends(users));
        },
        errors =>{
            dispatch(stopLoading());
            dispatch(receiveErrors(errors.responseJSON));
        }
    )
}

export const makeFriend = (other_id) => dispatch =>{
    dispatch(receiveLoading())
    API.makeFriend(other_id).then(
        users =>{
            dispatch(stopLoading());
            dispatch(receiveARequest(other_id));
        },
        errors =>{
            dispatch(stopLoading());
            dispatch(receiveErrors(errors.responseJSON));
        }
    )
}

//undo make friend
export const undoFriendRequest = (other_id) => dispatch =>{
    dispatch(receiveLoading())
    API.undoRequest(other_id).then(
        users =>{
            dispatch(undoARequest(other_id));
        },
        errors =>{
            dispatch(receiveErrors(errors.responseJSON));
        }
    )
}

export const unFriend = (userId) => dispatch =>{
    dispatch(receiveLoading())
    API.unFriend(userId).then(
        users =>{
            dispatch(receiveUnFriend(userId));
        },
        errors =>{
            dispatch(receiveErrors(errors.responseJSON));
        }
    )
}


export const findRequested  = () => dispatch =>{
    dispatch(receiveLoading());
    API.fetchRequestedFriends().then(
        users =>{
            dispatch(stopLoading());
            dispatch(receiveRequested(users));
        },
        errors =>{
            dispatch(stopLoading());
            dispatch(receiveErrors(errors.responseJSON));
        }
    )
}