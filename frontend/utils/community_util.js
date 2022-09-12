export const findPeople = (query) =>{
    let data = {search:query}
    return $.ajax({
        url:'api/relationship/find',
        method:'POST',
        data:data,
    })
}
// the respond post at 'api/relationship/respond'

//
export const makeFriend = (other_id) =>{
    let data = {other_user_id:other_id};
    return $.ajax({
        url:'api/user_relationships',
        method:'POST',
        data:data,
    })
}
// accpet or deny a request
export const requestRespond = (data) =>{
    return $.ajax({
        url:'api/relationship/respond',
        method:'POST',
        data:data,
    })
}
//undo request friend
export const undoRequest = (other_user_id) =>{
    let data = {other_user_id}
    return $.ajax({
        url:'api/relationship/undo',
        method: 'DELETE',
        data:data,
    })
}

export const unFriend = (other_user_id) =>{
    let data = {other_user_id,unfriend:true}
    return $.ajax({
        url:'api/relationship/undo',
        method: 'DELETE',
        data:data,
    })
}


export const fetchFriends = () =>{
    return $.ajax({
        url:'api/relationship/friends',
        method: 'GET',
    })
}

export const fetchRequestedFriends = () => {
    return $.ajax({
        url:'api/relationship/requested_friends',
        method: 'GET',
    })
}

export const fetchPendingRequests = () =>{
    return $.ajax({
        url:'api/relationship/pending_requests',
        method: 'GET',
    })
}