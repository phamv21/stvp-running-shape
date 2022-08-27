import { receiveErrors } from "./session_actions";
import { receiveLoading, stopLoading } from "./loading_actions";
import * as API from '../utils/activity_util'
export const RECEIVE_ACTIVITIES = 'RECEIVE_ACTIVITIES';
export const RECEIVE_ACTIVITY = 'RECEIVE_ACTIVITY';
export const RECEIVE_MY_ACTIVITIES = 'RECEIVE_MY_ACTIVITIES';
export const RECEIVE_NEW_ACTIVITY = 'RECEIVE_NEW_ACTIVITY';



export const receiveActivities = (activities) => ({
    type:RECEIVE_ACTIVITIES,
    activities
});

export const receiveMyActivities = (activities) => ({
    type:RECEIVE_MY_ACTIVITIES,
    activities
});

export const receiveActivity = (activity) => ({
    type:RECEIVE_ACTIVITY,
    activity
})

export const receiveNewActivity = (activity) => ({
    type:RECEIVE_NEW_ACTIVITY,
    activity
})

export const fetchActivities =  () => dispatch  => {
        dispatch(receiveLoading());
        API.fetchActivities().then(
            activities => dispatch(receiveMyActivities(activities)),
            errors => dispatch(receiveErrors(errors.responseJSON))
        )
}

export const fetchFeed=  () => dispatch  => {
        dispatch(receiveLoading());
        API.fetchFeed().then(
            activities => dispatch(receiveActivities(activities)),
            errors => dispatch(receiveErrors(errors.responseJSON))
        )
}

export const findActivity =  id => dispatch  => {
        dispatch(receiveLoading());
        API.findActivity(id).then(
            activity => dispatch(receiveActivity(activity)),
            errors => dispatch(receiveErrors(errors.responseJSON))
        )
}

export const createActivity =  rawData => dispatch  => {
        dispatch(receiveLoading());
        API.createActivity(rawData).then(
            activity => dispatch(receiveNewActivity(activity)),
            errors => dispatch(receiveErrors(errors.responseJSON))
        )
}