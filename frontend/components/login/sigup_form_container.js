import { connect } from "react-redux";
import { signup } from "../../actions/session_actions";
import SignupForm from "./sign_up_form";
const mapStateToProps = state =>({
    loading: state.ui.loading
})
const mapDispatchToProps = dispatch => ({
    submit: data => dispatch(signup(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(SignupForm)