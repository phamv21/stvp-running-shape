import React from "react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import RouteElement from "./route_element";
import { useNavigate } from "react-router-dom";
export default function ActivityForm({routes,loading,routeHash,newActivityId,submit,fetchRoutes}){
    const [title,setTitle] = useState('');
    const [note,setNote] = useState('');
    const [startingTime, setStartingTime] = useState(0);
    // const [duration,setDuration] = useState(0); no need this one we can make duration on the submit
    const [routeId,setRouteId] = useState(0);
    const [hour,setHour] = useState(0);
    const [minute,setMinute] = useState(0);
    const [second,setSecond] = useState(0);
    const [isShow,setIsShow] = useState(false);
    const navigate = useNavigate();
    // fetch the routes on mount
    useEffect(()=>{
        fetchRoutes();
        console.log(routeId)
    },[routeId]);

    useEffect(()=>{
        if (newActivityId != null){
            navigate(`/activities/${newActivityId}`,true)
        }
    },[newActivityId])

    function handleSubmit(e){
        e.preventDefault();
        let duration = hour * 3600 + minute * 60 + second;
        let rawData = {title:title,note:note,duration:duration,route_id:routeId,starting_time:startingTime}
        // console.log(props)
        submit(rawData);
    }

    //function here
    //<--
    // later userEffect to fetch the route that we already created
    const routeEl = routes.map((el,idx)=>(
        <RouteElement key={idx} props={el} fnc={setRouteId} setIsShow={setIsShow} isShow={isShow}/>
    ))
    let dropdownMenu = isShow ? 'dropdown-menu route-dropdown show' : 'dropdown-menu';
    let selectedRoute = routeId == 0 ? (<span>Please select the route</span>) : (<div>
        <img className="img-thumbnail super-small-img" src={routeHash[routeId].thumb} alt="" />
        {routeHash[routeId].name}:{routeHash[routeId].area_name}
    </div>)
    return(
        <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="">Title:</span>
                </div>
                <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
            </div>
            
             <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="">Note:</span>
                </div>
                <input type="text" value={note} onChange={(e)=>{setNote(e.target.value)}} />
            </div>
                    <label htmlFor="datePickerAct">On Date</label>
                    <DatePicker id='datePickerAct' selected={startingTime} onChange={(date) => setStartingTime(date)} />

            <div className="dropdown mb-3">
                <a className="btn btn-outline-dark route-select-btn" type="button" id="selectroute" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={e =>{e.preventDefault();setIsShow(!isShow)}}>  
                    {selectedRoute}
                </a>
                  <div className={dropdownMenu} >
                            {routeEl}
                </div>
                    
            </div>

            

            

            {/* the form to set the duration  */}
            <div className="input-group mb-3">
                 <div className="input-group-prepend">
                    <span className="input-group-text" id="">H:M:S</span>
                </div>
                    <input type="text" className="form-control" value={hour} onChange={e => setHour(e.target.value)} />
                    <input type="text" className="form-control" value={minute} onChange={e => setMinute(e.target.value)} />
                    <input type="text" className="form-control" value={second} onChange={e => setSecond(e.target.value)}  />
            </div>
            <button> Save</button>
        </form>
    )



}