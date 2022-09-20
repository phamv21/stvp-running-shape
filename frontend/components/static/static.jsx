import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Static(props){
    useEffect(()=>{
        props.fetchImages()
        document.title ='Home Page'
    },[])
    return(
        props.images ? 
    (
    <div id="slide1" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src={props.images[0]} className="d-block w-100 opacity-75" alt="..."/>
                    <div className="container">
                        <div className="carousel-caption">
                        <h5 className="h1 shadow">Create Your Own Route!</h5>
                        <p className="shadow">You can design your own route to Run</p>
                        <p>
                        <Link className="btn btn-primary m-2" to='/routes/create'>Create Your Route</Link>
                        </p>
                        </div>
                    </div>
                    
            </div>

            <div className="carousel-item">
                <img src={props.images[1]} className="d-block w-100 opacity-75" alt="..."/>
                <div className="container">
                    <div className="carousel-caption">
                        <h5 className="h1 shadow opacity-100">Record Your Activity!</h5>
                        <p className="shadow opacity-100">Let's the World Know Your Great Achievement!!! </p>
                        <p>
                        <Link className="btn btn-primary m-2" to='/activities/create'>Record Your Activity</Link>
                        </p>
                    </div>
                </div>
                
            </div>
            <div className="carousel-item">
                <img src={props.images[2]} className="d-block w-100 opacity-75" alt="..."/>
                <div className="container">
                    <div className="carousel-caption">
                        <h1 className="h1 shadow">Be Competitive with Your Friends</h1>
                        <p className="shadow">Let's Find out the Activities of your Friends </p>
                        <p>
                        <Link className="btn btn-primary m-2" to='/community/feed'>Check Feed</Link>
                        </p>
                    </div>
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