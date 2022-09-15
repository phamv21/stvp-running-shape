import ShowMap from "./show_map";
import { connect } from "react-redux";
import { getRoute,deleteRoute } from "../../actions/route_actions";


const mapStateToProps = state => ({
    routes: state.entities.routes
})

const mapDispatchToProps = dispatch => ({
    getRoute: routeId => dispatch(getRoute(routeId)),
    // deleteRoute: routeId => dispatch(deleteRoute(routeId))

})

export default connect(mapStateToProps,mapDispatchToProps)(ShowMap)