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
            {info.distance/1000}
        </td>

    </tr>)
    return(
        <>
        {content}
        </>       
    )
}