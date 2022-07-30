import { connect } from "react-redux";
import loginForm from "./login_form";
import { login } from "../../actions/session_actions";


const mapDispatchToProps = dispatch => ({
    submit: data => dispatch(login(data))
})

export default connect(null,mapDispatchToProps)(loginForm);