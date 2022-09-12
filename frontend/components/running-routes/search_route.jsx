import React from "react";
import MarkerManager from "../../utils/marker_manager";
import AutoCompleteSearch from "../../utils/auto_complete_search_util";
import { PRIVACY, ACTIVITIES } from "../../utils/const_util";
import getStaticMap from "../../utils/get_static_map";
import SeachRouteElement from "./search_route_element";
import { Link } from "react-router-dom";
import { ROUTEPERPAGE } from "../../utils/const_util";
export default class SearchRoute extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            bounds: {},
            hightlightRouteId:null,
            mapCenter: {},
            mapZoom: 16,
            showRoute: false,
            pageNum:0,
            currentSearched:[]
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
            zoom: 16,
            mapId: 'b9270ddec3f692ae'
        };
        // this.initMap(mapOptions)
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
        if(prevProps.searchResults != this.props.searchResults){
            let pageNum = this.state.pageNum
            this.setState({currentSearched:this.props.searchResults.slice(pageNum*ROUTEPERPAGE,pageNum*ROUTEPERPAGE +ROUTEPERPAGE)})
        }

        if(prevState.bounds != this.state.bounds){
            this.props.updateFilter("bounds",this.state.bounds)
        }

        if(prevState.pageNum != this.state.pageNum){
            
            if (this.state.pageNum * ROUTEPERPAGE >= this.props.searchResults.length){
                this.props.searchRoutes(this.props.filters,this.state.pageNum)
            }else{
                let pageNum = this.state.pageNum
                this.setState({currentSearched:this.props.searchResults.slice(pageNum*ROUTEPERPAGE,pageNum*ROUTEPERPAGE +ROUTEPERPAGE)})
            }
        }
        if(prevState.currentSearched != this.state.currentSearched){
            if(this.state.currentSearched.length > 0){
                
                let coords = {};
                this.state.currentSearched.forEach(route =>{
                coords[route.id] = route.pins[0]
                })
                this.MarkerManager.updateSearchMarker(coords);
            }
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
    handleHighlight(route_id){
        if(!this.state.showRoute){
        this.setState({hightlightRouteId:route_id});
        this.MarkerManager.highlightSearchMarker(route_id);
        }
    }
    handleRouteRender(route_id){
        let pins = this.props.routes[route_id].pins
        pins.forEach(pin =>{ this.MarkerManager.updateMarker({lat:pin.lat,lng:pin.lng},pin.description)});
        this.MarkerManager.renderRoute();
        this.setState({showRoute:true});
    }
    handleSearch(e){
        e.preventDefault();
        this.props.searchRoutes(this.props.filters);
        let latCenter = this.map.getCenter().lat();
        let lngCenter = this.map.getCenter().lng();
        this.setState({mapCenter:{lat:latCenter,lng:lngCenter},mapZoom:this.map.getZoom(),showRoute:false})
        
    }
    handleNextPage(e){
        e.preventDefault();
        this.setState({pageNum:(this.state.pageNum + 1)})
    }

    handlePrevPage(e){
         e.preventDefault();
        this.setState({pageNum:this.state.pageNum - 1})
    }

    handleBackToResult(e){
        e.preventDefault();
        this.MarkerManager.clearRoute();
        this.map.setCenter(this.state.mapCenter);
        this.map.setZoom(this.state.mapZoom);
        this.setState({showRoute:false});
    }

    render(){
        let pageNum = this.state.pageNum
        let showResult = this.props.searchResults.slice(pageNum*ROUTEPERPAGE,pageNum*ROUTEPERPAGE +ROUTEPERPAGE) // only 2 result per page
        let totalResult = this.props.searchResults[0] == null ? 0 : this.props.searchResults[0].total_result || 0
        let resultEl = this.state.showRoute ? (<div className='d-flex justify-content-center' >
                <div className="row">
                    <img className="img-thumbnail super-small-img col-4" src={this.props.routes[this.state.hightlightRouteId].thumb} alt="" />
                    <p className="h3 col-8 jusstify-content-center" >{this.props.routes[this.state.hightlightRouteId].name}</p>
                </div>
                <div className="row">
                    <p className=" h4 col-7 jusstify-content-center">Distance: {this.props.routes[this.state.hightlightRouteId].distance/1000} Km</p>
                <p className=" h4 col-7 jusstify-content-center">Description: {this.props.routes[this.state.hightlightRouteId].description}</p>
                <Link to={'/activities/create/'+this.state.hightlightRouteId} className="btn"> Create Activity with this Route</Link>
                </div>
                
                

        </div>) : showResult.map((el,idx)=>(
            el != null ?
            <SeachRouteElement route={el} key={idx} handleHighlight={this.handleHighlight.bind(this)} handleRouteRender={this.handleRouteRender.bind(this)} />
            : null
            
        ))

        
        let button = this.props.loading ? 
        ( <button disabled={true}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </button>)
             : (<div className="col-12"><input className="btn btn-dark" type="submit" value="Submit" /></div>);
        return(
        <>
        <div className=" container row text-center justify-content-center">
                <input disabled={this.state.showRoute} className="form-control col-lg-8 col-sm-12" type="search" id='auto-complete-search' placeholder="Please type the area that you want to run" aria-label="Search"/>
                <button disabled={this.state.showRoute} className="btn btn-primary col-lg-2 col-sm-12" onClick={this.handleSearch.bind(this)}> Search</button>
        </div>    
        <div className="container row mb-3 text-center">
           <div className="col-lg-4 col-sm-12 mh-sm-25">
            
            <div className="row justify-content-between">
                {!this.state.showRoute && (this.state.pageNum > 0) ? (<button className="btn btn-secondary col-2" onClick={this.handlePrevPage.bind(this)}><i className="fa-solid fa-chevron-left"></i></button>) : ( <button className="btn btn-secondary col-2 disabled" ><i className="fa-solid fa-chevron-left"></i></button> ) }
                {!this.state.showRoute && (this.state.pageNum * ROUTEPERPAGE + ROUTEPERPAGE < totalResult) ? (<button className="btn btn-secondary col-2" onClick={this.handleNextPage.bind(this)}> <i className="fa-solid fa-chevron-right"></i> </button>) : ( <button className="btn btn-secondary col-2 disabled" ><i className="fa-solid fa-chevron-right"></i></button> ) }
            </div>
            {this.state.showRoute ? (<button className="btn" onClick={this.handleBackToResult.bind(this)}> Back</button>) : <p>{totalResult + ' results'}</p>  }
            

            <div className="d-grip gap-2">
                {resultEl}
            </div>
            
            {/* display seach result */}
            
                        {/* map showing */}
           </div> 
             <div className="col-sm-12 col-lg-8 themed-grid-col "id="map-container" ref={map => this.mapNode = map}>
            </div>
        
              
        
        </div>
        </>

        )
    }
}


// export default function SeachRoute(props){
//     let navigate = useNavigate()
//     return <Search {...props} navigate={navigate}/>
// }
