import { receiveErrors } from "./session_actions";
import { receiveLoading, stopLoading } from "./loading_actions";
import * as API from '../utils/activity_util'
export const RECEIVE_ACTIVITIES = 'RECEIVE_ACTIVITIES';
export const RECEIVE_ACTIVITY = 'RECEIVE_ACTIVITY';



export const receiveActivities = (activities) => ({
    type:RECEIVE_ACTIVITIES,
    activities
});

export const receiveActivity = (activity) => ({
    type:RECEIVE_ACTIVITY,
    activity
})

export const fetchActivities =  () => dispatch  => {
        dispatch(receiveLoading());
        API.fetchActivities().then(
            activities => dispatch(receiveActivities(activities)),
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
            activity => dispatch(receiveActivities(activity)),
            errors => dispatch(receiveErrors(errors.responseJSON))
        )
}

export const createActivity =  rawData => dispatch  => {
        dispatch(receiveLoading());
        API.createActivity(rawData).then(
            activity => dispatch(receiveActivities(activity)),
            errors => dispatch(receiveErrors(errors.responseJSON))
        )
}