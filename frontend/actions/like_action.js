import { receiveErrors } from "./session_actions";
import { receiveLoading } from "./loading_actions";
import * as API from '../utils/like_util';

export const RECEIVE_LIKES = "RECEIVE_LIKES";
export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

export const receiveLikes = likes =>({
    type:RECEIVE_LIKES,
    likes
});

export const receiveLike = like =>({
    type:RECEIVE_LIKE,
    like
});

export const removeLike = like =>({
    type:REMOVE_LIKE,
    like
})

export const fetchLike = () => dispatch =>{
    dispatch(receiveLoading());
    API.fetchLike().then(
        likes => dispatch(receiveLikes(likes)),
        errors => dispatch(receiveErrors(errors.responseJSON))

    )
}

export const createLike = (act_id)=> dispatch =>{
    dispatch(receiveLoading());
    API.createLike(act_id).then(
    like => dispatch(receiveLike(like)),
    errors => dispatch(receiveErrors(errors.responseJSON))
    )
}

export const destroyLike = (like_id) => dispatch =>{
    dispatch(receiveLoading());
    API.destroyLike(like_id).then(
        like => dispatch(removeLike(like)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    )
}