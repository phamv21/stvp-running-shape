import React from "react";
import {useNavigate, useParams} from 'react-router-dom'
import MarkerManager from "../../utils/marker_manager";
import { Link } from "react-router-dom";

class Show extends React.Component{
    constructor(props){
        super(props)
        this.currentActivity =null;
        
        //bind--
        //<--
    }
    // this.props.routes[this.props.id].pins - is the pin

    componentDidMount() {
        //fetch data
        this.props.findActivity(this.props.id)

        // wrap this.mapNode in a Google Map
        

    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.routes != this.props.routes){
            this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.route = this.props.routes[this.currentActivity['route_id']]
        this.pins = this.route.pins;
        const mapOptions = {
            center: { lat: this.pins[0].lat, lng: this.pins[0].lng }, // this is SF
            zoom: 13,
            mapId:'IDb9270ddec3f692ae',
            
        };
        this.map = new google.maps.Map(this.mapNode, mapOptions);
        this.directionsRenderer.setMap(this.map);
        this.MarkerManager = new MarkerManager(this.map,this.directionsService,this.directionsRenderer);
        this.pins.forEach(pin =>{ this.MarkerManager.updateMarker({lat:pin.lat,lng:pin.lng},pin.description)});
        this.MarkerManager.renderRoute();
        }

        if(prevProps.activities != this.props.activities){
            this.currentActivity = this.props.activities[this.props.id]
            this.props.getRoute(this.currentActivity['route_id'])
        }
    }

     handleDelete(e){
        e.preventDefault();
        if(confirm('The Deleted Activity can not be Recovered.\n Are you sure?')){
            this.props.deleteActivity(this.props.id).then(res=>this.props.navigate('/activities'))
        }else{
            //do nothing
        }
    }
    
    render(){
        
        if(this.currentActivity == null) {
            return(<div className="loading"></div>)
        }else{
            return(
            <div className="row mb-3 text-center" style={{'height':'95vh'}}>
                <div className="col-sm-12 col-lg-4 border">
                    <div className="card">
                        <div className="card-header h2">
                                Activity Infomation
                        </div>
                    <ul className="list-group list-group-flush">
                    
                    <li className="list-group-item"> 
                        <h3 className="h3"> {this.currentActivity.title}</h3>
                    </li>
                    <li className="list-group-item">
                        <span>Note: {this.currentActivity.note} </span>
                    </li>
                    <li className="list-group-item">
                        <span>Distance: {Math.round(this.currentActivity.distance/10)/100} Km</span>
                        <span>{Math.round(this.currentActivity.distance*0.0621371)/100} Miles</span>
                    </li>
                    <li className="list-group-item">
                        <span>Duration: {this.currentActivity.duration} </span>
                    </li>
                    <li className="list-group-item">
                        <span>Start Time: {this.currentActivity.starting_time} </span>
                    </li>
                    <li className="list-group-item">
                        <span>Total Like: {this.currentActivity.like_count} </span>
                    </li>
                    <li className="list-group-item">
                        <span>Total Comment: {this.currentActivity.comment_count} </span>
                    </li>
                    <li className="list-group-item">
                       <Link to={'/activities/create/'+this.currentActivity.route_id}> Run with this route</Link>
                    </li>
                    <li className="list-group-item">
                        <button onClick={this.handleDelete.bind(this)} type="button" className="btn btn- btn-outline-danger" >Delete This Activity</button>
                    </li>

                </ul>
                </div>
                </div>
            
            <div className="col-sm-12 col-lg-8 border" style={{'minHeight':'80%'}} id="map-container" ref={map => this.mapNode = map}></div>
            </div>)
        } 
            
        
            
    }

}

export default function ActivityShow(props){//wrapper 
    const {id} = useParams();
    const navigate = useNavigate();
    return <Show {...props} id={id} navigate={navigate}/>
} 