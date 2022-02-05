import {useNavigate} from "react-router";

const Header = () => {
    const navigate = useNavigate();

    const logout = async () => {
        sessionStorage.clear();
        await navigate('/login');
    }

    return (
        <header className={'flex justify-between bg-teal-600'}>
            <h1 className={'text-3xl m-4 text-white'}>Teal<strong className={'bold'}>Chat</strong></h1>
            <span className={'flex justify-evenly'}>
                <h2 className={'text-2xl m-4 text-white'}>{`Hello ${sessionStorage.getItem('firstname')}`}</h2>
                <button onClick={logout} className={'bg-pink-600 m-4 text-white border px-2 rounded-md shadow-lg' +
                    ' duration-200' +
                    ' hover:scale-105'}>Log Out</button>
            </span>
        </header>
    )
}
export default Header;