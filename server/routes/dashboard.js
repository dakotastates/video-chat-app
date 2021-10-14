const router = require('express').Router();
const pool = require("../db");
const authorization = require('../middleware/authorization')

router.get('/', authorization, async(req, res) =>{
  try {
    // middleware req.user has the payload
    const user = await pool.query('SELECT id, name FROM users WHERE id = $1', [req.user])

    res.json(user.rows[0]);

  } catch (e) {
    console.error(e.message)
    res.status(500).send('Server Error');
  }
})

module.exports = router;
