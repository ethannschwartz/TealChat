const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const { Server } = require('socket.io');
const login = require('./routes/login');
const register = require('./routes/register');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

const server = http.createServer(app);

// Configuring socket.io
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

app.use('/register', register)

app.use('/login', login);

server.listen(3001, () => console.log(`You are listening on localhost:3001!`));