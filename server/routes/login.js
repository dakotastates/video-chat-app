const router = require('express').Router();
const pool = require("../db");
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')
const authorization = require('../middleware/authorization')
const validate = require('../middleware/valid')


// registering

router.post('/register', validate ,async(req, res) =>{

  try {
    // 1. destructure the req.body (name, email, password)

    const { name, email, password } = req.body;

    // 2. Check if users exists (If users exists throw error)

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email
    ]);


    if(user.rows.length !== 0){
      return res.status(401).send('User Already Exists')
    }

    // 3. Bcrypt the user password

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. enter the new user into our database

    const newUser = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword])
    // 5. generate jwt token
    const token = jwtGenerator(newUser.rows[0].id);


    res.json({ token });

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
})


// Login Route

router.post('/login', validate ,async(req, res) =>{
  try {
    // 1. destructure the res.body

    const {email, password} = req.body;

    // 2. check if user doesn't exist  (if not throw error)

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email
    ]);

    if(user.rows.length === 0){
      return res.status(401).json('Password or Email is Incorrect')
    }

    // 3. check if incoming password is the same as the db password

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if(!validPassword){
      return res.status(401).json('Password or Email is Incorrect')
    }

    // 4. give the jwt token

    const token = jwtGenerator(user.rows[0].id);
    res.json({ token })

  } catch (e) {
    console.error(e.message)
    res.status(500).send('Server Error');
  }
})

// Verify/Persisted State

router.get('/verify', authorization, async(req, res) =>{
  try {
    res.json(true);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router
