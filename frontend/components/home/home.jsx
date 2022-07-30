import React from "react";
import { Link } from "react-router-dom";
export default function Home({loggedIn,userInfo,logout}){
    let banner = null;

    if(loggedIn){
        banner = (
            <nav className="user-banner">
                <h1>Hello ${userInfo.username}</h1>
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
        <div>
            <h1>
                Home
                {banner}
            </h1>
        </div>
    )
}