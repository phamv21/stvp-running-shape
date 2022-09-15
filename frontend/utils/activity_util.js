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

export const deleteActivity = id => {
    return $.ajax({
        url:`api/activities/${id}`,
        method:'DELETE'
    })
}

export const fetchFeed = (page_num = 0,last_id=0) => {
    return $.ajax({
        url:`api/activities_feed?page=${page_num}&last_id=${last_id}`,
        method:'GET',
    })
}

export const fetchUserFeed = (user_id,page_num = 0,last_id=0) =>{
    return $.ajax({
        url:`api/profile/${user_id}/activity_feed?page=${page_num}&last_id=${last_id}`,
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
