export const handleRegister = async (data) => {
    try {
        await fetch(`http://localhost:3001/user`, {
            method:'POST',
            headers: {
                'accept':'application/json',
                'content-type':'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }
    catch (err) {
        console.error(err);
    }
}
