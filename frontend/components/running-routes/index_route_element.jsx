import React from "react";
import { useNavigate,Link } from "react-router-dom";
const IndexRouteElement = ({route}) => {
    return(
        
            <tr>
            <td className="d-flex justify-content-center">
            <Link to={"/routes/"+route.id} className="card" >
                <img className="card-img-top route-thumb" src={route.thumb} />
                <div className="card-body">
                    <h5 className="card-title">{route.name}</h5>
                </div>
            </Link>
                
            </td>
            <td>
                {route.distance}
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
            <td>
                action
            </td>
            </tr>
            
    )
}

export default IndexRouteElement;