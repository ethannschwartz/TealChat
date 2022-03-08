const { sign, verify } = require('jsonwebtoken');
const JWTSecret = 'jwtsecretplzchange'

const createTokens = (user) => {
    const accessToken = sign({
        id: user.user_id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
    }, JWTSecret);

    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if(!accessToken){
        return res.status(400).json({ error: "User not authenticated." });
    }

    try {
        const validToken = verify(accessToken, JWTSecret);

        if(validToken) {
            req.authenticated = true;
            return next();
        }

    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

module.exports = { createTokens, validateToken };