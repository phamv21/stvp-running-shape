import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function StaticNav(){
    return(
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* add dashboard */}
            <li className="nav-item dropdown" > 
                <a id='navDashboard' className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dashboard</a>
                <ul className='dropdown-menu' aria-labelledby="navDashboard">
                    <li>
                        <Link to='/activities' className="dropdown-item"> My Activities</Link>
                    </li>
                    <li>
                        <Link to='/activities/create' className="dropdown-item">Create Activity </Link>
                    </li>
                </ul>
            </li>

            <li className="nav-item dropdown" > 
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

            <li className="nav-item dropdown"  > 
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Community</a>
                <ul className='dropdown-menu'>
                    <li>
                        <Link to='/community/feed' className="dropdown-item">Feed </Link>
                    </li>

                    <li>
                        <Link to='/community/friends' className="dropdown-item"> Friends</Link>
                    </li>  
                </ul>
            </li>
        </ul>
        
        
    )
}