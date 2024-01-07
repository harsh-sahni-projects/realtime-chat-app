const express = require('express');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true
  }
});

require('dotenv').config();
const { router: userManagerRouter } = require('./routes/user-manager.js');
const { router: loginLogoutRouter } = require('./routes/login-logout.js');
const { router: checkTokenRouter } = require('./routes/check-token.js');
const { router: addFriendRouter } = require('./routes/add-friend.js');
const { router: getFriendsListRouter } = require('./routes/get-friends-list.js');

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

io.on('connection', (socket) => {
  console.log('A user connected');
  // console.log('socket.request.headers.cookie:', socket.request.headers.cookie);
  // console.log('socket.id:', socket.id)
})

app.use('/', userManagerRouter);
app.use('/', loginLogoutRouter);
app.use('/', checkTokenRouter);
app.use('/', addFriendRouter);
app.use('/', getFriendsListRouter);

// ------ Initialise database files -------
// const DB_FOLDER = path.join(__dirname, '/db');
// const CONVERSATOINS_FOLDER = path.join(__dirname, '/db/conversations');
// const USERS_FILE = path.join(__dirname, '/db/users.csv');

// if (!fs.existsSync(DB_FOLDER)) fs.mkdirSync(DB_FOLDER);
// if (!fs.existsSync(CONVERSATOINS_FOLDER)) fs.mkdirSync(CONVERSATOINS_FOLDER);
// if (!fs.existsSync(USERS_FILE))
//   fs.writeFileSync(USERS_FILE, "username,password,joiningDate,avatar,bio,friends");
// ----------------------------------------

// ------- Mongodb ------------------------

// const client = require('./common/db-client');

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     // await client.db(dbName).command({ ping: 1 });
//     const db = c
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// ----------------------------------------

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});