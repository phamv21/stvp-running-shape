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

export const fetchFeed = () => {
    return $.ajax({
        url:'api/activities/feed',
        method:'GET',
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
