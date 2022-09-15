import React from "react";
import {useParams,useNavigate} from 'react-router-dom'
import MarkerManager from "../../utils/marker_manager";
import { Link } from "react-router-dom";

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
            // render only when have pin
            
            this.directionsService = new google.maps.DirectionsService();
            this.directionsRenderer = new google.maps.DirectionsRenderer();
            this.route = this.props.routes[this.props.id]
            this.pins = this.route.pins;

            if(this.pins){
                const mapOptions = {
                    center: { lat: this.pins[0].lat, lng: this.pins[0].lng }, // this is SF
                    zoom: 13,
                };
                this.map = new google.maps.Map(this.mapNode, mapOptions);
                this.directionsRenderer.setMap(this.map);
                this.MarkerManager = new MarkerManager(this.map,this.directionsService,this.directionsRenderer);
                this.pins.forEach(pin =>{ this.MarkerManager.updateMarker({lat:pin.lat,lng:pin.lng},pin.description)});
                this.MarkerManager.renderRoute();
            }
        }

    }
    // handleDelete(e){
    //     e.preventDefault();
    //     if(confirm('The Deleted Route can not be Recovered. Are you sure?')){
    //         this.props.deleteRoute(this.props.id).then(res=>this.props.navigate('/routes'))
    //     }else{
    //         //do not
    //     }
    // }
    
    render(){
        let route = this.props.routes[this.props.id];
        let name = route == null ? null : route.name;
        let distance = route == null ? null : route.distance;
        if(route == null) {
            return(<div className="loading"></div>)
        }else{
            return(
            <div className="row mb-3 text-center" style={{'height':'95vh'}}>
                <div className="col-sm-12 col-lg-4 border">
                    <div className="card">
                        <div className="card-header h2">
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
                        <span>Distance(Km): {route.distance/1000}</span>
                    </li>
                    <li className="list-group-item">
                        <span>Visibility: {route.privacy} </span>
                    </li>
                    <li className="list-group-item">
                        <Link to={'/activities/create/'+route.id}>Create Activity with this route</Link>
                    </li>
                    {/* <li className="list-group-item">
                        <button onClick={this.handleDelete.bind(this)} type="button" className="btn btn- btn-outline-danger" >Delete This Route</button>
                    </li> */}
                    {/* // */}

                

                    {/* // */}

                </ul>
                </div>
                </div>
            
            <div className="col-sm-12 col-lg-8 border" style={{'minHeight':'80%'}} id="map-container" ref={map => this.mapNode = map}></div>
            </div>)
        } 
            
        
            
    }

}

export default function ShowMap(props){//wrapper 
    const {id} = useParams();
    const navigate = useNavigate();
    return <Show {...props} id={id} navigate={navigate}/>
} 