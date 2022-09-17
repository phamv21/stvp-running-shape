import React from "react";
import Comment from "./comment";
import { useState } from "react";
import Like from "./like";
import { Link } from "react-router-dom";
export default function FeedElement(props){
const [hideComment,setHideComment] = useState(true)

  return( 
<div className="border-bottom">
    <div className="row g-0 text-center">
        <Link to={`/profile/${props.activity.user_id}/activity_feed`}><p className="h3 text-capitalize fw-bold text-start p-2">{props.activity.author}</p></Link>
        <p className="card-text">{props.activity.note}</p>
    </div>
    <div className="row g-0 text-center">
        <div className="col-md-4 border-left" > 
          <div className="card-body">
            <p className="card-text"><small className="text-muted">Distance</small></p> 
            <p className="card-title"><strong className=" h3 ">{Math.round(props.activity.distance/10)/100}</strong>Km</p>           
            <p className="card-title"><strong className=" h3 ">{Math.round(props.activity.distance*0.0621371)/100}</strong>Miles</p>           
          </div>  
    </div>

        <div className="col-md-4 border-left"> 
          <div className="card-body">
            <p className="card-text"><small className="text-muted">Duration</small></p>
            <h3 className="h3 card-title">
            {props.activity.duration}
            </h3>         
          </div>    
        </div>

        <div className="col-md-4">
            <Link to={`/routes/${props.activity.route_id}`}>
              <img src={props.activity.thumb} className="img-fluid rounded-start rounded float-right feed-thumb" alt="route"/>
            </Link>
        </div>
      </div>
    <div className="row g-0 text-left">
        <div className="col-md-4">
          <Like {...props}/>
        </div>
        <div className="col-md-4">
          <button onClick={e=>{e.preventDefault();setHideComment(!hideComment)}} className="plain-btn">
            <i className="fa-solid fa-comment"></i>  {props.activity.comment_count} comments
          </button>
        </div>
        <div className="col-md-4">
          <p className="card-text"><small className="text-muted">About {props.activity.starting_time_text} ago </small></p>
        </div>
    </div>  
    <div className="row g-0 text-left">
      {hideComment ? null :<Comment {...props}/>}
    </div>
  </div>
      
)
}