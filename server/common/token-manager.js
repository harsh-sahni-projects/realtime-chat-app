const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const KEY_32 = 'top@secret@for@crypto@encryptor@';
const IV_16 = 'top@secretCrypto';
const CRYPTO_ALGO = 'aes-256-cbc'

const JWT_SECRET = 'top@secret';
const JWT_EXPITY_TIME = '1h'



const getNewToken = async (username, expiryTime = JWT_EXPITY_TIME) => {
  if ((typeof username !== 'string') || (!username.length))
   throw new Error('Invalid username for encryption');

  try {
    const token = jwt.sign({ username }, JWT_SECRET, {
      expiresIn: expiryTime,
      algorithm: 'HS512'
    });
  
    const cipher = crypto.createCipheriv(CRYPTO_ALGO, KEY_32, IV_16);
    let encryptedToken = cipher.update(token, 'utf8', 'hex');
    encryptedToken += cipher.final('hex');
  
    return encryptedToken;
  } catch(err) {
    console.log('ERR:', err);
    throw err;
  }
}

const _decryptToken = (token) => {
  if ((typeof token !== 'string') || (!token.length))
    throw new Error('Invalid token for decryption');

  const decipher = crypto.createDecipheriv(CRYPTO_ALGO, KEY_32, IV_16);
  let decryptedToken = decipher.update(token, 'hex', 'utf8');
  decryptedToken += decipher.final('utf8');

  return decryptedToken;
}

const verifyToken = (encryptedToken) => {
  try {
    const decryptedToken = _decryptToken(encryptedToken);
    const decodedToken = jwt.verify(decryptedToken, JWT_SECRET);
    return decodedToken;
  } catch (err) {
    console.log(err);
    console.log('Above error occurred while verifying token (token-manager.js)');
    throw err;
  }
}

module.exports = {
  getNewToken, 
  verifyToken
}