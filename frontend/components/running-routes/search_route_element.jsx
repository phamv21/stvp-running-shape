import React from "react";


export default function SeachRouteElement(props){

    return(
        <div className=' row justify-content-between p-2 ' value={props.route.id} onMouseEnter={e => {props.handleHighlight(props.route.id) }} onMouseLeave={e => {props.handleHighlight(null) } } onClick={e => props.handleRouteRender(props.route.id)}>
                <img className="img-thumbnail super-small-img col-4" src={props.route.thumb} alt="" />
                <p className="h3 col-5 jusstify-content-center" >{props.route.name}</p>
                <p className=" h4 col-3 jusstify-content-center">{Math.round(props.route.distance/10)/100} Km</p>
                <p className=" h4 col-3 jusstify-content-center">{Math.round(props.route.distance*0.0621371)/100} Miles</p>
        </div>
    )
}