import React from "react";
import { useEffect } from "react";
import IndexRouteElement from "./index_route_element";
export default class IndexRoutes extends React.Component{
    constructor(props){
        super(props)


    }

    componentDidMount(){
        this.props.fetchRoutes();
    }
    render(){
        let routes = this.props.routes;
        // console.log(routes);
        let routeEl = routes.map((el,idx) => <IndexRouteElement key={idx} route={el}/> )

        let showEl = this.props.loading ? (
    <tbody>
      <tr >
          <td>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          </td>
          <td>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          </td>
          <td>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          </td>
          <td>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          </td>
          <td>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          </td>
          <td>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          </td>
      </tr>
      <tr >
          <td>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          </td>
          <td>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          </td>
          <td>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          </td>
          <td>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          </td>
          <td>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          </td>
          <td>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          </td>
      </tr>
      <tr >
          <td>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          </td>
          <td>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          </td>
          <td>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          </td>
          <td>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          </td>
          <td>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          </td>
          <td>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
          </td>
      </tr>
    </tbody>
    ) : ( 
        <tbody>{routeEl}</tbody>
        )

    return(   
       <table className="table" >
        <thead className="thead-dark">
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
                <th scope="col">
                    Action
                </th>
            </tr>
        </thead>
        {showEl}
        </table>
       

        )
    }
}