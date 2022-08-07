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
        this.pins.forEach(pin =>{ this.MarkerManager.updateMarker({lat:pin.lat,lng:pin.lng},pin.description)});
        this.MarkerManager.renderRoute();
        }
    }
    
    render(){
        let route = this.props.routes[this.props.id];
        let name = route == null ? null : route.name;
        let distance = route == null ? null : route.distance;
        if(route == null) {
            return(<div className="loading"></div>)
        }else{
            return(
            <div className="row mb-3 text-center">
                <div className="col-4 col-lg-4 themed-grid-col">
                    <div className="card">
                        <div className="card-header">
                                Route Infomation
                        </div>
                    <ul className="list-group list-group-flush">
                    
                    <li className="list-group-item"> 
                        <h3>Name: {route.name}</h3>
                    </li>
                    <li className="list-group-item">
                        <span>Description: {route.description} </span>
                    </li>
                    <li className="list-group-item">
                        <span>Distance: {route.distance}</span>
                    </li>
                    <li className="list-group-item">
                        <span>Visibility: {route.privacy} </span>
                    </li>
                </ul>
                </div>
                </div>
            
            <div className="col-8 col-lg-8 themed-grid-col" id="map-container" ref={map => this.mapNode = map}></div>
            </div>)
        } 
            
        
            
    }

}

export default function ShowMap(props){//wrapper 
    const {id} = useParams();
    return <Show {...props} id={id}/>
} 