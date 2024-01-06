const express = require('express');
const router = express.Router();
const auth = require('../common/auth.js');
const { getUserDetails } = require('./user-manager.js');

router.get('/get-friends-list', auth, async (req, res) => {
  try {
    const username = req.credentials.username;
    const userDetails = await getUserDetails(username);
    const { friends } = userDetails;
    res.send(friends);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong, please contact the administrator');
  }
})

module.exports = {
  router
}