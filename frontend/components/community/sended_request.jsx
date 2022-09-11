import React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
export default function SendedRequest(val){
    const props = val.props
    useEffect(()=>{
        props.findRequested();
    },[])
    function handleUndo(id){
        props.undoFriendRequest(id)    
    }

    const requested = props.requested.map((el,idx) => {
        if(el != null){
            return(
                <li key={idx}>
                     {el.username}
                     <button className="btn btn-secondary" onClick={e => {e.preventDefault(); handleUndo(el.id);}} >Undo</button>
                </li>
            )
        }
        
    })
        return (
        <ul>
            {requested}
        </ul>

    )

    

}
