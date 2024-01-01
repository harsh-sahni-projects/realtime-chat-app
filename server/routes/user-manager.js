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

function getUserDetailsArr(username) {
  const allUsers = fs.readFileSync(USERS_FILE_PATH, 'utf8').split('\n');
  let thisUser = allUsers.find(userDetails => {
    return userDetails.split(',')[0].toLowerCase() == username.toLowerCase()
  });
  if (thisUser) thisUser = thisUser.split(',');
  return thisUser;
}

router.get('/create-new-account', (req, res) => {
  res.send('Hi GET fromsadf router');
})

module.exports = {
  router,
  getUserDetailsArr
};