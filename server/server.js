const express = require('express');
const app = express()
const cors = require('cors');
const server = require('http').createServer(app);
const PORT = process.env.PORT || 4000;


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



server.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))
