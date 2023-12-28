const fs = require('fs');
const express = require('express');
const router = express.Router();

const USERS_FILE_PATH = __dirname + '/../db/users.csv';

router.post('/create-new-account', (req, res) => {
  try {
    let { username, password, confirmPassword } = req.body;
    username = username.trim();
    
    if (!fs.existsSync(USERS_FILE_PATH)) {
      console.log('DEBUG: User.json file missing');
      return res.status(500).send('Server Error: Unable to create user, please contact administrator');
    }
  
    const restrictedUsernames = ['username', 'null'];
  
    if (_userAlreadyExists(username)
      || (restrictedUsernames.includes(username.toLowerCase())))
      return res.status(409).send('User already exists'); // 409 = Conflict
    
    const joiningDate = new Date();
    const avatar = 'null';
    const bio = 'null';
    const friends = 'null';
    const userDetails = [username, password, joiningDate, avatar, bio, friends].join(',');
  
    fs.appendFileSync(USERS_FILE_PATH, '\n'+userDetails)
  
    res.send('User created');
  } catch (err) {
    console.log('ERROR while creating user:', err);
    res.status(500).send('Something went wrong, please contact administrator');
  }
});

function _userAlreadyExists(username) {
  const allUsers = fs.readFileSync(USERS_FILE_PATH, 'utf8').split('\n');
  const thisUser = allUsers.find(userDetails => userDetails.split(',')[0] == username);
  return thisUser
}

router.get('/create-new-account', (req, res) => {
  res.send('Hi GET fromsadf router');
})

module.exports = router;