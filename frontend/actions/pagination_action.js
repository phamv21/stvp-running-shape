export const RECEIVE_FEED_PAGE = "RECEIVE_FEED_PAGE";
export const RECEIVE_USER_FEED_PAGE = "RECEIVE_USER_FEED_PAGE";


export const receiveFeedPage = page => ({
    type:RECEIVE_FEED_PAGE,
    page
})

export const receiveUserFeedPage = page =>({
    type:RECEIVE_USER_FEED_PAGE,
    page
})