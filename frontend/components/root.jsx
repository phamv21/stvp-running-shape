import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./app";
import { Wrapper, Status } from "@googlemaps/react-wrapper";



export default function Root({store}){
    return (
        <Provider store={store}>
            <HashRouter>
                    <App/>
            </HashRouter>
         </Provider> 

    )
}