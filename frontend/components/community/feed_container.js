import { connect } from "react-redux";
import { fetchFeed, initialFeed } from "../../actions/activity_actions";
import { fetchComments,fetchCommentsFeed, createComment } from "../../actions/comment_action";
import { fetchLike, createLike,destroyLike } from "../../actions/like_action";
import Feed from "./feed";


const mapStateToProps = state => ({
    activities: Object.values(state.entities.activities),
    comments: state.entities.comments,
    likedActivities: state.entities.likes,
    loading: state.ui.loading,
})

const mapDispatchToProps = dispatch =>({
    fetchFeed: () => dispatch(fetchFeed()),
    initialFeed: () => dispatch(initialFeed()),
    fetchComments: activity_id => dispatch(fetchComments(activity_id)),
    createComment: raw_data => dispatch(createComment(raw_data)),
    fetchLike: () => dispatch(fetchLike()),
    createLike: activity_id => dispatch(createLike(activity_id)),
    destroyLike: like_id => dispatch(destroyLike(like_id)),

})

export default connect(mapStateToProps,mapDispatchToProps)(Feed)
