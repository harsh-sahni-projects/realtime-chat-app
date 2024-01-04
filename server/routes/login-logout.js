
const express = require('express');
const router = express.Router();

const { getUserDetails, verifyPassword } = require('./user-manager.js');
const { getNewToken } = require('../common/token-manager.js');
const auth = require('../common/auth.js');

router.post('/login', async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username) return res.status(400).send('Invalid username');
    if (!password) return res.status(400).send('Invalid password');

    username = username.trim().toLowerCase();
    
    const userDetails = getUserDetails(username);
    if (!userDetails)
      return res.status(404).send('Incorrect username');

    if (!verifyPassword(username, password))
      return res.status(401).send('Incorrect password');

    const token = await getNewToken(username);
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