import React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
export default function FindPeople(val){
    const props = val.props

    const [query,setQuery] = useState('');
    const [validateSearch, setValidateSearch] = useState('hidden');
    const [submitted,setSubmitted] = useState(false);
  
    function handleQuery(e){
        e.preventDefault();
        setSubmitted(false);
        setQuery(e.target.value);
        
    }

    function handleSubmit(e){
        e.preventDefault();
        if(query == ''){
            setValidateSearch('text-danger');
        }else{
            setSubmitted(true);
            props.findPeople(query);
        }
        
    }

    function handleMakeFriend(id){
           props.makeFriend(id)
    }


    const searchResult = props.nonRelationship.length == 0 && submitted ? (<p className="text-secondary">No Result</p>) : 
    props.nonRelationship.map((el,idx) => {
        if(el != null){
            return(
                <li key={idx}>
                     {el.username}
                     <button onClick={e => {e.preventDefault(); handleMakeFriend(el.id);}} >Add Friend</button>
                </li>
            )
        }
        
    })
    let searchValidate = query == '' ? (<span className={validateSearch}>You can not leave search field empty!</span>) : null
        return (

        <div>
        <form >
            <div className="form-inline">
            <input className="form-control mr-sm-2" id="search-friend-field" type="search" value={query} onChange={handleQuery} placeholder='Search'/>
            {searchValidate}
            </div>
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleSubmit} >Search</button>
        </form>
        <ul>
            {searchResult}
        </ul>

        </div>
    )

    

}
