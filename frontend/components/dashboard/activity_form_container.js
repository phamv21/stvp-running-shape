import { connect } from "react-redux";
import ActivityForm from "./activity_form";
import { createActivity } from "../../actions/activity_actions";
import { fetchRoutes } from "../../actions/route_actions";

const mapStateToProps = state => ({
    routes: Object.values(state.entities.routes),
    loading: state.ui.loading,
    routeHash:state.entities.routes,
    newActivityId: state.ui.newActivityId,
})

const mapDispatchToProps = dispatch => ({
    submit: rawData => dispatch(createActivity(rawData)),
    fetchRoutes: () => dispatch(fetchRoutes()),
})

export default connect(mapStateToProps,mapDispatchToProps)(ActivityForm);