import ActivityShow from "./activity_show";
import { connect } from "react-redux";
import { getRoute } from "../../actions/route_actions";
import { findActivity,deleteActivity } from "../../actions/activity_actions";


const mapStateToProps = state => ({
    routes: state.entities.routes,
    activities: state.entities.activities,
    currentUserId: state.session.currentUserId
})

const mapDispatchToProps = dispatch => ({
    getRoute: routeId => dispatch(getRoute(routeId)),
    findActivity: actId => dispatch(findActivity(actId)),
    deleteActivity: actId => dispatch(deleteActivity(actId)),

})


export default connect(mapStateToProps,mapDispatchToProps)(ActivityShow)