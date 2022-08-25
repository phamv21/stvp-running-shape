import { connect } from "react-redux";
import Dashboard from "./dashboard";
import { fetchActivities } from "../../actions/activity_actions";

const mapStateToProps = state => ({
    activities: Object.values(state.entities.activities)
})

const mapDispatchToProps = dispatch => ({
    fetchActivities: () => dispatch(fetchActivities()),
})

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)