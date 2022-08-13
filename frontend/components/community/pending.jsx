import React, { useEffect } from "react";


export default function PendingRequest(val){
    const props = val.props;
    useEffect(()=>{
        props.findPending();
    },[]);

    function handleResponse(data){
        props.requestRespond(data);
    }
    const pendingEl = props.pending.map((el,idx)=>{
        if(el!=null){
        return (<li key={idx}>
            {el.username}
            <button onClick={e=> {e.preventDefault(); handleResponse({other_user_id:el.id,decision:'Accept'})}}>Accept</button>
            <button onClick={e=> {e.preventDefault(); handleResponse({other_user_id:el.id,decision:'Deny'})}}>Deny</button>
        </li>)
        }

    })
    return(
        <ul>
            {pendingEl}
        </ul>
    )

} 