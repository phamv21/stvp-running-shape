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
                <div className="card text-center" style={{"width": "18rem"}} key={idx}>
                    {el.avatar == '' ? (<div className="card-img-top"><i className="fa fa-user fa-5x" aria-hidden="true"></i></div>):(
                        <img className="card-img-top " src={el.avatar} alt="avatar" />
                    )}
                    <div className="card-body">
                        <h5 className="card-title">{el.username} </h5>
                        

                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary" onClick={e => {e.preventDefault(); handleMakeFriend(el.id);}} >Add Friend</button>
                    </div>
                </div>
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
        <ul className="d-flex flex-row p-2">
            {searchResult}
        </ul>

        </div>
    )

    

}
