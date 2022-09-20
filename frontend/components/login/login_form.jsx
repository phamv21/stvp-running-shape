import React from "react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";


export default function loginForm({submit}){
    
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault();
        let data = {username,password}
        submit(data).then(res => navigate('/activities'))
    }
    function handleDemo(e){
        e.preventDefault();
        let dataDemo = {username:'test',password:123456}
        submit(dataDemo).then(res => navigate('/activities'))
    }



    return(
        <div className="text-center">
            
        
        <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
                <input className="form-control" type="text" name="username1" value={username} onChange={(e)=>{e.preventDefault; setUsername(e.target.value)}} id="username" placeholder="Username" />
                <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating">
                <input className="form-control" type="password" name="password" value={password} onChange={e => {e.preventDefault(); setPassword(e.target.value)}}  id="password" placeholder='Password'/>
                <label htmlFor="password">Password</label>
                
            </div>
            
            <input className="w-100 btn btn-lg btn-primary" type="submit" value="Login" />
            <Link className="w-100 btn btn-lg btn-primary" to='/signup'> Create Account </Link>
            <input type='button' className="w-100 btn btn-lg btn-info" onClick={handleDemo} value="Login with Demo Account" />
            <p className="mt-5 mb-3 text-muted">Stephen 2022</p>
        </form>
        </main>
        </div>
    )
}
