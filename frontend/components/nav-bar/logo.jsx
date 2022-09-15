import React from "react";
import { Link } from "react-router-dom";
export default function Logo(){
    return(
        <Link className="navbar-brand" to="/">
            <strong>Map-N-Run</strong>
        </Link>
        
    )
}