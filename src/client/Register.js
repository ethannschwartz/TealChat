import { useNavigate } from "react-router";
import { useState } from "react";
import {Link} from "react-router-dom";

const Register = () => {
    let navigate = useNavigate();
    let [firstname, setFirstname] = useState('');
    let [lastname, setLastname] = useState('');
    let [email, setEmail] = useState('');
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let newUser = {
            firstname,
            lastname,
            email,
            username,
            password,
        };
        fetch(`http://localhost:3001/user`, {
            method:'POST',
            headers: {
                'accept':'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log('data', data);
                navigate("/login");
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='bg-teal-600 w-screen h-screen flex flex-col justify-center'>
            <form className={'bg-white w-96 h-fit rounded-md flex m-auto' +
                ' flex-col justify-evenly p-8 shadow-2xl'}>
                <h1 className={'text-3xl text-slate-600 my-2'}>Registration Page</h1>
                <input type="text"
                       placeholder={'First Name'}
                       onChange={(e) => setFirstname(e.target.value)}
                       className={'p-2 border outline-none rounded-md my-2 duration-300 focus:border-pink-400'}
                />
                <input type="text"
                       placeholder={'Last Name'}
                       onChange={(e) => setLastname(e.target.value)}
                       className={'p-2 border outline-none rounded-md my-2 duration-300 focus:border-pink-400'}
                />
                <input type="email"
                       placeholder={'Email'}
                       onChange={(e) => setEmail(e.target.value)}
                       className={'p-2 border outline-none rounded-md my-2 duration-300 focus:border-pink-400'}
                />
                <input type="text"
                       placeholder={'Username'}
                       onChange={(e) => setUsername(e.target.value)}
                       className={'p-2 border outline-none rounded-md my-2 duration-300 focus:border-pink-400'}
                />
                <input type="password"
                       placeholder={'Password'}
                       onChange={(e) => setPassword(e.target.value)}
                       className={'p-2 border outline-none rounded-md my-2 duration-300 focus:border-pink-400'}
                />
                <button onClick={handleSubmit}
                        className={'text-lg text-white outline-none duration-200 bg-pink-600 p-2 rounded-md my-2' +
                            ' hover:bg-pink-700'}>Register</button>
                <Link to={'/login'}
                      className={'text-blue-600 underline'}>Already have an account? Login here.</Link>
            </form>
        </div>
    );
}

export default Register;