const express = require('express');
const auth = require('../common/auth');
const { getUserDetails } = require('./user-manager');
const router = express.Router();

router.post('/check-token', auth, async (req, res) => {
  const username = req.credentials.username;
  const userDetails = await getUserDetails(username);
  
  res.send(userDetails);
});

module.exports = {
  router
}