import { connect } from "react-redux";
import SearchRoute from "./search_route";
import { updateFilterAndSearch } from "../../actions/route_search_filter_activity";
import { updateSearchFilter } from "../../actions/route_search_filter_activity";
import { searchRoutes } from "../../actions/route_actions";
import { seachedRoutes } from "../../utils/filter_util";

const mapStateToProps = state => (
    {
        loading: state.ui.loading,
        searchResults: seachedRoutes(state),
        routes: state.entities.routes,
        filters: state.filters.searchRouteFilters,

    }
)

const mapDispatchToProps = dispatch => ({
    searchRoutes: (filters,page=0) => dispatch(searchRoutes(filters,page)),
    updateFilter: (filter,value) => dispatch(updateSearchFilter(filter,value))
    // updateFilterAndSearch : (filter,value) => dispatch(updateFilterAndSearch(filter,value)),

})
    


export default connect(mapStateToProps,mapDispatchToProps)(SearchRoute);