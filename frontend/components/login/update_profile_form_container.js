import { connect } from "react-redux";
import { update } from "../../actions/session_actions";
import UpdateProfileForm from "./update_profile_form";

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.currentUserId],
    loading: state.ui.loading,
    errorsCount: state.errors || [1]

})
const mapDispatchToProps = dispatch => ({
    submit: data => dispatch(update(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(UpdateProfileForm)