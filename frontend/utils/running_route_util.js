//have the fetch all
export const fetchRoutes = () =>{
    return $.ajax({
        url:'api/routes',
        method: 'GET',
    })
}
export const searchRoutes = (filters,page=0,total_result=0,last_id=0) =>{
    let data ={filters:filters,page:page,total_result:total_result,last_id:last_id}
    return $.ajax({
        url:'api/routes/search',
        method: 'POST',
        data:data,
    })
}

export const getRoute = (routeId) => {
    return $.ajax({
        url:`api/routes/${routeId}`,
        method: 'GET',
    })
}

export const createRoute = (info) => {
    // let data = {route:info};
    return $.ajax({
        url:'api/routes',
        method: 'POST',
        data:info,
        contentType: false,
        processData: false,

        // contentType:'application/json; charset=utf-8',
        // data: JSON.stringify(data),
        // dataType: 'json'
    })
}