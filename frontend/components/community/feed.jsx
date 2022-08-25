import React from "react";
import { useEffect } from "react";
import FeedElement from "./feed_element";

// we should show the title,date, duration, distance, pace,
export default function Feed(props){
    // const props = data.props;
    useEffect(()=>{
        props.fetchFeed();
    },[])
    
    const feedEl = props.activities.map((el,idx)=>(
        <FeedElement props={el} key={idx}/>
    ))

    return(
        <div>
            {feedEl}
        </div>
    )

}