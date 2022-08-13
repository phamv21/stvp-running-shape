// import * as API from '../utils/community_util'
// import { receiveLoading,stopLoading } from './loading_actions';
// import { receiveErrors } from './session_actions';
// export const RECEIVE_USERS = 'RECEIVE_USERS';
// export const RECEIVE_USER = 'RECEIVE_USER';


// export const receiveUsers = (users) => ({
//     type: RECEIVE_USERS,
//     users
// })

// export const findPeople = query => dispatch => {
//     dispatch(receiveLoading());
//     API.findPeople(query).then(
//         users => {
//             dispatch(receiveUsers(users));
//             dispatch(stopLoading());
//         },
//         errors => {
//             dispatch(stopLoading());
//             dispatch(receiveErrors(errors.responseJSON));
//         }
//     )
// }