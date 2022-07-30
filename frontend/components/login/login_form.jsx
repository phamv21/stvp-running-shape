import React from "react";
import { useState } from "react";


export default function loginForm({submit}){
    
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');


    function handleSubmit(e){
        e.preventDefault();
        let data = {username,password}
        submit(data)
    }



    return(
        <form onSubmit={handleSubmit} className='login-form'>
            <input type="text" name="username" value={username} onChange={(e)=>{e.preventDefault; setUsername(e.target.value)}} placeholder='Username'/>
            <input type="password" name="password" value={password} onChange={e => {e.preventDefault(); setPassword(e.target.value)}} placeholder='Password'/>
            <input type="submit" value="Submit" />
        </form>
    )
}
