import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Static(props){
    // useEffect(()=>{
    //     props.fetchImages()
    // },[])
    return(
        props.images ? 
    (
    <div id="slide1" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src={window.run1Url} className="d-block w-100 opacity-75" alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5 className="h1 shadow">Create Your Own Route!</h5>
                        <p className="shadow">You can design your own route to Run</p>
                        <p>
                        <Link className="btn btn-primary m-2" to='/routes/create'>Create Your Route</Link>
                        </p>
                    </div>
            </div>

            <div className="carousel-item">
                <img src={window.run2Url} className="d-block w-100 opacity-75" alt="..."/>
                <div className="carousel-caption d-none d-md-block bg-secondary opacity-80">
                        <h5 className="h1 shadow opacity-100">Record Your Activity!</h5>
                        <p className="shadow opacity-100">Let's the World Know Your Great Achievement!!! </p>
                        <p>
                        <Link className="btn btn-primary m-2" to='/activities/create'>Create Your Route</Link>
                        </p>
                </div>
            </div>
            <div className="carousel-item">
                <img src={window.run3Url} className="d-block w-100 opacity-75" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                        <h5 className="h1 shadow">Be Competitive with Your Friends</h5>
                        <p className="shadow">Let's Find out the Activities of your Friends </p>
                        <p>
                        <Link className="btn btn-primary m-2" to='/community/feed'>Check Feed</Link>
                        </p>
                </div> 
            </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#slide1" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
                </button>

                <button className="carousel-control-next" type="button" data-bs-target="#slide1" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
                </button>
        </div>
    </div>
    ) : null
    )
}