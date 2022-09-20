import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Friends(val){
    const props = val.props
    useEffect(()=>{
        props.findFriends();
        document.title = 'Community'
    },[])
    const myFriends = props.friends.map((el,idx)=>{
        if(el != null){
        return (<div className="card text-center" style={{"width": "9rem"}} key={idx}>
                    <Link to={`/profile/${el.id}/activity_feed`}>
                    {el.avatar == null ? (<div className="card-img-top"><i className="fa fa-user fa-5x" aria-hidden="true"></i></div>):(
                        <img className="card-img-top " src={el.avatar} alt="avatar" />
                    )}
                    </Link>
                     
                    <div className="card-body">
                        <Link to={`/profile/${el.id}/activity_feed`}>  
                            <h5 className="card-title">{el.username} </h5>
                        </Link>
                    </div>
                    
                    <div className="card-footer">
                        <button onClick={e =>{e.preventDefault(); props.unFriend(el.id) }} className="btn btn-primary" > UnFriend</button>
                    </div>
                </div>)
        }

    })
    return(
        <ul className="d-flex flex-row p-2">
            { props.loading ? ( <p>Loading</p> ) : myFriends}
        </ul>
    )
}