import Community from "./community";
import { connect } from "react-redux";
import { noneRelationship,requested,myFriends,myPending } from "../../utils/relationship_util";
import { findPeople, findRequested,makeFriend, undoFriendRequest,findFriends, requestRespond,findPending } from "../../actions/relationship_actions";

const mapStateToProps = state =>(
    {
        nonRelationship: noneRelationship(state),
        requested: requested(state),
        friends: myFriends(state),
        pending:myPending(state),

    }
)

const mapDispatchToProps = dispatch =>(
    {
        findPeople: query => dispatch(findPeople(query)),
        findRequested: () => dispatch(findRequested()),
        makeFriend: other_id => dispatch(makeFriend(other_id)),
        undoFriendRequest: other_id => dispatch(undoFriendRequest(other_id)),
        findFriends: () => dispatch(findFriends()),
        requestRespond: (data) => dispatch(requestRespond(data)),
        findPending: () =>dispatch(findPending()),
    }
)


export default connect(mapStateToProps,mapDispatchToProps)(Community)