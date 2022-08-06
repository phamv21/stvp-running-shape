import React from "react";
import MarkerManager from "../../utils/marker_manager";
import {useNavigate} from 'react-router-dom'
import AutoCompleteSearch from "../../utils/auto_complete_search_util";
import { PRIVACY, ACTIVITIES } from "../../utils/const_util";
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
            center: { lat: 37.7758, lng: -122.435 }, // this is SF
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

    handleSubmit(e){
        e.preventDefault();
        // count total distance 
        let distanceSum = 0.0;
        this.MarkerManager.route_steps.forEach(el => {distanceSum += el.distance.value})
        const pin_nodes = this.MarkerManager.nodes;
        let pin_infomation = [];
        pin_nodes.forEach(el=>{pin_infomation.push({lat:el.location.lat,lng:el.location.lng,description:el.description})})


        // submit props
        let info = {
            name: this.state.name,
            privacy:this.state.privacy,
            activity:this.state.activity,
            description: this.state.description,
            pin_infos: pin_infomation,
            distance: distanceSum,

        } 
        this.props.submit(info);
        
        // this.props.navigate(`/routes/${routeId}`)

    }

    render(){
        let button = this.props.loading ? 
        ( <button disabled={true}>
                <div className="loading-btn"/>
            </button>)
             : (<input type="submit" value="Submit" />);
        return(
        <div className="create-route">
           <div className="left-create-route">
            <input type="text" id='auto-complete-search' placeholder="Please type the area that you want to run" />

            {/* form for name and description input */}
            <form className="create-route-form" onSubmit={this.handleSubmit.bind(this)}>
            <input placeholder="Route's Name" type="text" name="name" value={this.state.name} onChange={this.handleName.bind(this)}/>
            <input placeholder="Description" type="text" name='description' value={this.state.description} onChange={this.handleDescription.bind(this)}/>
            {/* add field privacy and activity type */}
            <div className="select-container">
                <label htmlFor="privacy"> Visibility</label>
                <select name="privacy" id="privacy" value={this.state.privacy} onChange={this.handlePrivacy.bind(this)}>
                    {PRIVACY.map((el,idx)=>(
                        <option key={idx} value={el}>{el} </option>
                    ))}
                </select>

                <label htmlFor="activity"> Activity</label>
                <select name="activity" id="activity" value={this.state.activity} onChange={this.handleActivity.bind(this)}>
                    {ACTIVITIES.map((el,idx)=>(
                        <option key={idx} value={el}>{el} </option>
                    ))}
                </select>
            </div>
            


            {button}

        </form>

           </div>
             <div className="right-create-route" id="map-container" ref={map => this.mapNode = map}>
            </div>
        
              
        
        </div>

        )
    }
}


export default function(props){
    let navigate = useNavigate()
    return <CreateMap {...props} navigate={navigate}/>
}
