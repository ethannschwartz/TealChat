import Axios from "axios";

export const handleLogin = async (data) => {
    const response = await Axios.post('http://localhost:3001/login', {
        username: data.username,
        password: data.password,
    });
    console.log('response:', response);

    return response;
};
