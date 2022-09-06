import { connect } from "react-redux";
import { fetchUserFeed } from "../../actions/activity_actions";
import { fetchComments,fetchCommentsFeed, createComment } from "../../actions/comment_action";
import { fetchLike, createLike,destroyLike } from "../../actions/like_action";
import { showUserFeed } from "../../utils/filter_util";
import UserFeed from "./user_feed";


const mapStateToProps = state => ({
    activities: showUserFeed(state),
    comments: state.entities.comments,
    likedActivities: state.entities.likes,
    loading: state.ui.loading,
})

const mapDispatchToProps = dispatch =>({
    initialFeed: user_id => dispatch(fetchUserFeed(user_id)),
    fetchComments: activity_id => dispatch(fetchComments(activity_id)),
    createComment: raw_data => dispatch(createComment(raw_data)),
    fetchLike: () => dispatch(fetchLike()),
    createLike: activity_id => dispatch(createLike(activity_id)),
    destroyLike: like_id => dispatch(destroyLike(like_id)),

})

export default connect(mapStateToProps,mapDispatchToProps)(UserFeed)
