import React from "react";
import { Routes,Route } from "react-router-dom";
import LoginFormContainer from "./login/login_form_container";
import SignupFormContainer from "./login/sigup_form_container";
import { AuthRoute,ProtectedRoute } from "../utils/route_util";
import HomeContainer from "./nav-bar/home_container";
import CreateMapContainer from "./running-routes/create_map_container";
import ShowMapContainer from "./running-routes/show_map_container";
import IndexRoutesContainer from "./running-routes/index_routes_container";
export default function App(){
    return(
        <Routes>

            <Route exact path="/" element={<HomeContainer/>}/>
            <Route exact path="/login" element={
                <AuthRoute>
                    <LoginFormContainer/>
                </AuthRoute>
            }/>
            <Route exact path="/signup" element={
                <AuthRoute>
                    <SignupFormContainer/>
                </AuthRoute>
            }/>
            <Route path='map' element={<CreateMapContainer/>}/>
            <Route path='routes' element={<IndexRoutesContainer/>}></Route>
            <Route path='routes'>
                <Route path=":id" element={<ShowMapContainer/>} />
            </Route>
        </Routes>
    )
}