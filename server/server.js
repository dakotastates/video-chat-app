const express = require('express');
const app = express()
const cors = require('cors');
const server = require('http').createServer(app);
const socket = require("socket.io");
const PORT = process.env.PORT || 4000;


const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})
// middleware
app.use(cors());

app.use(express.json());

// routes

app.get('/', (reg, res) => {
  res.send('Server is Running!');
})

// register and login routes
app.use('/auth', require('./routes/login'));

// Dashboard Route
app.use('/dashboard', require('./routes/dashboard'));

// Web Socket

const users = {};

const socketToRoom = {};

io.on('connection', socket => {
  socket.on("join-room", roomID => {
    if (users[roomID]) {
        const length = users[roomID].length;
        if (length === 4) {
            socket.emit("room full");
            return;
        }
        users[roomID].push(socket.id);
    } else {
        users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

    socket.emit("all users", usersInThisRoom);
    });

  socket.on("sending-signal", payload => {
    io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
  });

});



server.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))
