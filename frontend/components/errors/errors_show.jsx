import React from "react";
import { useEffect } from "react";
export function ErrorShow({errors}){
    return(
        <div className="errors-show text-center">
            {errors.map((el,idx)=>(<h4 key={idx}>{el}</h4>))}
        </div>
    )
}