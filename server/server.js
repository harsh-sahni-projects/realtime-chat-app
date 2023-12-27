const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const createNewAccount = require('./routes/create-new-account.js');

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/', createNewAccount);

// ------ Initialise database files -------
const DB_FOLDER = path.join(__dirname, '/db');
const CONVERSATOINS_FOLDER = path.join(__dirname, '/db/conversations');
const USERS_FILE = path.join(__dirname, '/db/users.json');

if (!fs.existsSync(DB_FOLDER)) fs.mkdirSync(DB_FOLDER);
if (!fs.existsSync(CONVERSATOINS_FOLDER)) fs.mkdirSync(CONVERSATOINS_FOLDER);
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]");
// ----------------------------------------

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});