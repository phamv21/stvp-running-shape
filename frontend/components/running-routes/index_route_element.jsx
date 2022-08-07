import React from "react";
import { useNavigate,Link } from "react-router-dom";
const IndexRouteElement = ({route}) => {
    return(
        
            <tr>
            <td scope='row'>
                <Link to={"/routes/"+route.id} >
                    {route.name}
                </Link>
                
            </td>
            <td>
                {route.distance}
            </td>
            <td>
                {route.lat}
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