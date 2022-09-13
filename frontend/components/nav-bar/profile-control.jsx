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
        showEl = (<Link to='/login' className="nav-item" >Login</Link>)
    }else{
        showEl = (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown me-1 ">
                <button type="button" className="btn btn-secondary dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,100"><i className="fa-solid fa-user"></i> </button>
                <ul className='dropdown-menu' >
                    <li>
                        <Link className="dropdown-item"  to='profile/update'>{userInfo.username}</Link>
                    </li>
                    <li>
                        <a className="dropdown-item"  onClick={handleLogout}>
                            Logout
                        </a>
                    </li>
                </ul>
            </li>
            </ul>
        )
    }
    return(
        <ul>
        {showEl}
        </ul>
    )
}