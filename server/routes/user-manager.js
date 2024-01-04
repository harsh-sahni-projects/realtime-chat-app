const fs = require('fs');
const express = require('express');
const router = express.Router();

const USERS_FILE_PATH = __dirname + '/../db/users.csv';

router.post('/create-new-account', (req, res) => {
  try {
    let { username, password, confirmPassword } = req.body;
    username = username.trim();
    
    if (!fs.existsSync(USERS_FILE_PATH)) {
      console.log('user-manager.js: User.json file missing');
      return res.status(500).send('Server Error: Unable to create user, please contact administrator');
    }
  
    const restrictedUsernames = ['username'];
  
    if (getUserDetailsArr(username)
      || (restrictedUsernames.includes(username.toLowerCase()))
    )
      return res.status(409).send('User already exists'); // 409 = Conflict
    
    const joiningDate = new Date();
    const avatar = '';
    const bio = 'Hi I am on Chatly';
    const friends = '[]';
    const userDetails = [username, password, joiningDate, avatar, bio, friends].join(',');
  
    fs.appendFileSync(USERS_FILE_PATH, '\n'+userDetails)
  
    res.send('User created');
  } catch (err) {
    console.log('ERROR while creating user:', err);
    res.status(500).send('Something went wrong, please contact administrator');
  }
});

function getUserDetails(username) {
  const allUsers = fs.readFileSync(USERS_FILE_PATH, 'utf8').split('\n');
  let user = allUsers.find(userDetails => {
    return userDetails.split(',')[0].toLowerCase() == username.toLowerCase()
  });
  if (!user) return null;

  user = user.split(',');
  const userDetails = {
    username: user[0],
    // password from user[1] skipped
    joiningDate: user[2],
    avatar: user[3],
    bio: user[4],
    friends: JSON.parse(user[5])
  }
  return userDetails;
}

function verifyPassword(username, password) {
  const allUsers = fs.readFileSync(USERS_FILE_PATH, 'utf8').split('\n');
  let user = allUsers.find(userDetails => {
    return userDetails.split(',')[0].toLowerCase() == username.toLowerCase()
  });
  if (!user) return false;

  const savedPassword = user.split(',')[1];
  return savedPassword === password;
}

module.exports = {
  router,
  getUserDetails,
  verifyPassword
};