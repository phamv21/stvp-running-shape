export const login = (info) =>{
    let data = {user:info}
   return $.ajax({
        url:'api/session',
        method: 'POST',
        data: data,
    })
}

export const signup = (data) =>{
    // let data = {user:info }
    return $.ajax({
        url:'api/users',
        method: 'POST',
        data: data,
        contentType: false,
        processData: false,

    })
}

export const update = (data) =>{
    return $.ajax({
        url:'api/users/1',
        method:'PATCH',
        data:data,
        contentType: false,
        processData: false,
    })
}

export const logout = () => {
    return $.ajax({
        url:'api/session',
        method:'DELETE'
    })
}

