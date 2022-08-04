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

        let showEl = this.props.loading ? (<div className="full-loading"><div className="lds-ripple"><div></div><div></div></div></div>) : (<ul>{routeEl}</ul>)

        return(
            <>
                {showEl}
            </>
        )
    }
}