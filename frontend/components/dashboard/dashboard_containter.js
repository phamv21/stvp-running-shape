import { connect } from "react-redux";
import Dashboard from "./dashboard";
import { fetchActivities } from "../../actions/activity_actions";
import { showMyActivities } from "../../utils/filter_util";
const mapStateToProps = state => ({
    activities: showMyActivities(state),
    loading: state.ui.loading,

})

const mapDispatchToProps = dispatch => ({
    fetchActivities: () => dispatch(fetchActivities()),
})

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)