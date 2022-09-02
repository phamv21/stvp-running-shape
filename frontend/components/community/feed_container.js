import { connect } from "react-redux";
import { fetchFeed } from "../../actions/activity_actions";
import { fetchComments,fetchCommentsFeed, createComment } from "../../actions/comment_action";
import Feed from "./feed";


const mapStateToProps = state => ({
    activities: Object.values(state.entities.activities),
    comments: state.entities.comments,
})

const mapDispatchToProps = dispatch =>({
    fetchFeed: () => dispatch(fetchFeed()),
    fetchComments: activity_id => dispatch(fetchComments(activity_id)),
    fetchCommentsFeed: () => dispatch(fetchCommentsFeed()),
    createComment: raw_data => dispatch(createComment(raw_data)),

})

export default connect(mapStateToProps,mapDispatchToProps)(Feed)
