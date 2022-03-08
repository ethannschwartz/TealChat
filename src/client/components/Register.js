import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom";
import {handleRegister} from "../api/Register";

const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();
    console.log(errors);

    return (
        <div className='bg-teal-600 w-screen h-screen flex flex-col justify-center'>
            <form onSubmit={handleSubmit((data) => handleRegister(data).then((e) => {
                e ? navigate('/register') && console.log(e) : navigate('/login') && console.log(e);
            }))}
                  className={'bg-white w-96 h-fit rounded-md flex m-auto flex-col justify-evenly p-8 shadow-2xl'}>
                <h1 className={'text-3xl text-slate-600 my-2'}>Registration Page</h1>
                <input type="text"
                       {...register('firstname', {required:'This field is required.', minLength:2})}
                       placeholder={'First Name'}
                       className={'p-2 border outline-none rounded-md my-2 duration-300 focus:border-pink-400'}
                />
                <input type="text"
                       {...register('lastname', {required:'This field is required.', minLength:2})}
                       placeholder={'Last Name'}
                       className={'p-2 border outline-none rounded-md my-2 duration-300 focus:border-pink-400'}
                />
                <input type="text"
                       {...register('username', {required:'This field is required.', minLength:8, maxLength:16})}
                       placeholder={'Username'}
                       className={'p-2 border outline-none rounded-md my-2 duration-300 focus:border-pink-400'}
                />
                <input type="password"
                       {...register('password', {required:'This field is required.', minLength:8, maxLength:16})}
                       placeholder={'Password'}
                       className={'p-2 border outline-none rounded-md my-2 duration-300 focus:border-pink-400'}
                />
                <button type={'submit'} className={'text-lg text-white outline-none duration-200 bg-pink-600 p-2 rounded-md my-2 hover:bg-pink-700'}>Register</button>
                <Link to={'/login'}
                      className={'text-blue-600 underline'}>Already have an account? Login here.</Link>
            </form>
        </div>
    );
}

export default Register;