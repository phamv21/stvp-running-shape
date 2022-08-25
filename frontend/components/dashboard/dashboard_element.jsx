import React from "react";

export default function DashboardElement({info}){
    return(
        <tr>

        <th>
            {info.title}
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