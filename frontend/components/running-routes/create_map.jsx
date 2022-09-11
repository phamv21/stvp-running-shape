import React from "react";
import MarkerManager from "../../utils/marker_manager";
import {useNavigate} from 'react-router-dom'
import AutoCompleteSearch from "../../utils/auto_complete_search_util";
import { PRIVACY, ACTIVITIES } from "../../utils/const_util";
import getStaticMap from "../../utils/get_static_map";
class CreateMap extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            bounds: {},
            pin_infos: [],
            name: '',
            description: '',
            privacy: 'Friend',
            activity: 'Run'

        }

        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();

        // bind here
        this._handleClick = this._handleClick.bind(this)
        // <--
    }


    componentDidMount() {
        // set the map to show SF
        const mapOptions = {
            center: this.props.lastLocation, //{ lat: 37.7758, lng: -122.435 }, // this is SF
            zoom: 16,
            mapId:'IDb9270ddec3f692ae',

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
        this.map.addListener('click',(mapsMouseEvent)=>{
            let coords = mapsMouseEvent.latLng
            this._handleClick(coords)
        })
    }

    componentDidUpdate(prevProps,prevState){
    //     if(prevProps.benches != this.props.benches){
    //      this.MarkerManager.updateMarker(this.props.benches);
    //     }
    //     if(prevState.bounds != this.state.bounds){

    //         // this.props.updateFilters("bounds",this.state.bounds)
    //     }
    //     if (prevProps.highlightId != this.props.highlightId){
    //         this.MarkerManager.markerHightlight(this.props.highlightId)
    //     }
            if(prevProps.newRouteId != this.props.newRouteId){
                this.props.navigate(`/routes/${this.props.newRouteId}`)
            }
    }

    _handleClick(coords) {
        // this.props.navigate('benches/new', { state: { lat:coords.lat(),lng:coords.lng() },replace:true })
        let loc = { lat:coords.lat(),lng:coords.lng() }
        this.MarkerManager.updateMarker(loc);
        this.MarkerManager.renderRoute();
        // loc['pin_type'] = 'Ways'
        // this.setState({pin_infos:[...this.state.pin_infos,loc]})

    }
    handleName(e){
        e.preventDefault();
        this.setState({name:e.target.value})
    }

    handleDescription(e){
        e.preventDefault();
        this.setState({description:e.target.value})
    }

    handleActivity(e){
        e.preventDefault();
        this.setState({activity:e.target.value})
    }
    handlePrivacy(e){
        e.preventDefault();
        this.setState({privacy:e.target.value})
    }
    // handleFile(e){
    //     e.preventDefault();
    //     console.log(e.target.files[0])
    // }
    handleSubmit(e){
        e.preventDefault();
        // count total distance 
        let distanceSum = 0.0;
        this.MarkerManager.route_steps.forEach(el => {distanceSum += el.distance.value});
        const pin_nodes = this.MarkerManager.nodes;
        let pin_infomation = [];
        pin_nodes.forEach(el=>{pin_infomation.push({lat:el.location.lat,lng:el.location.lng,description:el.description})});
        

        //get name_area
        let area_name = this.MarkerManager.route_steps[0].start_address;
        area_name = area_name.match(/\b[^,]+[\b,\b\w]/ig).slice(-2).join('');
        getStaticMap(this.MarkerManager.getPreviewURL()).then(res => {
            let image = null
            if(res != 'error'){
                image = new File([res],area_name,{type:'image/png'});
            }
    

        let formData = new FormData();
        formData.append('route[name]',this.state.name);
            if(image != null){
                formData.append('route[thumb]',image);
            }
        formData.append('route[area_name]',area_name);
        formData.append('route[privacy]',this.state.privacy);
        formData.append('route[activity]',this.state.activity);
        formData.append('route[description]',this.state.description);
        for(let i = 0; i < pin_infomation.length; i++ ){
            formData.append('route[pin_infos][]',JSON.stringify(pin_infomation[i]));
        }
        
        formData.append('route[distance]',distanceSum);
        this.props.submit(formData);
        
        });
        
    }

    render(){
        let button = this.props.loading ? 
        ( <button disabled={true}>
                <div className="btn btn-light spinner-border" role="status">
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
            

            {/* form for name and description input */}
            <form  onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
                <input className="form-control" id="route-name"  placeholder="Route's Name" type="text" name="name" value={this.state.name} onChange={this.handleName.bind(this)}/>
                {/* <label htmlFor="route-name">Name:</label> */}
            </div>
            <div className="form-group">
                {/* <label htmlFor="route-description">Description</label> */}
                <input className="form-control" id="route-description" placeholder="Description" type="text" name='description' value={this.state.description} onChange={this.handleDescription.bind(this)}/>
            </div>
            {/* add field privacy and activity type */}

                <label htmlFor="privacy"> Visibility</label>
                <select className="form-floating form-control-sm" name="privacy" id="privacy" value={this.state.privacy} onChange={this.handlePrivacy.bind(this)}>
                    {PRIVACY.map((el,idx)=>(
                        <option key={idx} value={el}>{el} </option>
                    ))}
                </select>

                <label htmlFor="activity"> Activity Type:</label>
                <select className="form-floating form-control-sm" name="activity" id="activity" value={this.state.activity} onChange={this.handleActivity.bind(this)}>
                    {ACTIVITIES.map((el,idx)=>(
                        <option key={idx} value={el}>{el} </option>
                    ))}
                </select>
                {/* <input type="file" name="file" onChange={this.handleFile.bind(this)} id="" /> */}
            


            {button}

        </form>
                        {/* map showing */}
           </div> 
             <div className="col-sm-8 col-lg-8 themed-grid-col"id="map-container" ref={map => this.mapNode = map}>
            </div>
        
              
        
        </div>

        )
    }
}


export default function(props){
    let navigate = useNavigate()
    return <CreateMap {...props} navigate={navigate}/>
}
