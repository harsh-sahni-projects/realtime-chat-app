const express = require('express');
const auth = require('../common/auth');
const { getUserDetails, addFriend } = require('./user-manager');
const router = express.Router();

const USERS_FILE_PATH = __dirname + '/../db/users.csv';

router.post('/add-friend', auth, async (req, res) => {
  try {
    const friendName = req.body.friendName?.trim();
  
    if (!friendName)
      return res.status(400).send('Invalid friend name');
  
    const username = req.credentials.username;
    if (username == friendName)
      return res.status(400).send(`Can't add yourself as a friend`);
  
    const userDetails = await getUserDetails(username);
  
    // ALREADY FRIEND
    if (userDetails.friends.includes(friendName.toLowerCase()))
      return res.status(400).send('Already in friend\'s list');
  
    // DOES FRIEND EXISTS
    const friendDetails = await getUserDetails(friendName);
    if (!friendDetails)
      return res.status(404).send(`No person with name "${friendName}" exists`);
    
    const added = await addFriend(userDetails.username, friendDetails.username);
    if (!added)
      return res.status(500).send('Something went wrong');
    
    res.send('Friend added');  
  } catch (err) {
    console.log('ERROR (add-friend.js)', err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = {
  router
}