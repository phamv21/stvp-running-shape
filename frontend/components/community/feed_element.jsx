import React from "react";
import Comment from "./comment";
import { useState } from "react";
import Like from "./like";
import { Link } from "react-router-dom";
export default function FeedElement(props){
const [hideComment,setHideComment] = useState(true)

    return( 
     <div className="border-bottom">
  <div className="row g-0">
    <Link to={`/profile/${props.activity.user_id}/activity_feed`}>{props.activity.author}</Link>
    <p className="card-text">{props.activity.note}</p>
  </div>
<div className="row g-0">
  <div className="col-md-4 border-left" > 
    <div className="card-body">
      <p className="card-text"><small className="text-muted">Distance(Km)</small></p> 
      <h3 className=" h3 card-title">
      {props.activity.distance/1000}
      </h3>           
      
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
    <Link to={`/activities/${props.activity.id}`}>
          <img src={props.activity.thumb} className="img-fluid rounded-start rounded float-right feed-thumb" alt="route"/>
    </Link>
  </div>
</div>
<div className="row g-0">
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
  <div className="row g-0">
      {hideComment ? null :<Comment {...props}/>}
  </div>
</div>
      
)
}