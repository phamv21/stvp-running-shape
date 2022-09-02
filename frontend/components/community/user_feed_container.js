import { connect } from "react-redux";
import { fetchUserFeed } from "../../actions/activity_actions";
import { fetchComments,fetchCommentsFeed, createComment } from "../../actions/comment_action";
import { showUserFeed } from "../../utils/filter_util";
import UserFeed from "./user_feed";


const mapStateToProps = state => ({
    activities: showUserFeed(state),
    comments: state.entities.comments,
})

const mapDispatchToProps = dispatch =>({
    fetchFeed: user_id => dispatch(fetchUserFeed(user_id)),
    fetchComments: activity_id => dispatch(fetchComments(activity_id)),
    fetchCommentsFeed: () => dispatch(fetchCommentsFeed()),
    createComment: raw_data => dispatch(createComment(raw_data)),

})

export default connect(mapStateToProps,mapDispatchToProps)(UserFeed)
