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
    <tr>
      <td className="td-1"><span></span></td>
      <td className="td-2"><span></span></td>
      <td className="td-3"><span></span></td>
      <td className="td-4"></td>
      <td className="td-5"><span></span></td>
    </tr>
    <tr>
      <td className="td-1"><span></span></td>
      <td className="td-2"><span></span></td>
      <td className="td-3"><span></span></td>
      <td className="td-4"></td>
      <td className="td-5"><span></span></td>
    </tr>
    <tr>
      <td className="td-1"><span></span></td>
      <td className="td-2"><span></span></td>
      <td className="td-3"><span></span></td>
      <td className="td-4"></td>
      <td className="td-5"><span></span></td>
    </tr>
    <tr>
      <td className="td-1"><span></span></td>
      <td className="td-2"><span></span></td>
      <td className="td-3"><span></span></td>
      <td className="td-4"></td>
      <td className="td-5"><span></span></td>
    </tr>
    <tr>
      <td className="td-1"><span></span></td>
      <td className="td-2"><span></span></td>
      <td className="td-3"><span></span></td>
      <td className="td-4"></td>
      <td className="td-5"><span></span></td>
    </tr>
    <tr>
      <td className="td-1"><span></span></td>
      <td className="td-2"><span></span></td>
      <td className="td-3"><span></span></td>
      <td className="td-4"></td>
      <td className="td-5"><span></span></td>
    </tr>
    <tr>
      <td className="td-1"><span></span></td>
      <td className="td-2"><span></span></td>
      <td className="td-3"><span></span></td>
      <td className="td-4"></td>
      <td className="td-5"><span></span></td>
    </tr>
    <tr>
      <td className="td-1"><span></span></td>
      <td className="td-2"><span></span></td>
      <td className="td-3"><span></span></td>
      <td className="td-4"></td>
      <td className="td-5"><span></span></td>
    </tr><tr>
      <td className="td-1"><span></span></td>
      <td className="td-2"><span></span></td>
      <td className="td-3"><span></span></td>
      <td className="td-4"></td>
      <td className="td-5"><span></span></td>
    </tr>
  </tbody>
        ) : (<tbody>{routeEl}</tbody>)

        return(
          
            <table>
        <thead>
            <tr>
                <th>
                    Route Name
                </th>
                <th>
                    Distance
                </th>
                <th>
                    City
                </th>
                <th>
                    Created
                </th>
                <th>
                    Visibility
                </th>
                <th>
                    Action
                </th>
            </tr>
        </thead>
            {showEl}
    </table>
        )
    }
}