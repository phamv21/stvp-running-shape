import React from "react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
export default function ActivityForm(props){
    const [title,setTitle] = useState('');
    const [note,setNote] = useState('');
    const [startingTime, setStartingTime] = useState(0);
    // const [duration,setDuration] = useState(0); no need this one we can make duration on the submit
    const [routeId,setRouteId] = useState(0);
    const [hour,setHour] = useState(0);
    const [minute,setMinute] = useState(0);
    const [second,setSecond] = useState(0);
    
    function handleSubmit(e){
        e.preventDefault();
        let duration = hour * 3600 + minute * 60 + second;
        let rawData = {title:title,note:note,duration:duration,route_id:routeId,starting_time:startingTime}
        // console.log(props)
        props.submit(rawData);
    }

    //function here
    //<--
    // later userEffect to fetch the route that we already created
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

             <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="">On Day:</span>
                </div>
                <DatePicker selected={startingTime} onChange={(date) => setStartingTime(date)} />
            </div>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="">Route:</span>
                </div>
                <input type="number" value={routeId} onChange={e => setRouteId(e.target.value)} placeholder='ROUTEID'/>
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