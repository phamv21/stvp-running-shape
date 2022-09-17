import React from "react";
import Feed from "../community/feed";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
export default function Dashboard(props){
    const user_id = props.currentUserId; 
    const newProps = {...props};
    newProps['user_id'] = user_id;
    newProps['dashboardShow'] = true

    return(
        <div>
            <Feed {...newProps}/>
        </div>
    
    )       

}
