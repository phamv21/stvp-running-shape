export const login = (info) =>{
    let data = {user:info}
   return $.ajax({
        url:'api/session',
        method: 'POST',
        data: data,
    })
}

export const signup = (info) =>{
    let data = {user:info }
    return $.ajax({
        url:'api/users',
        method: 'POST',
        data: data
    })
}

export const logout = () => {
    return $.ajax({
        url:'api/session',
        method:'DELETE'
    })
}

