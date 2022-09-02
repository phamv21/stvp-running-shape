import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Comment({activity,comments,createComment,fetchComments}){
    const [content,setContent] = useState('');
    const [loadMore,setLoadMore] = useState(false);

    

    let commentArr = comments[activity.id] == null ? null : Object.values(comments[activity.id]);
    const commentEl = commentArr == null ? null : commentArr.map((el,idx)=>(
        <div key={'c' +idx}>
            <Link to={`/profile/${el.user_id}/activity_feed`}>{el.author}</Link>
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
        setLoadMore(true);
        fetchComments(activity.id)
    }
    return (
        <div>
            {loadMore == false && activity.comment_count > 2 ? (<button onClick={handleLoadmore}> Load More</button>) : null }
            {commentEl}
            <form onSubmit={handleSubmit} >
                <input type="text" value={content} onChange={e=> {e.preventDefault(); setContent(e.target.value)}} />
                <button>POST</button>
            </form>
        </div>
    )


}