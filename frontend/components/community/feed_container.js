import { connect } from "react-redux";
import { fetchFeed } from "../../actions/activity_actions";
import Feed from "./feed";


const mapStateToProps = state => ({
    activities: Object.values(state.entities.activities)
})

const mapDispatchToProps = dispatch =>({
    fetchFeed: () => dispatch(fetchFeed()),
})

export default connect(mapStateToProps,mapDispatchToProps)(Feed)