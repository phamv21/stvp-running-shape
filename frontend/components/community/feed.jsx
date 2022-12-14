import React from "react";
import { useEffect,useState } from "react";
import FeedElement from "./feed_element";
import { FEEDPERPAGE } from "../../utils/const_util";
import { Link } from "react-router-dom";
// we should show the title,date, duration, distance, pace,
export default function Feed(props){
    // const props = data.props;
    const[initialLoad,setInitialLoad] = useState(true);
    // const[pageNum,setPageNum] = useState(0);
    useEffect(()=>{
      if(props.user_id != null){
        let page = props.page[props.user_id] || 0
        props.fetchFeed(props.user_id,page);
      }else{
        props.fetchFeed(props.page);
      }
      if (props.dashboardShow){
        document.title = 'Dashboard'
      }else{
        document.title = 'Feed'
      }
      
      setInitialLoad(true)
    },[])
    useEffect(()=>{
        if(props.user_id != null && props.page[props.user_id] > 0){
          // finding the last id 
          let filterAct = activities.filter(el => el.like_count !=null)
          let lastId = filterAct[filterAct.length -1].id
        props.fetchFeed(props.user_id,props.page[props.user_id],lastId);

        }else{
          if(props.page > 0){
            let filterAct = activities.filter(el => el.like_count !=null)
            let lastId = filterAct[filterAct.length -1].id
            props.fetchFeed(props.page,lastId);
          } 
      }
    },[props['page']])

    let activities = [];
    if(typeof props.activities == 'function'){
        activities = props.activities(props.user_id)
    }else{
        activities = props.activities
    }
    const feedEl =  activities.map((el,idx)=>{
      if(el.like_count != null){
        // setLastActivityId(idx);
        return (<FeedElement  activity={el} {...props} key={idx}/>)
      }else{
        return null
      }  // this to prevent load the my_activity out of the feed range    
          
  }); 


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
  let page = props.user_id == null ? props.page : (props.page[props.user_id] || 0)
  let moreBtn = props.loading ? (
    <div className="row g-0">
      <button className="btn disabled"> Loading</button>
    </div>

  ) : (<div className="row g-0">
      <button onClick={e => {e.preventDefault(); props.updatePage(page +1,props.user_id) } } className="btn">Load More</button>
  </div>)
  
  let loadMore = (page * FEEDPERPAGE) <= activities.length ? moreBtn : <div className="row g-0">
      <button className="btn disabled"> No more Feed</button>
    </div>
    if(!props.loading && initialLoad){
        setInitialLoad(false);
    }
  let totalDis = 0
  props.dashboardShow ? activities.forEach(el => totalDis += el.distance) : null
  let sumaryAct = props.dashboardShow ? (<div className="card mb-3 bg-black text-white">
  <div className="card-header display-6 fst-italic">
    Your Running Statics Summary
  </div>
  <div className="card-body">
    <blockquote className="blockquote mb-0">
      <p><strong>You have run total:</strong> {activities.length} times</p>
      <p><strong>And You Have Cover:</strong> {Math.round(totalDis/10)/100} Km or {Math.round(totalDis*0.0621371)/100} Miles </p>
    </blockquote>
  </div>
</div>
  
  ) : null


    const content = (<div className="card mb-3 feed-card" aria-hidden="true">
            {props.loading && initialLoad ? 
            (<div>
                {loadingContent}
                {loadingContent}
                {loadingContent}
            </div>)
            :(<>
            {sumaryAct}
            {feedEl}
            {!props.dashboardShow ? loadMore : null}
            </>)
            
            }
            
        </div>)
    const noContent = (<div className="card mb-3 feed-card" > 
    <div className="card-body">
      <p className="card-text"><small className="text-muted"><i className="fa-regular fa-face-sad-tear"></i></small></p> 
      <h3 className=" h3 card-title">
            No Activities can be Found
            {props.dashboardShow ? (<Link to='/activities/create'>Record your first activity</Link>) : null}
      </h3>           
      
    </div>  
  </div>)

    return(
      !props.loading && activities.length == 0 ?
        noContent : content
    )
}