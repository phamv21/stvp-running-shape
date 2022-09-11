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
        return (            
            <div className="card text-center" style={{"width": "18rem"}} key={idx}>
                    {el.avatar == '' ? (<div className="card-img-top"><i className="fa fa-user fa-5x" aria-hidden="true"></i></div>):(
                        <img className="card-img-top " src={el.avatar} alt="avatar" />
                    )}
                    <div className="card-body">
                        <h5 className="card-title">{el.username} </h5>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-sucess" onClick={e=> {e.preventDefault(); handleResponse({other_user_id:el.id,decision:'Accept'})}}>Accept</button>
                        <button className="btn btn-warning" onClick={e=> {e.preventDefault(); handleResponse({other_user_id:el.id,decision:'Deny'})}}>Deny</button>
                    </div>
                </div>)
        }

    })
    return(
        <ul className="d-flex flex-row p-2">
            {pendingEl}
        </ul>
    )

} 