import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function StaticNav(props){
    return(
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* add dashboard */}
            <li className="nav-item dropdown" > 
                <div className="btn-group" >
                        <Link to='/activities' type='button' id='navDashboard1' className="nav-link">Dashboard</Link>
                        <a id='navDashboard2' className="nav-link dropdown-toggle dropdown-toggle-split" href="#" data-bs-toggle="dropdown" aria-expanded="false"></a>
                    <ul className='dropdown-menu' aria-labelledby="navDashboard2">
                        <li>
                            <Link to='/activities/create' className="dropdown-item">Record A Activity</Link>
                        </li>
                    </ul>
                </div>

            </li>

            <li className="nav-item dropdown" >
                <div className="btn-group">
                    <Link type='button' id='routenav1' className="nav-link" to='/routes'>Routes</Link>
                    <a className="nav-link dropdown-toggle dropdown-toggle-split" href="#" data-bs-toggle="dropdown" aria-expanded="false"></a>
                    <ul className='dropdown-menu'>
                        <li>
                            <Link to='/routes/create' className="dropdown-item">Create Route</Link>
                        </li>
                        <li>
                            <Link to='/routes/search' className="dropdown-item">Search Routes</Link>
                        </li>
                    </ul>
                </div>

            </li>

            <li className="nav-item">
                    <Link to='/community/feed' className="nav-link">Feed </Link>
            </li>
            <li className="nav-item">
                    <Link to='/community/friends' className="nav-link"> Friends</Link>
            </li>        
               
        </ul>
        
        
    )
}