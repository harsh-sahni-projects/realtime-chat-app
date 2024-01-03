const { verifyToken } = require('./token-manager.js');

const auth = (req, res, next) => {
  try {
    console.log('Auth.js, path:', req.path);
    const allCookies = req.cookies;
    const token = req.cookies?.token;
    console.log('allCookies:', allCookies);
    console.log('Token:', token);

    if (!token) {
      console.log('auth.js - No token received');
      return res.status(401).send('Session expired');
    } else {
      const verified = verifyToken(token);
      console.log('auth.js - Token successfully verified');
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