import React from "react";


export default function SeachRouteElement(props){
    console.log(props)
    return(
        <div value={props.route.id} className='dropdown-item' onClick={e => {props.handleHighlight(props.route.id) }}>
                <img className="img-thumbnail super-small-img" src={props.route.thumb} alt="" />
                {props.route.name}
                {props.route.area_name}
        </div>
    )
}