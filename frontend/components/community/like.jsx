import React from "react";
import { useState } from "react";
export default function Like(props){
    const [liked,setLiked] = useState(props.likedActivities[props.activity.id]!= null)
    // const [likeCount,setLikeCount]= useState(props.activity.like_count || 0)
    function handleLike(e){
        e.preventDefault();
        props.createLike(props.activity.id);
        // setLiked(!liked);
    }
    function handleUnlike(e){
        e.preventDefault();
        let like_id = props.likedActivities[props.activity.id]['id'];
        props.destroyLike(like_id);
        // setLiked(!liked);
    }

    const likeButton = props.likedActivities[props.activity.id]!= null ? (
        <button id="plain-btn" className="plain-btn" onClick={handleUnlike}>
            <i className="fa-solid fa-heart red"></i>
        </button>
    ) : (
        <button  id="plain-btn" className=" plain-btn"  onClick={handleLike}>
            <i className="fa-regular fa-heart "></i>
        </button>
    )


    return(
        <div>
            {likeButton} 
            {props.activity.like_count == 0 ? (<span>Be the first to like this</span>) :(<span>{props.activity.like_count} People Liked this</span>) }
            
        </div>
    )
}