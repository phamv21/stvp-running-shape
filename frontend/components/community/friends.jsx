import React from "react";
import { useEffect } from "react";


export default function Friends(val){
    const props = val.props
    useEffect(()=>{
        props.findFriends();
    },[])
    const myFriends = props.friends.map((el,idx)=>{
        if(el != null){
        return (<li key={idx}>
            {el.username}
        </li>)
        }

    })
    return(
        <ul>
            {myFriends}
        </ul>
    )
}