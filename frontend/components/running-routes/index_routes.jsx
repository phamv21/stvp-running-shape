import React from "react";
import { useEffect } from "react";
import IndexRouteElement from "./index_route_element";
import { Link } from "react-router-dom";
export default class IndexRoutes extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchRoutes();
    }

    


    render(){
      
      const loadingContent =(
        <>
            <tr>
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
                <td className="placeholder-glow col-2">
                    <span className="placeholder col-12"></span>
                </td >
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
                <td className="placeholder-glow col-2">
                    <span className="placeholder col-12"></span>
                </td>
                <td className="placeholder-glow col-1">
                    <span className="placeholder col-12"></span>
                </td>
            </tr>
            <tr>
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
                <td className="placeholder-glow col-2">
                    <span className="placeholder col-12"></span>
                </td >
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
                 <td className="placeholder-glow col-2">
                    <span className="placeholder col-12"></span>
                </td>
                <td className="placeholder-glow col-1">
                    <span className="placeholder col-12"></span>
                </td>
            </tr>
            <tr>
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
                <td className="placeholder-glow col-2">
                    <span className="placeholder col-12"></span>
                </td >
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
                 <td className="placeholder-glow col-2">
                    <span className="placeholder col-12"></span>
                </td>
                <td className="placeholder-glow col-1">
                    <span className="placeholder col-12"></span>
                </td>
            </tr>
            <tr>
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
                <td className="placeholder-glow col-2">
                    <span className="placeholder col-12"></span>
                </td >
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
                <td className="placeholder-glow col-3">
                    <span className="placeholder col-12"></span>
                </td>
                 <td className="placeholder-glow col-2">
                    <span className="placeholder col-12"></span>
                </td>
            </tr>
        </>     
    )

        let routes = this.props.routes;
        let routeEl = routes.map((el,idx) => <IndexRouteElement key={idx} route={el}/> )
        if(this.props.loading == false && routeEl.length == 0){routeEl = ( <tr><td><Link to='/map'>No Route, Click to create your first route</Link></td></tr> )}
        let showEl = this.props.loading ? (loadingContent
    ) : ( 
        <>{routeEl}</>
        )


    return(   
       <table className="table table-hover" >
        <thead>
            <tr>
                <th scope="col">
                    Route Name
                </th>
                <th scope="col">
                    Distance
                </th>
                <th scope="col">
                    City
                </th>
                <th scope="col">
                    Created
                </th>
                <th scope="col">
                    Visibility
                </th>
            </tr>
        </thead>
        <tbody>
          {showEl}
        </tbody>
        </table>
       

        )
    }
}