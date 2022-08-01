import * as API from '../utils/session_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS'
// export const CLEAR_ERRORS = 'CLEAR_ERRORS'

const receiveCurrentUser = user =>(
    {
        type: RECEIVE_CURRENT_USER,
        user
    }
)
const logoutCurrentUser = () =>(
    {
        type: LOGOUT_CURRENT_USER,

    }
)

export const receiveErrors = errors =>(
    {
        type: RECEIVE_ERRORS,
        errors
    }
)

export const login = info => dispatch => {
    API.login(info).then(
        user => dispatch(receiveCurrentUser(user)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    )
}

export const signup = info => dispatch => {
    API.signup(info).then(
        user => dispatch(receiveCurrentUser(user)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    )
}
export const logout = () => dispatch => {
    API.logout().then(
        message => dispatch(logoutCurrentUser()),
        errors => dispatch(receiveErrors(errors.responseJSON))
    )
}

