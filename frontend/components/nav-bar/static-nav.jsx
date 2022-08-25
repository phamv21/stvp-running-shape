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
            {/* add dashboard */}
            <li id="nav-item dropdown" > 
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dashboard</a>
                <ul className='dropdown-menu'>
                    <li>
                        <Link to='/activities' className="dropdown-item"> My Activities</Link>
                    </li>
                    <li>
                        <Link to='/activities/create' className="dropdown-item">Create Activity </Link>
                    </li>
                </ul>
            </li>

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
                <Link className="nav-link" to="/community/friends">Communities</Link>
            </li>
        </ul>
        
        
    )
}