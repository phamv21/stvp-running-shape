import { connect } from "react-redux";
import CreateMap from "./create_map";
import { createRoute } from "../../actions/route_actions";

const mapStateToProps = state => (
    {
        newRouteId: state.ui.newRouteId,
        loading: state.ui.loading,
        lastLocation: state.entities.users[state.session.currentUserId].last_route_location

    }
)

const mapDispatchToProps = dispatch => ({
    submit: info => dispatch(createRoute(info)),
})
    


export default connect(mapStateToProps,mapDispatchToProps)(CreateMap);