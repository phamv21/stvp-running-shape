import * as API from '../utils/running_route_util'
import { receiveErrors } from './session_actions';
export const RECEIVE_CURRENT_ROUTE = 'RECEIVE_CURRENT_ROUTE';
export const RECEIVE_CURRENT_ROUTES = 'RECEIVE_CURRENT_ROUTES';


export const receiveCurrentRoute = route => (
    {
        type: RECEIVE_CURRENT_ROUTE,
        route
    }
)

export const createRoute = info => dispatch => {
    API.createRoute(info).then(
        route => dispatch(receiveCurrentRoute(route)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    )
}