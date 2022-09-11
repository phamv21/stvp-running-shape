import React from "react";
import { useEffect,useState } from "react";
import FeedElement from "./feed_element";
import { FEEDPERPAGE } from "../../utils/const_util";
// we should show the title,date, duration, distance, pace,
export default function Feed(props){
    // const props = data.props;
    const[initialLoad,setInitialLoad] = useState(true);
    // const[pageNum,setPageNum] = useState(0);
    useEffect(()=>{
      if(props.user_id != null){
        props.initialFeed(props.user_id,props.page);
      }else{
        props.initialFeed(props.page);
      }
      setInitialLoad(true)
    },[])
    useEffect(()=>{
      if (props.page > 0){
        if(props.user_id != null){
        props.initialFeed(props.user_id,props.page);
        }else{
        props.initialFeed(props.page);
      }
      }

    },[props['page']])

    let activities = [];
    if(typeof props.activities == 'function'){
        activities = props.activities(props.user_id)
    }else{
        activities = props.activities
    }

    const feedEl =  activities.map((el,idx)=>(
        <FeedElement  activity={el} {...props} key={idx}/>
    )); 


    const loadingContent =(
<div className="border-bottom" aria-hidden="true">
  
<div className="row g-0">
  <div className="col-md-4 border-left" > 
    <div className="card-body">
      <p className="card-text placeholder-glow">
        <small className="placeholder col-3"></small>
        <small className="placeholder col-8"></small>
        <small className="placeholder col-6"></small>
        <small className="placeholder col-8"></small>
        </p> 
      <h3 className=" h3 card-title placeholder-glow">
        <p className="placeholder col-2"></p>
        <p className="placeholder col-8"></p>
        <p className="placeholder col-5"></p>
        <p className="placeholder col-8"></p>
      </h3>           
      
    </div>  
  </div>

  <div className="col-md-4 border-left"> 
   <div className="card-body">
      <p className="card-text placeholder-glow">
        <small className="placeholder col-3"></small>
        <small className="placeholder col-4"></small>
        <small className="placeholder col-6"></small>
        <small className="placeholder col-5"></small>
        </p> 
      <h3 className=" h3 card-title placeholder-glow">
        <p className="placeholder col-2"></p>
        <p className="placeholder col-5"></p>
        <p className="placeholder col-4"></p>
        <p className="placeholder col-8"></p>
        <p className="placeholder col-4"></p>
        <p className="placeholder col-6"></p>
      </h3>           
      
    </div>   
</div>
  <div className="col-md-4">
        <h3 className=" h3 card-title placeholder-glow">
        <p className="placeholder col-12"></p>
        <p className="placeholder col-12"></p>
        <p className="placeholder col-12"></p>
        <p className="placeholder col-12"></p>
        <p className="placeholder col-12"></p>
      </h3>

  </div>
</div>
</div>
  )
  let moreBtn = props.loading ? (
    <div className="row g-0">
      <button className="btn disabled"> Loading</button>
    </div>

  ) : (<div className="row g-0">
      <button onClick={e => {e.preventDefault(); props.updatePage(props.page +1) } } className="btn">Load More</button>
  </div>)
  let loadMore = (props.page * FEEDPERPAGE) <= activities.length ? moreBtn : <div className="row g-0">
      <button className="btn disabled"> No more Feed</button>
    </div>
    if(!props.loading && initialLoad){
        setInitialLoad(false);
    }
    const content = (<div className="card mb-3 feed-card" aria-hidden="true">
            {props.loading && initialLoad ? 
            (<div>
                {loadingContent}
                {loadingContent}
                {loadingContent}
            </div>)
            :(<>
            {feedEl}
            {loadMore}
            </>)
            
            }
            
        </div>)
    const noContent = (<div className="card mb-3 feed-card" > 
    <div className="card-body">
      <p className="card-text"><small className="text-muted"><i className="fa-regular fa-face-sad-tear"></i></small></p> 
      <h3 className=" h3 card-title">
            No Activities can be Found
      </h3>           
      
    </div>  
  </div>)

  
    return(
        !props.loading && activities.length == 0 ?
        noContent :content
        
    )

}