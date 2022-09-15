import { connect } from "react-redux";
import { fetchImages } from "../../actions/static_actions";
import Static from "./static";

const mapStateToProps = state =>({
    images: state.entities.statics.images
})
const mapDispatchToProps = dispatch =>({
    fetchImages: ()=> dispatch(fetchImages())
})

export default connect(mapStateToProps,mapDispatchToProps)(Static)