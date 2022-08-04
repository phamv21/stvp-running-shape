export const RECEIVE_LOADING = 'RECEIVE_LOADING';
export const STOP_LOADING = 'STOP_LOADING';

export const receiveLoading = () => ({
    type: RECEIVE_LOADING,
})

export const stopLoading = () => ({
    type: STOP_LOADING,
})
