const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const knex = require('./knex');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: `http://localhost:3000 `,
        methods:["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join_room', (data) => {
        socket.join(data);
    });

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});

// Register.js line 35
app.post(`/user`, (req, res) => {
    knex.db('users')
        .insert({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
        })
        .then(() => res.send({success: true, message: 'User created'}))
        .catch(err => console.log(err));
});

// Login.js line 24
app.post(`/login`, (req, res) => {
    knex.db('users')
        .where({
            username: req.body.username,
            password: req.body.password,
        })
        .then(user => res.send(user[0]))
        .catch(err => console.log(err));
});

server.listen(3001, () => console.log(`You are listening on localhost:3001!`));