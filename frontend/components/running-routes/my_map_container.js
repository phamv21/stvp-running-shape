import { connect } from "react-redux";
import MyMap from "./my_map";
import { createRoute } from "../../actions/route_actions";

const mapStateToProps = null

const mapDispatchToProps = dispatch => ({
    submit: info => dispatch(createRoute(info)),
})
    


export default connect(mapStateToProps,mapDispatchToProps)(MyMap);