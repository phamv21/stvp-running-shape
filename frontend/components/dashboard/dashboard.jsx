import React from "react";
import { useEffect } from "react";
import DashboardElement from "./dashboard_element";

// we should show the title,date, duration, distance, pace,
export default function Dashboard(props){
    // const props = data.props;
    useEffect(()=>{
        props.fetchActivities();
    },[])
    
    const activity_el = props.activities.map((el,idx)=>(
        <DashboardElement info={el} key={idx}/>
    ))

    return(
        <table className="table">
            <thead>
                <tr>
                    <th>
                        Title
                    </th>
                    <th>
                        Date
                    </th>
                    <th>
                        Duration
                    </th>
                    <th>
                        Distance
                    </th>
                </tr>
            </thead>
            <tbody>
                {activity_el}
            </tbody>
        </table>
    )

}