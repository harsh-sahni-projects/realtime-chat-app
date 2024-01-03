const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const { router: userManagerRouter } = require('./routes/user-manager.js');
const { router: loginLogoutRouter } = require('./routes/login-logout.js');

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/', userManagerRouter);
app.use('/', loginLogoutRouter)

// ------ Initialise database files -------
const DB_FOLDER = path.join(__dirname, '/db');
const CONVERSATOINS_FOLDER = path.join(__dirname, '/db/conversations');
const USERS_FILE = path.join(__dirname, '/db/users.csv');

if (!fs.existsSync(DB_FOLDER)) fs.mkdirSync(DB_FOLDER);
if (!fs.existsSync(CONVERSATOINS_FOLDER)) fs.mkdirSync(CONVERSATOINS_FOLDER);
if (!fs.existsSync(USERS_FILE))
  fs.writeFileSync(USERS_FILE, "username,password,joiningDate,avatar,bio,friends");
// ----------------------------------------

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});