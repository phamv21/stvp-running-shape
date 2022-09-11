export const fetchActivities = () =>{
    return $.ajax({
        url:'api/activities',
        method:'GET',
    })
}

export const findActivity = id =>{
    return $.ajax({
        url:`api/activities/${id}`,
        method: 'GET',
    })
}

export const fetchFeed = (page_num = 0) => {
    return $.ajax({
        url:`api/activities_feed?page=${page_num}`,
        method:'GET',
    })
}

export const fetchUserFeed = (user_id,page_num = 0) =>{
    return $.ajax({
        url:`api/profile/${user_id}/activity_feed?page=${page_num}`,
        method: 'GET',
    })
}

export const createActivity = rawData =>{
   let data = {activity:rawData}
    return $.ajax({
        url:'api/activities',
        method: 'POST',
        data:data,
    })
}
