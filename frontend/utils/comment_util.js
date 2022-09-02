export const fetchComments = (activity_id) =>{
    return $.ajax({
        url:`api/comments?activity_id=${activity_id}`,
        method:'GET',
    })
}

export const fetchCommentsFeed = () =>{
    return $.ajax({
        url:'api/comments_feed',
        method:"GET",
    })
}

export const createComment =(raw_data) => {
    let data = {comment:raw_data}
    return $.ajax({
        url:'api/comments',
        method:"POST",
        data:data,

    })
}


// destroy method