import React from "react";
import { useNavigate,Link } from "react-router-dom";
const IndexRouteElement = ({route}) => {
    return(
        
            <tr>
            <td scope='row'>
                <Link to={"/routes/"+route.id} >
                    {route.name}
                    <img className="img-thumbnail route-thumb" src={route.thumb} />
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