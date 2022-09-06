import React from "react";
import Feed from "./feed";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
export default function UserFeed(props){
    const {user_id} = useParams(); 
    const newProps = {...props};
    newProps['user_id'] = user_id;

    
    return(
    <Feed {...newProps}/>
    )       

}
