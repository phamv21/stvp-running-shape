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
        showEl = (<Link to='/login'>Login</Link>)
    }else{
        showEl = (
                <ul className="profile-btn" onClick={handleMouse}>
            <i className="fa-solid fa-user"></i>
            <li >
                <ul className={subBtnClass}>
                    <li>
                        {userInfo.username}
                    </li>
                    <li>
                        <button className="small-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </li>
        </ul>
        )
    }
    return(
        <>
        {showEl}
        </>
    )
}