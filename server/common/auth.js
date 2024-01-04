const { getUserDetails } = require('../routes/user-manager.js');
const { verifyToken } = require('./token-manager.js');

const auth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).send('Session expired');
    } else {
      const decodedToken = verifyToken(token);
      const username = decodedToken.username;
      
      const userDetails = getUserDetails(username);
      if (!userDetails)
        return res.status(401).send('Invalid user');
      
      req['credentials'] = {
        username: userDetails.username
      }

      next();
    }

  } catch (err) {
    console.log('AUTH.js ERROR:', err);
    if (err.status == 401) { // jwt verification failed
      return res.status(401).send('Session expired');
    }
    console.log('auth.js - Sending error 500');
    res.status(500).send('Internal server error');
  }
}

module.exports = auth;