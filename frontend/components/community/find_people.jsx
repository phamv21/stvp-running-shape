import React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
export default function FindPeople(val){
    const props = val.props
    const [query,setQuery] = useState('')
  
    function handleQuery(e){
        e.preventDefault();
        setQuery(e.target.value)
        
    }

    function handleSubmit(e){
        e.preventDefault();
        props.findPeople(query);
    }

    function handleMakeFriend(id){
           props.makeFriend(id)
    }


    const searchResult = props.nonRelationship.map((el,idx) => {
        if(el != null){
            return(
                <li key={idx}>
                     {el.username}
                     <button onClick={e => {e.preventDefault(); handleMakeFriend(el.id);}} >Add Friend</button>
                </li>
            )
        }
        
    })
        return (

        <div>
        <form >
            <input type="text" value={query} onChange={handleQuery} />
            <button onClick={handleSubmit} >Search</button>
        </form>
        <ul>
            {searchResult}
        </ul>

        </div>
    )

    

}
