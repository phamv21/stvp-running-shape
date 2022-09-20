import React from "react";
import { Routes,Route, Link, NavLink } from "react-router-dom";
import SendedRequest from "./sended_request";
import FindPeople from "./find_people";
import Friends from "./friends";
import PendingRequest from "./pending";
import { ProtectedRoute } from "../../utils/route_util";

export default function Community(props){
    const navBaseClass = 'nav-item nav-link'
     useEffect(()=>{
        document.title = 'Community'
    },[])
    return(
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-nav nav-tabs">
            <NavLink  className={({isActive})=> isActive ? navBaseClass + ' active' : navBaseClass } to="/community/friends">Friends </NavLink>
            <NavLink className={({isActive})=> isActive ? navBaseClass + ' active' : navBaseClass} to="/community/find-friends">Find Friends</NavLink>
            </div>
         </nav>
            <Routes>
            <Route exact path="/friends" element={
                <ProtectedRoute>
                    <PendingRequest props={props}/>
                    <Friends props={props}/>
                </ProtectedRoute>
            }/>
            <Route exact path="/find-friends" element={
                 <ProtectedRoute>
                    <FindPeople props={props}/>
                    < SendedRequest props={props}/>
                </ProtectedRoute>
            }/>
            </Routes>
        </div>



    )

}