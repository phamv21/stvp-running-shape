import React from "react";
import { Link } from "react-router-dom";

export default function DashboardElement({info}){
    return(
        <tr>

        <th>
            <Link to={'/activities/'+info.id}>{info.title}</Link>
        </th>
        <th>
            {info.starting_time}
        </th>
        <th>
            {info.duration}
        </th>
        <th>
            {info.distance}
        </th>

        </tr>
        
    )
}