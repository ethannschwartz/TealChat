export const handleLogin = async (data) => {
    try {
        await fetch(`http://localhost:3001/login`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(user => {
                if( (user.username === data.username) &&
                    (user.password === data.password))
                {
                    sessionStorage.setItem('user_id', user.user_id);
                    sessionStorage.setItem('firstname', user.firstname);
                    sessionStorage.setItem('lastname', user.lastname);
                    sessionStorage.setItem('username', user.username);
                }
            })
        }
    catch (err) {
        console.error(err);
    }
}