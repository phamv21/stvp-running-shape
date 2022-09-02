import React from "react";
import Comment from "./comment";
import { Link } from "react-router-dom";
export default function FeedElement({activity,comments,createComment,fetchComments}){

    return( 
<div className="card">
  <div className="card-header">
    <Link to={`/profile/${activity.user_id}/activity_feed`}>{activity.author}</Link>
  </div>
  <div className="card-body">
    <blockquote className="blockquote mb-0">
      <p>{activity.note}</p>
      <img src={activity.thumb} className="img-thumbnail rounded float-right feed-thumb" alt="route"/>
      <Comment activity={activity} comments={comments} createComment={createComment} fetchComments={fetchComments}/>
      <br />
      <footer className="blockquote-footer">About {activity.starting_time_text} ago <cite title="Source Title">by author</cite></footer>
    </blockquote>
  </div>
</div>
)
}