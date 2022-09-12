import React from "react";
import { Link } from "react-router-dom";
import Logo from "./logo";
import StaticNav from "./static-nav";
import ProfileControl from "./profile-control";

export default function Home({loggedIn,userInfo,logout,loading}){
    return(
        <nav className="navbar navbar-expand-lg bg-light rounded">
            <div className="container-fluid">
            <Logo/>
             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggle-menu" aria-controls="toggle-menu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="toggle-menu">
            <StaticNav loading={loading}/>
            <ProfileControl loggedIn={loggedIn} userInfo={userInfo} logout={logout}/>
            </div>
            
            </div>
        </nav>
    )
}