import React from "react";
import { Routes,Route } from "react-router-dom";
import LoginFormContainer from "./login/login_form_container";
import SignupFormContainer from "./login/sigup_form_container";
import { AuthRoute,ProtectedRoute } from "../utils/route_util";
import HomeContainer from "./nav-bar/home_container";
import CreateMapContainer from "./running-routes/create_map_container";
import ShowMapContainer from "./running-routes/show_map_container";
import IndexRoutesContainer from "./running-routes/index_routes_container";
import ErrorsShowContainer from "./errors/errors_show_container";
export default function App(){
    return(
        <>
        <header>
            <HomeContainer/>
        </header>
        <ErrorsShowContainer/>
        <Routes>
            
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
            <Route path='map' element={
                <ProtectedRoute>
                    <CreateMapContainer/>
                </ProtectedRoute>
            }/>
            <Route path='routes' element={
                    <ProtectedRoute>
                        <IndexRoutesContainer/>
                    </ProtectedRoute>
                }>

            </Route>
            <Route path='routes'>
                <Route path=":id" element={
                <ProtectedRoute>
                    <ShowMapContainer/>
                </ProtectedRoute>
                } />
            </Route>
            
        </Routes>
        </>

        
    )
}