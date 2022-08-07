import React from "react";
import {useState} from 'react';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { signup } from "../../actions/session_actions";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

export default function SignupForm({submit}){
    const dispatch = useDispatch();

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [gender,setGender] = useState(null)
    const [password,setPassword] = useState('');
    const [birthday,setBirthday] = useState(new Date())
    
    function handleGender(e){
        e.preventDefault();
        setGender(e.target.value)
    }
    function handleUsername(e){
        e.preventDefault();
        setUsername(e.target.value)
    }
    function handlePassword(e){
        e.preventDefault();
        setPassword(e.target.value)
    }
    function handleEmail(e){
        e.preventDefault();
        setEmail(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();
        let data = {username,email,password,gender,birthday};
        submit(data);
    }

     return(
        <div className="text-center">
            <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please Fill Your Info</h1>
          
            <div className="form-floating">
                <input id="username" className="form-control" type="text" name="username" value={username} onChange={handleUsername} placeholder='Username'/>
                <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating">
                <input id="email" className="form-control" type="email" name="email" value={email} onChange={handleEmail} placeholder='Email'/>
                <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating">
                <input id="password" className="form-control" type="password" name="password" value={password} onChange={handlePassword} placeholder='Password'/>
                <label htmlFor="password">Password</label>
            </div>
            
            
            <div className="form-check" onChange={handleGender}>
            <input className="form-check-input"  type="radio" name="gender" value='Male'/> Male
            <input  className="form-check-input"  type="radio" name="gender" value='Female'/> Female
            <input  className="form-check-input" type="radio" name="gender" value='None'/> Other
            </div>
            
            <DatePicker selected={birthday} onChange={(date) => setBirthday(date)} />
            <input className="w-100 btn btn-lg btn-primary" type="submit" value="Signup" />
            <Link className="w-100 btn btn-lg btn-primary" to="/login">Login Page</Link>

        </form>
        </main>
        </div>
        
    )
}