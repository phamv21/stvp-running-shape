import React from "react";
import { Link } from "react-router-dom";
import Logo from "./logo";
import StaticNav from "./static-nav";
import ProfileControl from "./profile-control";

export default function Home({loggedIn,userInfo,logout}){
    return(
        <nav className="home-nav">
            <Logo/>
            <StaticNav/>
            <ProfileControl loggedIn={loggedIn} userInfo={userInfo} logout={logout}/>
        </nav>
    )
}