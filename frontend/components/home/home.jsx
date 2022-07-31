import React from "react";
import { Link } from "react-router-dom";
export default function Home({loggedIn,userInfo,logout}){
    let banner = null;

    if(loggedIn){
        banner = (
            <nav className="user-banner">
                <h3>Hello {userInfo.username}</h3>
            <button onClick={(e)=>{e.preventDefault(); logout()}}>Logout</button>
            </nav>
        )
    }else{
        banner = (
            <nav className="user-banner">
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Signup</Link>
            </nav>
        )
    };
    return(
        <nav>
            {banner}
        </nav>
    )
}