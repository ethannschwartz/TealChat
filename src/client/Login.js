import React from "react";
import { useNavigate } from "react-router";
import { useState } from 'react';
import {Link} from "react-router-dom";

const Login = () => {
    let navigate = useNavigate();
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        let returningUser = {username, password};
        fetch(`http://localhost:3001/login`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(returningUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if( (data.username === returningUser.username) &&
                    (data.password === returningUser.password))
                {
                    sessionStorage.setItem('user_id', data.user_id);
                    sessionStorage.setItem('firstname', data.firstname);
                    sessionStorage.setItem('lastname', data.lastname);
                    sessionStorage.setItem('username', data.username);
                    navigate('/home');
                } else {
                    return null;
                }
                console.log(data);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='bg-teal-600 w-screen h-screen flex flex-col justify-center'>
            <form className={'bg-white w-96 h-fit rounded-md flex m-auto' +
                ' shadow-2xl flex-col justify-evenly p-8'}>
                <h1 className={'text-3xl text-slate-600 my-2'}>Login Page</h1>
                <input type="text"
                       placeholder={'Username'}
                       onChange={(e) => setUsername(e.target.value)}
                       className={'p-2 border rounded-md my-2 outline-none duration-300 focus:border-pink-400'}
                />
                <input type="password"
                       placeholder={'Password'}
                       onChange={(e) => setPassword(e.target.value)}
                       className={'p-2 border rounded-md my-2 outline-none duration-300 focus:border-pink-400'}
                />
                <button onClick={handleLogin}
                        className={'text-lg text-white bg-pink-600 p-2' +
                            ' rounded-md duration-200 my-2 hover:bg-pink-700'}>Login</button>
                <Link to={'/register'}
                      className={'text-blue-600 underline'}>Need to sign up? Create an account here.</Link>
            </form>
        </div>
    );
}
export default Login;