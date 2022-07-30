import React from "react";
import {useState} from 'react';
import { useDispatch } from "react-redux";
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
        <form onSubmit={handleSubmit} className='login-form'>
            <input type="text" name="username" value={username} onChange={handleUsername} placeholder='Username'/>
            <input type="text" name="email" value={email} onChange={handleEmail} placeholder='Email'/>
            <div onChange={handleGender}>
            <input type="radio" name="gender" value='Male'/> Male
            <input type="radio" name="gender" value='Female'/> Female
            <input type="radio" name="gender" value='None'/> Other
            </div>
            <input type="password" name="password" value={password} onChange={handlePassword} placeholder='Password'/>
            <DatePicker selected={birthday} onChange={(date) => setBirthday(date)} />
            <input type="submit" value="Submit" />
        </form>
    )
}