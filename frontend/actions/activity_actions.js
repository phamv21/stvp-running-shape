import { receiveErrors } from "./session_actions";
import { receiveLoading, stopLoading } from "./loading_actions";
import * as API from '../utils/activity_util'
import * as CommentAPI from '../utils/comment_util'
import { receiveComments } from "./comment_action";
import { receiveLikes } from "./like_action";
import * as LikeAPI from '../utils/like_util'
export const RECEIVE_ACTIVITIES = 'RECEIVE_ACTIVITIES';
export const RECEIVE_ACTIVITY = 'RECEIVE_ACTIVITY';
export const RECEIVE_MY_ACTIVITIES = 'RECEIVE_MY_ACTIVITIES';
export const RECEIVE_NEW_ACTIVITY = 'RECEIVE_NEW_ACTIVITY';
export const RECEIVE_USER_ACTIVITIES = 'RECEIVE_USER_ACTIVITIES';
export const RECEIVE_FEED_ACTIVITIES = 'RECEIVE_FEED_ACTIVITIES';
export const RECEIVE_USER_FEED_ACTIVITIES = 'RECEIVE_USER_FEED_ACTIVITIES';


export const receiveActivities = (activities) => ({
    type:RECEIVE_ACTIVITIES,
    activities
});
export const receiveFeedActivities = (feedActivities) => ({
    type:RECEIVE_FEED_ACTIVITIES,
    feedActivities
});

export const receiveUserFeedActivities = (feedActivities,user_id) => ({
    type:RECEIVE_USER_FEED_ACTIVITIES,
    feedActivities,
    user_id
});

export const receiveUserActivities = (activities,user_id) => ({
    type:RECEIVE_USER_ACTIVITIES,
    activities,
    user_id
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

export const fetchActivities =  (user_id) => dispatch  => {
        dispatch(receiveLoading());
        return API.fetchActivities().then(
            feedActivities => dispatch(receiveUserFeedActivities(feedActivities,user_id)),
            errors => dispatch(receiveErrors(errors.responseJSON))
        )
}

export const fetchFeed=  (page_num=0,last_id = 0) => dispatch  => {
        dispatch(receiveLoading());
        return API.fetchFeed(page_num,last_id).then(
            feedActivities => dispatch(receiveFeedActivities(feedActivities)),
            errors => dispatch(receiveErrors(errors.responseJSON))
        )
}

export const fetchUserFeed = (user_id,page_num=0,last_id=0) => dispatch =>{
    dispatch(receiveLoading());
    return API.fetchUserFeed(user_id,page_num,last_id).then(
        feedActivities => dispatch(receiveUserFeedActivities(feedActivities,user_id)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    )
}


export const initialFeed = (page_num =0) => async(dispatch) =>{
    dispatch(receiveLoading());
    try {
        const activities = await API.fetchFeed(page_num);
        const comments = await CommentAPI.fetchCommentsFeed();
        const likes = await LikeAPI.fetchLike();
        dispatch(receiveUserActivities(activities));
        dispatch(receiveComments(comments));
        dispatch(receiveLikes(likes));
    } catch (errors) {
    dispatch(receiveErrors(errors.responseJSON)) 
    }
    
}

export const fetchUserFeedAsync =  (user_id,page_num) => async(dispatch)  => {
        dispatch(receiveLoading());
        try {
        const activities = await API.fetchUserFeed(user_id,page_num);
        const comments = await CommentAPI.fetchCommentsFeed();
        const likes = await LikeAPI.fetchLike();
        dispatch(receiveUserActivities(activities,user_id));
        dispatch(receiveComments(comments));
        dispatch(receiveLikes(likes));
    } catch (errors) {
    dispatch(receiveErrors(errors.responseJSON)) 
    }
}



export const findActivity =  id => dispatch  => {
        dispatch(receiveLoading());
        API.findActivity(id).then(
            activity => dispatch(receiveActivity(activity)),
            errors => dispatch(receiveErrors(errors.responseJSON))
        )
}

export const deleteActivity =  id => dispatch  => {
        dispatch(receiveLoading());
        return API.deleteActivity(id).then(
            activity => 'sucess',
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