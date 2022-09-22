
import React from "react";


export default function RouteElement({props,fnc,setIsShow,isShow}){
    return(
        <div value={props.id} className='dropdown-item' onClick={e => {fnc(e.target.getAttribute('value')); setIsShow(!isShow) }}>
                <img className="img-thumbnail super-small-img" src={props.thumb} alt="" />
                {props.name}:{props.area_name}:{(props.distance/1000)+' Km'}
        </div>
    )
}