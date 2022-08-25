import React from "react";

export default function FeedElement({props}){
    return( 
<div className="card">
  <div className="card-header">
    show the name of the author
  </div>
  <div className="card-body">
    <blockquote className="blockquote mb-0">
      <p>{props.note}</p>
      <img src={props.thumb} className="img-thumbnail rounded float-right" alt="route"/>
      <footer className="blockquote-footer">About {props.starting_time_text} ago <cite title="Source Title">by author</cite></footer>
    </blockquote>
  </div>
</div>
)
}