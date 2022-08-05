import { connect } from "react-redux";
import { ErrorShow } from "./errors_show";
const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps)(ErrorShow)