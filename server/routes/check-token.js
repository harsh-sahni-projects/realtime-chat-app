const express = require('express');
const auth = require('../common/auth');
const { getUserDetails } = require('./user-manager');
const router = express.Router();

router.post('/check-token', auth, (req, res) => {
  const username = req.credentials.username;
  const userDetails = getUserDetails(username);
  
  res.send(userDetails);
});

module.exports = {
  router
}