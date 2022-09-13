import { connect } from "react-redux";
import { fetchUserFeed } from "../../actions/activity_actions";
import { fetchComments,fetchCommentsFeed, createComment } from "../../actions/comment_action";
import { fetchLike, createLike,destroyLike } from "../../actions/like_action";
import { showUserFeed } from "../../utils/filter_util";
import { receiveUserFeedPage } from "../../actions/pagination_action";
import UserFeed from "./user_feed";


const mapStateToProps = state => ({
    activities: showUserFeed(state),
    comments: state.entities.comments,
    likedActivities: state.entities.likes,
    loading: state.ui.loading,
    page: state.ui.feedPage.userFeedPage,
})

const mapDispatchToProps = dispatch =>({
    fetchFeed: (user_id,page_num,lastId) => dispatch(fetchUserFeed(user_id,page_num,lastId)),
    initialFeed: (user_id,page_num) => dispatch(fetchUserFeed(user_id,page_num)),
    fetchComments: activity_id => dispatch(fetchComments(activity_id)),
    createComment: raw_data => dispatch(createComment(raw_data)),
    fetchLike: () => dispatch(fetchLike()),
    createLike: activity_id => dispatch(createLike(activity_id)),
    destroyLike: like_id => dispatch(destroyLike(like_id)),
    updatePage: (page,userId) => dispatch(receiveUserFeedPage(page,userId)),

})

export default connect(mapStateToProps,mapDispatchToProps)(UserFeed)
