import Home from "./home";
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
const mapStateToProps = state => (
    
    {
        loggedIn: Boolean(state.session.currentUserId),
        userInfo: state.entities.users[state.session.currentUserId]

    }

)

const mapDispatchToProps = dispatch => (
    {
        logout: ()=> dispatch(logout())
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(Home);