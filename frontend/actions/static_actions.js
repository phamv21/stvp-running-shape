import * as API from '../utils/static_util'
import { receiveLoading } from './loading_actions';
import { receiveErrors } from './session_actions';
export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';


export const receiveImages = statics => ({
    type:RECEIVE_IMAGES,
    statics
})

export const fetchImages = () => dispatch =>{
    dispatch(receiveLoading());
    return API.fetchStatics().then(
        statics => dispatch(receiveImages(statics)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    )
}