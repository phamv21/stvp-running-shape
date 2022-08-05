import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function StaticNav(){
    const[isrouteActive,setRouteActive] = useState(false)

   function handleMouseRoute(){
        setRouteActive(!isrouteActive);
    }
    
    let routesChildClass = isrouteActive ? 'routes-child active' : 'routes-child'
    return(
        <ul className="nav-main-btn">
            <li id="routes-btn"   onMouseLeave={handleMouseRoute} onMouseEnter={handleMouseRoute}>
                <span> Routes</span>
                <ul className={routesChildClass}>
                    <li>
                        <Link to='/map'> Create Route</Link>
                    </li>
                    <li>
                        <Link to='/routes'>My Routes </Link>
                    </li>
                </ul>
            </li>
            <li id="community-btn">
                <span> Communities</span>
            </li>
        </ul>
        
        
    )
}