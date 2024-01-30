[ ] FT: Encode creds on login
[ ] Show/hide password on Login page
[ ] Show/hide password on Signup page
[ ] Server: Validate incoming data in create-new-account.js
[ ] Server/FT: Space and comma should not be included in username
[ ] IMP: Server: Handle comman in bio field
[ ] Sever/FT: Encrypt/decryp creds on login
[ ] FT: Add illustration on empty friends list
[ ] FT: Fix error for non-serizable issue
[ ] FT: change title and  logo of page
[ ] Security: After logout, I wipeout the cookie, but is that cookie (if man in the middle)
    still valid? Check for it. The attacker shouldn't be able to login using that cookie.
[ ] FT: show loading on login/signup button
[ ] BE: handle if no env file is present
[ ] FT: Change alerts to notifications
[ ] FT: add limit to username.length
[ ] Server: Verify proper working of sockte.io response when cookie is expired


add property - display name which will be separate from username
store user's data in json
add field - last active session

DB Structure

Users
[
  {
    username: 
    password:
    date-of-joining: <server_timestamp>
    avatar: <encoded_img_name>
    friends: []
  }
]
"username,password,joiningDate,avatar,friends"

conversations folder: // will contain files of conversations
<user1>/<user2>
<user1>/<user3>
<user2>/<user3>

<server_timestamp> <from_user> msg
<server_timestamp> <from_user> msg

# Harsh sends Mark
1. find coll harsh/mark or mark/harsh
2. Found: a. add msg
          b. added YES: socket emit msg 
   Not-found: make coll > add msg

# Harsh opens Mark's chat
1. find coll harsh/mark or mark/harsh
2. Found: a. search msg = sort by timestamp (desc) = limit 50
          b. send to FT
   Load more: a. FT - send oldest msg time stamp to server
              b. find msgs = sort by timestamp (desc) where timestamp < FT timestamp = limit 50

# Mark opens harsh's chat
1. Find coll mark/harsh or harsh/mark
2. Found: same as Harsh open's mark chat

# Mark sends harsh 
1. Find mark/harsh or harsh/mark
2. same as harsh send mark

Collection Name
Harsh/Mark
  {
    sender: harsh
    receiver: mark,
    msg: 'something',
    timestamp: <time>,
    isRead: false
  },
  {
    sender: harsh,
    receivcer: mark,
    msg: some2
    timeStamp: <time>,
    isRead: false
  }

# Vercel 

  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ],




  ,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]