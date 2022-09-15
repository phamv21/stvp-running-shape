import React from "react";
import { Link } from "react-router-dom";

export default function DashboardElement({info}){
    const content = info == null ? null :( 
    <tr>
        <td>
            <Link to={'/activities/'+info.id}>{info.title}</Link>
        </td>
        <td>
            {info.starting_time}
        </td>
        <td>
            {info.duration}
        </td>
        <td>
            {Math.round(info.distance/10)/100} Km/
            {Math.round(info.distance*0.0621371)/100} Miles
        </td>

    </tr>)
    return(
        <>
        {content}
        </>       
    )
}