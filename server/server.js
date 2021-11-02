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
// urs=[]
const messages = {};

const socketToRoom = {};

io.on('connection', (socket) => {
  socket.on('join-room', (roomID, username) =>{
    const userObj = {
      id: socket.id,
      username: username
    }
    // socket.join(roomID);
    if (users[roomID]) {

        const length = users[roomID].length;
        if (length === 4) {
            socket.emit("room full");
            return;
        }
        // users[roomID].push(socket.id);
        users[roomID].push(userObj);

    } else {
        // users[roomID] = [socket.id];
        users[roomID] = [userObj];

    }

    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter(user => user.id !== socket.id);

    // urs.push(socket.id)
    // console.log(usersInThisRoom)
    socket.emit("all users", usersInThisRoom);
    // socket.to(roomID).emit("all users", urs);
    io.emit("participants", users[roomID]);

    // Creating Chat Messages

    socket.on('message', payload =>{
      const messageObj = {message: payload.message, username: payload.username, id: socket.id}

      if (messages[roomID]) {
        messages[roomID].push(messageObj);
      }else{
        messages[roomID] = [messageObj];
      }

      console.log(messages[roomID])
      // send back to room
      // socket.emit('messages', payload.message)
      io.emit('messages', messages[roomID])
    })

  })

  socket.on("sending signal", payload => {
    io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
  });

  socket.on("returning signal", payload => {
    io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
  });

  socket.on('disconnect', () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
        // room = room.filter(id => id !== socket.id);
        room = room.filter(user => user.id !== socket.id);
        users[roomID] = room;
    }
    socket.broadcast.emit('user left', socket.id);
    // socket.emit('user left', socket.id);

  });
})



server.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))
