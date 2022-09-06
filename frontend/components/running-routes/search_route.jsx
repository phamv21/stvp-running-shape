import React from "react";
import MarkerManager from "../../utils/marker_manager";
import AutoCompleteSearch from "../../utils/auto_complete_search_util";
import { PRIVACY, ACTIVITIES } from "../../utils/const_util";
import getStaticMap from "../../utils/get_static_map";
import SeachRouteElement from "./search_route_element";
export default class SearchRoute extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            bounds: {},
            hightlightRouteId:null,

        }

        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();

        // bind here

        // <--
    }


    componentDidMount() {
        // set the map to show SF
        const mapOptions = {
            center:{ lat: 10.78058, lng: 106.694385 }, // this is HCM
            zoom: 16
        };

        // wrap this.mapNode in a Google Map

        this.map = new google.maps.Map(this.mapNode, mapOptions);
        this.directionsRenderer.setMap(this.map);
        this.MarkerManager = new MarkerManager(this.map,this.directionsService,this.directionsRenderer,false);

        //add the listener to the map
        this.map.addListener('bounds_changed',()=>{
            let northEast = this.map.getBounds().getNorthEast();
            let southWest = this.map.getBounds().getSouthWest();
            this.setState({bounds:{northEast:{lat:northEast.lat(),lng:northEast.lng()},southWest:{lat:southWest.lat(),lng:southWest.lng()}}});
        })

        //add the seach box for place in the map
       
        this.searchBox = new AutoCompleteSearch(this.map)
        this.searchBox.renderSearchBox();
        //add_click listener
        // this.map.addListener('click',(mapsMouseEvent)=>{
        //     let coords = mapsMouseEvent.latLng
        //     this._handleClick(coords)
        // })
    }

    componentDidUpdate(prevProps,prevState){
    //     if(prevProps.benches != this.props.benches){
    //      this.MarkerManager.updateMarker(this.props.benches);
    //     }
        if(prevState.bounds != this.state.bounds){
            this.props.updateFilterAndSearch("bounds",this.state.bounds)
        }
    //     if (prevProps.highlightId != this.props.highlightId){
    //         this.MarkerManager.markerHightlight(this.props.highlightId)
    //     }
         
    }

    // _handleClick(coords) {
    //     // this.props.navigate('benches/new', { state: { lat:coords.lat(),lng:coords.lng() },replace:true })
    //     let loc = { lat:coords.lat(),lng:coords.lng() }
    //     this.MarkerManager.updateMarker(loc);
    //     this.MarkerManager.renderRoute();
    //     // loc['pin_type'] = 'Ways'
    //     // this.setState({pin_infos:[...this.state.pin_infos,loc]})

    // }
    
    handleSubmit(e){
        e.preventDefault();
        // count total distance 
        
        
    }
    handleHighlight(id){
        this.setState({hightlightRouteId:id})
        console.log(this.state.hightlightRouteId)
    }

    render(){
        let resultEl =this.props.searchResults.map((el,idx)=>(
            <SeachRouteElement route={el} key={idx} handleHighlight={this.handleHighlight.bind(this)} />
        ))
        console.log(this.props)

        let button = this.props.loading ? 
        ( <button disabled={true}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </button>)
             : (<div className="col-12"><input className="btn btn-dark" type="submit" value="Submit" /></div>);
        return(
        <div className="row mb-3 text-center">
           <div className="col-4 col-lg-4 themed-grid-col">
            <div className="search-container">
                <input className="form-control" type="search" id='auto-complete-search' placeholder="Please type the area that you want to run" aria-label="Search"/>
            </div>
            
            {resultEl}
            {/* display seach result */}
            
                        {/* map showing */}
           </div> 
             <div className="col-sm-8 col-lg-8 themed-grid-col"id="map-container" ref={map => this.mapNode = map}>
            </div>
        
              
        
        </div>

        )
    }
}


// export default function SeachRoute(props){
//     let navigate = useNavigate()
//     return <Search {...props} navigate={navigate}/>
// }
