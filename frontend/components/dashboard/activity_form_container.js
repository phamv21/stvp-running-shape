import { connect } from "react-redux";
import ActivityForm from "./activity_form";
import { createActivity } from "../../actions/activity_actions";


// const mapStateToProps = state => ({

// })

const mapDispatchToProps = dispatch => ({
    submit: rawData => dispatch(createActivity(rawData)),
})

export default connect(null,mapDispatchToProps)(ActivityForm);