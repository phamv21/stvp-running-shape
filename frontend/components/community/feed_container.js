import { connect } from "react-redux";
import { fetchFeed, initialFeed } from "../../actions/activity_actions";
import { fetchComments,fetchCommentsFeed, createComment } from "../../actions/comment_action";
import { fetchLike, createLike,destroyLike } from "../../actions/like_action";
import { receiveFeedPage } from "../../actions/pagination_action";
import Feed from "./feed";


const mapStateToProps = state => ({
    //sort the activity with the desc of id val
    activities: Object.values(state.entities.activities).sort((a,b)=> b['id']-a['id']),
    comments: state.entities.comments,
    likedActivities: state.entities.likes,
    loading: state.ui.loading,
    page: state.ui.feedPage.feedPage,
})

const mapDispatchToProps = dispatch =>({
    fetchFeed: (pageNum,lastId) => dispatch(fetchFeed(pageNum,lastId)),
    initialFeed: pageNum => dispatch(initialFeed(pageNum)),
    fetchComments: activity_id => dispatch(fetchComments(activity_id)),
    createComment: raw_data => dispatch(createComment(raw_data)),
    fetchLike: () => dispatch(fetchLike()),
    createLike: activity_id => dispatch(createLike(activity_id)),
    destroyLike: like_id => dispatch(destroyLike(like_id)),
    updatePage: page => dispatch(receiveFeedPage(page)),

})

export default connect(mapStateToProps,mapDispatchToProps)(Feed)
