import { connect } from "react-redux";
import SearchRoute from "./search_route";
import { updateFilterAndSearch } from "../../actions/route_search_filter_activity";
import { seachedRoutes } from "../../utils/filter_util";
const mapStateToProps = state => (
    {
        loading: state.ui.loading,
        searchResults: seachedRoutes(state)

    }
)

const mapDispatchToProps = dispatch => ({
    updateFilterAndSearch : (filter,value) => dispatch(updateFilterAndSearch(filter,value)),

})
    


export default connect(mapStateToProps,mapDispatchToProps)(SearchRoute);