import React from "react";
import MarkerManager from "../../utils/marker_manager";
import {useNavigate} from 'react-router-dom'



class MyMap extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            bounds: {},
            pin_infos: [],
            name: '',
            description: '',

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
            zoom: 13
        };

        // wrap this.mapNode in a Google Map

        this.map = new google.maps.Map(this.mapNode, mapOptions);
        this.directionsRenderer.setMap(this.map);
        this.MarkerManager = new MarkerManager(this.map,this.directionsService,this.directionsRenderer);

        //add the listener to the map
        this.map.addListener('bounds_changed',()=>{
            let northEast = this.map.getBounds().getNorthEast();
            let southWest = this.map.getBounds().getSouthWest();
            this.setState({bounds:{northEast:{lat:northEast.lat(),lng:northEast.lng()},southWest:{lat:southWest.lat(),lng:southWest.lng()}}});
        })

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
    }

    _handleClick(coords) {
        // this.props.navigate('benches/new', { state: { lat:coords.lat(),lng:coords.lng() },replace:true })
        let loc = { lat:coords.lat(),lng:coords.lng() }
        this.MarkerManager.updateMarker(loc);
        this.MarkerManager.renderRoute();
        this.setState({pin_infos:[...this.state.pin_infos,loc]})

    }
    handleName(e){
        e.preventDefault();
        this.setState({name:e.target.value})
    }

    handleDescription(e){
        e.preventDefault();
        this.setState({description:e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
        // count total distance 
        let distanceSum = 0.0;
        this.MarkerManager.route_steps.forEach(el => {distanceSum += el.distance.value})
        // submit propr
        let info = {
            name: this.state.name,
            description: this.state.description,
            pin_infos: this.state.pin_infos,
            distance: distanceSum,

        } 
        this.props.submit(info);
    }

    render(){
        
        return(
        <>
         <div id="map-container" ref={map => this.mapNode = map}>
        </div>
        <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" name="name" value={this.state.name} onChange={this.handleName.bind(this)}/>
            <input type="text" name='description' value={this.state.description} onChange={this.handleDescription.bind(this)}/>
            {/* add field privacy and activity type */}
            <input type="submit" value="Submit" />
        </form>
        </>

        )
    }
}


export default function(props){
    let navigate = useNavigate()
    return <MyMap {...props} navigate={navigate}/>
}
