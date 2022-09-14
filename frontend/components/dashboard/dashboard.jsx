import React from "react";
import { useEffect } from "react";
import DashboardElement from "./dashboard_element";

// we should show the title,date, duration, distance, pace,
export default function Dashboard(props){
    // const props = data.props;
    useEffect(()=>{
        props.fetchActivities();
    },[])
    const activity_el = props.activities.length != 0 ? props.activities.map((el,idx)=>(
        <DashboardElement info={el} key={idx}/>
    )):(<tr>
        <td>
            You have not created any activity
        </td>
        </tr> )

    const loadingContent =(
        <>
            <tr>
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
                <td className="placeholder-glow col-2">
                    <span className="placeholder col-12"></span>
                </td >
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
            </tr>
            <tr>
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
                <td className="placeholder-glow col-2">
                    <span className="placeholder col-12"></span>
                </td >
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
            </tr>
            <tr>
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
                <td className="placeholder-glow col-2">
                    <span className="placeholder col-12"></span>
                </td >
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
            </tr>
        </>     
    )
    return(
        <table className="table table-hover">
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
                        Distance(Km)
                    </th>
                </tr>
            </thead>
            <tbody>
            {props.loading && props.activities.length == 0  ? loadingContent : 
            (
            activity_el
            )}
            </tbody>
        
        </table>
         

    )

}