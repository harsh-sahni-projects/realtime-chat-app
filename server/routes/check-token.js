const express = require('express');
const auth = require('../common/auth');
const router = express.Router();

router.post('/check-token', auth, (req, res) => {
  const userDetails = req.credentials.userDetails;
  console.log('check-token.js - req.credentials:', req.credentials);
  res.send(userDetails);
});

module.exports = {
  router
}