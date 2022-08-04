import React from "react";
import { useNavigate,Link } from "react-router-dom";
const IndexRouteElement = ({route}) => {
    return(
    <li >
        <Link to={'/routes/'+route.id}> <h4>{route.name}</h4></Link>
    </li>)
}

export default IndexRouteElement;