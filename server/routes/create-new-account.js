const express = require('express');
const router = express.Router();

router.post('/create-new-account', (req, res) => {
  res.send(req.body);
});

router.get('/create-new-account', (req, res) => {
  res.send('Hi GET fromsadf router');
})

module.exports = router;