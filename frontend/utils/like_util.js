export function fetchLike(){
    return $.ajax({
        url:'api/likes',
        method:'GET',
    })
}

export function createLike(act_id){
    let data = {activity_id:act_id}
    return $.ajax({
        url:'api/likes',
        method:'POST',
        data:data,

    })
}

export function destroyLike(like_id){
    return $.ajax({
        url:`api/likes/${like_id}`,
        method:'DELETE',
    })
}