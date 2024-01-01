
const express = require('express');
const router = express.Router();

const { getUserDetailsArr } = require('./user-manager.js');

router.post('/login', (req, res) => {
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
    res.send(userDetails);
  } catch (err) {
    console.log('ERROR: While login', err);
    res.status(500).send('Server error');
  }
});

router.post('/logout', (req, res) => {
  console.log('Logout success');
  res.send('Logout successful');
})

module.exports = {
  router
}