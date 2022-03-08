const express = require('express');
const knex = require("../knex");
const bcrypt = require('bcrypt');
let router = express.Router();

router.post('/', (req, res) => {
    const { firstname, lastname, username, password } = req.body;
    bcrypt.hash(password, 10).then(hash => {
        knex.db('users')
            .insert({
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: hash,
            })
            .then(() => res.send({success: true, message: 'User created'}))
            .catch(err => {
                if(err) {
                    res.status(400).json({error: err});
                }
            });
    });
});

module.exports = router;