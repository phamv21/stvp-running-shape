export function noneRelationship(state){
    let peopleIds = state.filters.relationship.people
    let users = peopleIds.map(id => state.entities.users[id])
    return users
}

export function requested(state){
    let requestedIds = state.filters.relationship.requested
    let requested = requestedIds.map(id => state.entities.users[id])
    return requested
}

export function myFriends(state){
    let friendsIds = state.filters.relationship.friends
    let friends = friendsIds.map(id => state.entities.users[id])
    return friends
}
export function myPending(state){
    let pendingIds = state.filters.relationship.pending
    let pending = pendingIds.map(id => state.entities.users[id])
    return pending
}