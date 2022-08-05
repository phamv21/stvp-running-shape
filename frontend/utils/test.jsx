import React from "react";
import { useState } from "react";

export default function Test(){

    const [description,setDescription] = useState('')

    function handleChange(e){
        setDescription(e.target.value)
        console.log("this is react input",description)
    }

    return(
        <>
            <input type="text" value={description} onChange={handleChange} />
        </>
    )

}