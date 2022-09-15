import React from "react";
import { useNavigate,Link } from "react-router-dom";
const IndexRouteElement = ({route}) => {
    return(
        
            <tr>
            <td className="justify-content-center">
            <Link to={"/routes/"+route.id} className="card" style={{'width':'6.4rem'}} >
                <img className="card-img-top route-thumb" src={route.thumb} />
                <div className="card-body">
                    <h5 className="card-title">{route.name}</h5>
                </div>
            </Link>
                
            </td>
            <td>
                {Math.round(route.distance/10)/100} Km/
                {Math.round(route.distance*0.0621)/100} Miles
            </td>
            <td>
                {route.area_name}
            </td>
            <td>
                {route.created_at != null ? route.created_at.slice(0,10) : null}
            </td>
            <td>
                {route.privacy}
            </td>
            </tr>
            
    )
}

export default IndexRouteElement;