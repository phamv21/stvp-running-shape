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

import CommunityContainer from "./community/community_container";
import ActivityFormContainer from "./dashboard/activity_form_container";
import FeedContainer from "./community/feed_container";
import ActivityShowContainer from "./dashboard/activity_show_container";
import UserFeedContainer from "./community/user_feed_container";
import NotFound from "./404/404";
import SearchRouteContainer from "./running-routes/search_route_container";
import UpdateProfileFormContainer from "./login/update_profile_form_container";
import StaticContainer from "./static/static_container";
import DashboardContainer from "./dashboard/dashboard_container";
export default function App(){
    return(
        <>
        <header>
            <HomeContainer/>
        </header>
        <ErrorsShowContainer/>
        <Routes>
            <Route path="/" element={
                <StaticContainer/>
            }/>
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
            
            <Route exact path='/profile/update' element={
                <ProtectedRoute>
                    <UpdateProfileFormContainer/>
                </ProtectedRoute>
            }/>

            <Route exact path='/routes/search' element={
                <ProtectedRoute>
                    <SearchRouteContainer/>
                </ProtectedRoute>
            }/>

            <Route  path='*' element={
                    <NotFound/>
            }/>


            <Route exact path='/routes/create' element={
                <ProtectedRoute>
                    <CreateMapContainer/>
                </ProtectedRoute>
            }/>

            <Route exact path="/activities/create" element={
                <ProtectedRoute>
                    <ActivityFormContainer/>
                </ProtectedRoute>
            }>
                <Route path=':route_id' element={
                    <ProtectedRoute>
                        <ActivityFormContainer/>
                    </ProtectedRoute>
                } ></Route>
            </Route>
            <Route exact path="/activities" element={
                <ProtectedRoute>
                    <DashboardContainer/>
                </ProtectedRoute>
            }/>

             <Route path='/activities'>
                <Route path=":id" element={
                <ProtectedRoute>
                    <ActivityShowContainer/>
                </ProtectedRoute>
                } />
            </Route>

                <Route path='/profile'>
                <Route path=":user_id/activity_feed" element={
                <ProtectedRoute>
                    <UserFeedContainer/>
                </ProtectedRoute>
                } />
            </Route>


            <Route exact path="/community/feed" element={
                <ProtectedRoute>
                    <FeedContainer/>
                </ProtectedRoute>
            }/>


            <Route path='/routes' element={
                    <ProtectedRoute>
                        <IndexRoutesContainer/>
                    </ProtectedRoute>
                }>

            </Route>
            <Route path='/routes'>
                <Route path=":id" element={
                <ProtectedRoute>
                    <ShowMapContainer/>
                </ProtectedRoute>
                } />
            </Route>
            <Route path="/community/*" element={<CommunityContainer/>}>
            
            </Route>

            
        </Routes>
    <footer className="footer fixed-bottom bg-transparent" style={{'left':'unset','right':'0'}}>
        <div className="container">
            <a style={{'color':'black'}} className="btn btn-link" type='button' href="https://www.github.com/phamv21/stvp-running-shape"><i className="fa-brands fa-github fa-3x"></i></a>
        </div>
    </footer>
        </>

        
    )
}