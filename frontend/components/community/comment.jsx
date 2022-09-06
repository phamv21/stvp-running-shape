import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Comment({activity,comments,createComment,fetchComments,loading}){
    const [content,setContent] = useState('');
    const [loadedMore,setLoadedMore] = useState(false);

    

    let commentArr = comments[activity.id] == null ? null : Object.values(comments[activity.id]);
    const commentEl = commentArr == null ? null : commentArr.map((el,idx)=>(
        <div key={'c' +idx}>
            <Link to={`/profile/${el.user_id}/activity_feed`}>{el.author}</Link>
            <br />
            <span >{el.content}</span>
            <br />
        </div>
        

    ))
    function handleSubmit(e){
        e.preventDefault();
        createComment({activity_id:activity.id,content:content})
        setContent('');
    }
    function handleLoadmore(e){
        e.preventDefault();
        setLoadedMore(true);
        fetchComments(activity.id)
    }
    const loadMoreBtn = !loading ? (<button className="btn btn-link" onClick={handleLoadmore}> Load All Comments...</button>) :
    (<button className="btn btn-link disabled" > Fetching Comments...</button>)

    return (
        <div>
            { commentArr == null || activity.comment_count > commentArr.length ? (loadMoreBtn) : null }
            {commentEl}
            <form onSubmit={handleSubmit} >
                <input type="text" value={content} onChange={e=> {e.preventDefault(); setContent(e.target.value)}} />
                <button className="btn btn-primary">POST</button>
            </form>
        </div>
    )


}