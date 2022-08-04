//have the fetch all
export const fetchRoutes = () =>{
    return $.ajax({
        url:'api/routes',
        method: 'GET',
    })
}

export const getRoute = (routeId) => {
    return $.ajax({
        url:`api/routes/${routeId}`,
        method: 'GET',
    })
}

export const createRoute = (info) => {
    let data = {route:info};
    return $.ajax({
        url:'api/routes',
        method: 'POST',
        contentType:'application/json; charset=utf-8',
        data: JSON.stringify(data),
        dataType: 'json'
    })
}