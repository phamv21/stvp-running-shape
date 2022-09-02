import React from "react";
import { useEffect } from "react";
import FeedElement from "./feed_element";
// we should show the title,date, duration, distance, pace,
export default function Feed(props){
    // const props = data.props;
    useEffect(()=>{
        props.fetchFeed(props.user_id);
        props.fetchCommentsFeed();
    },[])
    let activities = [];
    if(typeof props.activities == 'function'){
        activities = props.activities(props.user_id)
    }else{
        activities = props.activities
    }

    const feedEl =  activities.map((el,idx)=>(
        <FeedElement  activity={el} comments={props.comments} createComment={props.createComment} fetchComments={props.fetchComments} key={idx}/>
    ));

    return(
        <div>
            {feedEl}
        </div>
    )

}