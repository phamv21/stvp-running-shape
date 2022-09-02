import * as API from '../utils/comment_util'
import { receiveLoading } from './loading_actions';
import { receiveErrors } from './session_actions';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';


export const receiveComment = (comment) =>({
    type:RECEIVE_COMMENT,
    comment
})

export const receiveComments = comments => ({
    type:RECEIVE_COMMENTS,
    comments
})

export const fetchComments = activity_id => dispatch => {
    dispatch(receiveLoading());
    API.fetchComments(activity_id).then(
        comments => dispatch(receiveComments(comments)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    )
}

export const fetchCommentsFeed = () => dispatch => {
    dispatch(receiveLoading());
    API.fetchCommentsFeed().then(
        comments => dispatch(receiveComments(comments)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    )
}



export const createComment = raw_data => dispatch =>{
    dispatch(receiveLoading());
    API.createComment(raw_data).then(
        comment => {return dispatch(receiveComment(comment))},
        errors => dispatch(receiveErrors(errors.responseJSON))
    )
}

