const express = require('express');
const knex = require("../knex");
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let router = express.Router();
const JWT_ALGORITHM = "HS256";
const JWTSecret = 'jwtsecretplzchange';

router.post('/' , async (req, res) => {
    const { username, password } = req.body;

    const user = await knex.db('users')
        .select('username', 'firstname', 'lastname', 'user_id')
        .where({ username: username, password: password,});
    if(!user) {
        res.status(400).json({ error: 'User does not exist.' })
    }

    const dbPassword =  user.password;
    bcrypt.compare(password, dbPassword, (res) => {
        if(!res) {
            return res
                .status(400)
                .json({ error: "Wrong username or password."});
        } else {
            const accessToken = JWT.sign(JSON.stringify(user), JWTSecret, {
                algorithm: JWT_ALGORITHM,
            });

            res.cookie("jwt", accessToken, { httpOnly: true });

            return accessToken;
        }
    });
    res.json("User logged in.");
});

module.exports = router;