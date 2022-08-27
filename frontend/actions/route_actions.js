import * as API from '../utils/running_route_util'
import { receiveErrors } from './session_actions';
import { receiveLoading,stopLoading } from './loading_actions';
export const RECEIVE_CURRENT_ROUTE = 'RECEIVE_CURRENT_ROUTE';
export const RECEIVE_NEW_ROUTE = 'RECEIVE_NEW_ROUTE';
export const RECEIVE_CURRENT_ROUTES = 'RECEIVE_CURRENT_ROUTES';

export const receiveCurrentRoutes = routes => ({
    type: RECEIVE_CURRENT_ROUTES,
    routes
})


export const receiveCurrentRoute = route => (
    {
        type: RECEIVE_CURRENT_ROUTE,
        route
    }
)
export const receiveNewRoute = route => (
    {
        type: RECEIVE_NEW_ROUTE,
        route
    }
)

export const fetchRoutes = () => dispatch => {
    dispatch(receiveLoading());
    API.fetchRoutes().then(
        routes => {
            dispatch(receiveCurrentRoutes(routes));
            dispatch(stopLoading());
        },
        errors => {
            dispatch(stopLoading());
            dispatch(receiveErrors(errors.responseJSON));
        }
    )
}

export const getRoute = routeId => dispatch => {
    dispatch(receiveLoading());
    API.getRoute(routeId).then(
        route => {
            dispatch(receiveCurrentRoute(route));
        },
        errors => {
            dispatch(receiveErrors(errors.responseJSON));
        }
    )
}



export const createRoute = info => dispatch => {
    dispatch(receiveLoading());
    API.createRoute(info).then(
        route => {
             dispatch(receiveNewRoute(route));
             dispatch(receiveLoading());
        },
        errors => {
            dispatch(receiveErrors(errors.responseJSON));
        }
    )
}
