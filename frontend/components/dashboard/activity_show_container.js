import ActivityShow from "./activity_show";
import { connect } from "react-redux";
import { getRoute } from "../../actions/route_actions";
import { findActivity } from "../../actions/activity_actions";


const mapStateToProps = state => ({
    routes: state.entities.routes,
    activities: state.entities.activities,
})

const mapDispatchToProps = dispatch => ({
    getRoute: routeId => dispatch(getRoute(routeId)),
    findActivity: actId => dispatch(findActivity(actId)),

})


export default connect(mapStateToProps,mapDispatchToProps)(ActivityShow)