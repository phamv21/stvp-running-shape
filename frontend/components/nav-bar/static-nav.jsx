import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function StaticNav(){
//     const[isrouteActive,setRouteActive] = useState(false)

//    function handleMouseRoute(){
//         setRouteActive(!isrouteActive);
//     }
    
    // let routesChildClass = isrouteActive ? 'routes-child active' : 'routes-child'
    return(
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li id="nav-item dropdown" > 
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Routes</a>
                <ul className='dropdown-menu'>
                    <li>
                        <Link to='/map' className="dropdown-item"> Create Route</Link>
                    </li>
                    <li>
                        <Link to='/routes' className="dropdown-item">My Routes </Link>
                    </li>
                </ul>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Communities</a>
            </li>
        </ul>
        
        
    )
}