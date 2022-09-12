import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function ProfileControl({loggedIn,userInfo,logout}){
    const [isActive,setActive] = useState(false);

    function handleMouse(){
        setActive(!isActive);
    }
    function handleLogout(e){
        e.preventDefault();
        logout();
    }
    let subBtnClass = isActive ? 'profile-sub-btn active' : 'profile-sub-btn'

    let showEl 
    if(!loggedIn){
        showEl = (<Link to='/login' className="nav-item">Login</Link>)
    }else{
        showEl = (
            <li className="nav-item dropdown ">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-user"></i> </a>
                <ul className='dropdown-menu' >
                    <li className="dropdown-item">
                        <Link className="btn btn-light"  to='profile/update'>{userInfo.username}</Link>
                    </li>
                    <li className="dropdown-item">
                        <button className="btn btn-light"  onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </li>
        )
    }
    return(
        <ul>
        {showEl}
        </ul>
    )
}