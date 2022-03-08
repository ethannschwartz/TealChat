import React from "react";
import {Link} from "react-router-dom";
import {handleLogin} from "../api/Login";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const loginMutation = useMutation(handleLogin, {
        onSuccess: () => {
            console.log('success');
        },
    });

    const onSubmit = (data) => {
        loginMutation.mutate(data);
    };

    console.log(errors);

    return (
        <div className='bg-teal-600 w-screen h-screen flex flex-col justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className={'bg-white w-96 h-fit rounded-md flex m-auto shadow-2xl flex-col justify-evenly p-8'}>
                <h1 className={'text-3xl text-slate-600 my-2'}>Login Page</h1>
                <input type="text"
                       {...register('username', {required:'This field is required.', minLength:1})}
                       placeholder={'Username'}
                       className={'p-2 border rounded-md my-2 outline-none duration-300 focus:border-pink-400'}
                />
                <input type="password"
                       {...register('password', {required:'This field is required.', minLength:1})}
                       placeholder={'Password'}
                       className={'p-2 border rounded-md my-2 outline-none duration-300 focus:border-pink-400'}
                />
                <button type={'submit'} className={'text-lg text-white bg-pink-600 p-2 rounded-md duration-200 my-2 hover:bg-pink-700'}>Login</button>
                <Link to={'/register'} className={'text-blue-600 underline'}>Need to sign up? Create an account here.</Link>
            </form>
        </div>
    );
};
export default Login;