import { connect } from "react-redux";
import IndexRoutes from "./index_routes";
import { fetchRoutes } from "../../actions/route_actions";

const mapStateToProps = state => ({
    routes: Object.values(state.entities.routes),
    loading: state.ui.loading,
})
const mapDispatchToProps = dispatch => ({
    fetchRoutes: () => dispatch(fetchRoutes()),
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexRoutes)
