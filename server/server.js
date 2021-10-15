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

io.on('connection', socket => {
  socket.on("join-room", roomID => {
      console.log("Room ID:", roomID)
  });

});



server.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))
