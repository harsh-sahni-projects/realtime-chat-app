
const express = require('express');
const router = express.Router();

const { getUserDetailsArr } = require('./user-manager.js');
const { getNewToken } = require('../common/token-manager.js');
const auth = require('../common/auth.js');

const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.post('/login', async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username) return res.status(400).send('Invalid username');
    if (!password) return res.status(400).send('Invalid password');

    username = username.trim().toLowerCase();
  
    const user = getUserDetailsArr(username);
    if (!user) return res.status(404).send('Incorrect username');

    const savedPassword = user.splice(1,1)[0];
    
    if (password !== savedPassword) return res.status(401).send('Incorrect password');
    const userDetails = {
      username: user[0],
      joiningDate: user[1],
      avatar: user[2],
      bio: user[3],
      friends: JSON.parse(user[4])
    }

    const token = await getNewToken(username);
    console.log('login.js token:', token);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000 // ms
    })

    res.send(userDetails);
  } catch (err) {
    console.log('ERROR: While login', err);
    res.status(500).send('Server error');
  }
});

router.post('/logout', auth, (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0)
  });
  res.send('Logged out successfully');
})

module.exports = {
  router
}