export const handleRegister = async (data) => {
    try {
        const response = await fetch(`http://localhost:3001/user`, {
            method:'POST',
            headers: {
                'accept':'application/json',
                'content-type':'application/json',
            },
            body: JSON.stringify(data)
        });
        console.log(response);
    }
    catch (err) {
        console.error(err);
    }
}
