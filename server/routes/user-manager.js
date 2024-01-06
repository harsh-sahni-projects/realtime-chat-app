const express = require('express');
const router = express.Router();

const { getNewToken } = require('../common/token-manager.js');
const getDbClient = require('../common/db-client.js');
const DB_NAME = process.env.DB_NAME;
const COLL_NAME = 'users';

router.post('/create-new-account', async (req, res) => {
  let client;
  try {
    let { username, password, confirmPassword } = req.body;
    username = username.trim();
    
    if (!username.length || !password.length)
      return res.status(400).send('Invalid username or password');
    
    if (password !== confirmPassword)
      return res.status(400).send('Passwords don\'t match');

    // CHECK - SYMBOLS IN USERNAME
    const restrictedSymbols = [',', '/', '\\', '\'', '"', '%', '[', ']', '{', '}', '(', ')'];

    const symbolsInUsername = (() => {
      let chunks = username.split('');
      let includedSymbols = restrictedSymbols.filter(s => chunks.includes(s));
      return includedSymbols
    })();

    if (symbolsInUsername.length) 
      return res.status(400).send(`Username can't contain symbols ${symbolsInUsername.join(' ')}`);
    
    // USER EXISTS
    client = await getDbClient();
    const db = client.db(DB_NAME);
    const coll = db.collection(COLL_NAME);

    const alreadyPresentUser = await coll.findOne({ username });
    if (alreadyPresentUser) {
      return res.status(409).send('User with this username already present');
    }

    // ADD USER TO DB
    const date = new Date();
    const userDetails = {
      username,
      password,
      joiningDate: date,
      lastActive: date,
      avatar: '',
      bio: 'Hi, I am on Chatly',
      friends: [],
    }

    const inserted = await coll.insertOne(userDetails);

    if (!inserted) {
      return res.status(500).send('User not created');
    }

    // LOGIN AFTER CREATING ACCOUNT
    const token = await getNewToken(username);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000 // ms
    });

    delete userDetails.password;

    res.send(userDetails);
  } catch (err) {
    console.log('ERROR while creating user:', err);
    res.status(500).send('Something went wrong, please contact administrator');
  } finally {
    await client.close();
  }
});

function getUserDetails(username) {
  return new Promise(async (resolve, reject) => {
    let client;
    try {
      client = await getDbClient();
      const db = client.db(DB_NAME);
      const coll = db.collection(COLL_NAME);
      const user = await coll.findOne({ username });
  
      if (user) {
        delete user.password;
        delete user._id;
      }
  
      resolve(user);
    } catch (err) {
      reject(err);      
    } finally {
      client.close();
    }
  });
}

function verifyPassword(username, password) {
  return new Promise(async (resolve, reject) => {
    let client;
    try {
      client = await getDbClient();
      const db = client.db(DB_NAME);
      const coll = db.collection(COLL_NAME);
      const user = await coll.findOne({ username });

      if (!user) return reject('Invalid username');
      
      resolve(user.password === password);
    } catch (err) {
      reject(err)
    } finally {
      client.close();
    }
  });
}

function addFriend(username, friendName) {
  return new Promise(async (resolve, reject) => {
    let client;
    try {
      client = await getDbClient();
      const db = client.db(DB_NAME);
      const coll = db.collection(COLL_NAME);

      const user = await coll.findOne({ username });
      const friend = await coll.findOne({ username: friendName });

      if (!user || !friend)
        return reject('Can\'t find given users');

      user.friends.push(friendName)
      friend.friends.push(username)
      
      await coll.updateOne({ username }, {
        $set: {
          friends: user.friends
        }
      });

      await coll.updateOne({ username: friendName }, {
        $set: {
          friends: friend.friends
        }
      });
      resolve(true);
    } catch (err) {
      reject(err);
    } finally {
      client.close();
    }
  })
}

module.exports = {
  router,
  getUserDetails,
  verifyPassword,
  addFriend
};