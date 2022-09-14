import React from "react";
import {useState} from 'react';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { signup } from "../../actions/session_actions";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

export default function SignupForm({submit,loading}){
    const dispatch = useDispatch();

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [gender,setGender] = useState(null)
    const [password,setPassword] = useState('');
    const [birthday,setBirthday] = useState(new Date())
    const [avatarUrl,setAvatarUrl] = useState('');
    const [avatarFile,setAvatarFile] = useState(null);
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
    function handleAvatar(e){
        e.preventDefault()
        const reader = new FileReader();
        const file = e.currentTarget.files[0];
        reader.onloadend = () =>{
            setAvatarFile(file);
            setAvatarUrl(reader.result);
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setAvataFile(null);
            setAvataUrl('');
        }

    }

    function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('user[username]',username);
        formData.append('user[email]',email);
        formData.append('user[password]',password);
        formData.append('user[gender]',gender);
        formData.append('user[birthday]',birthday);
        if(avatarFile != null){
            formData.append('user[avatar]',avatarFile);
        }
        submit(formData);
    }
    let submitBtnClass = !loading ? "w-100 btn btn-lg btn-primary" : "w-100 btn btn-lg btn-secondary disabled"

    console.log(avatarFile)
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
            <div className="form-floating">
                <input id="avatar" className="form-control" type="file" name="avatar" accept="image/*"  onChange={handleAvatar} placeholder='Upload your Avatar'/>
                {avatarUrl != '' ? (<img className="route-thumb" src={avatarUrl} />) : null }
                <label htmlFor="avatar">Upload Your Avatar</label>
            </div>
            
            
            <div onChange={handleGender}>
                <div className="form-check form-check-inline">
                    <input className="form-check-input"  type="radio" name="gender" value='Male' id="male-check"/> 
                    <label className="form-check-label"  htmlFor="male-check">Male</label>
                </div>
                <div className="form-check form-check-inline">
                    <input  className="form-check-input"  type="radio" name="gender" value='Female' id='female-check'/>
                    <label className="form-check-label"  htmlFor="female-check">Female</label> 
                </div>
                <div className="form-check form-check-inline">
                    <input  className="form-check-input" type="radio" name="gender" value='None' id='none-check'/>
                    <label className="form-check-label"  htmlFor="none-check">Other</label>
                </div>

            </div>
            
            <DatePicker selected={birthday} onChange={(date) => setBirthday(date)} />
            <input className={submitBtnClass} type="submit" value="Signup" />
            <Link className="w-100 btn btn-lg btn-primary" to="/login">Login Page</Link>

        </form>
        </main>
        </div>
        
    )
}