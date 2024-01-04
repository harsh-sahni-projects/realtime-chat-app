const { getUserDetailsArr } = require('../routes/user-manager.js');
const { verifyToken } = require('./token-manager.js');

const auth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).send('Session expired');
    } else {
      const decodedToken = verifyToken(token);
      const username = decodedToken.username;
      
      const user = getUserDetailsArr(username);
      if (!user)
        return res.status(401).send('Accound not verified');
      
      // Remove password field
      user.splice(1,1)
      
      req['credentials'] = {
        userDetails: {
          username: user[0],
          joiningDate: user[1],
          avatar: user[2],
          bio: user[3],
          friends: JSON.parse(user[4])
        }
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