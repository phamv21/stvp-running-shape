//have the fetch all


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