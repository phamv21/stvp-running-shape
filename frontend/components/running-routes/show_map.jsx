import React from "react";
import {useParams} from 'react-router-dom'
import MarkerManager from "../../utils/marker_manager";

class Show extends React.Component{
    constructor(props){
        super(props)

        //bind--
        //<--
    }
    // this.props.routes[this.props.id].pins - is the pin

    componentDidMount() {
        //fetch data
        this.props.getRoute(this.props.id)
        

        // wrap this.mapNode in a Google Map
        

    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.routes != this.props.routes){
            this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.route = this.props.routes[this.props.id]
        this.pins = this.route.pins;
        const mapOptions = {
            center: { lat: this.pins[0].lat, lng: this.pins[0].lng }, // this is SF
            zoom: 13
        };
        this.map = new google.maps.Map(this.mapNode, mapOptions);
        this.directionsRenderer.setMap(this.map);
        this.MarkerManager = new MarkerManager(this.map,this.directionsService,this.directionsRenderer);
        this.pins.forEach(pin =>{ this.MarkerManager.updateMarker({lat:pin.lat,lng:pin.lng})});
        this.MarkerManager.renderRoute();
        }
    }
    
    render(){
        let route = this.props.routes[this.props.id];
        let name = route == null ? null : route.name;
        let distance = route == null ? null : route.distance;
        return(
            <>

            <h1>{name + '-' + distance + 'm'}</h1>
            <div id="map-container" ref={map => this.mapNode = map}></div>
            </>
        )
    }

}

export default function ShowMap(props){//wrapper 
    const {id} = useParams();
    return <Show {...props} id={id}/>
} 