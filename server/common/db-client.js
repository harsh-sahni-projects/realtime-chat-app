const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_URI;

const getDbClient = async () => {
  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    return await client.connect();
  } catch (err) {
    console.log(err);
    throw err;
  }

}

// run();

async function run() {
  let date = new Date();
  for (var i=1; i<=5; i++) {
    let friends = [1,2,3,4,5].map(num => {
      if (num == i) {
        return null
      } else {
        return `Guest ${num}`
      }
    }).filter (e => e);
    
    let user = {
      username:`Guest ${i}`,
      password:"Guest@123",
      joiningDate: date,
      lastActive: date,
      avatar: "",
      bio: "Hi, I am on Chatly",
      friends: friends
    }
    let client = await getDbClient();
    let db =  client.db(process.env.DB_NAME);
    let coll =  db.collection(process.env.USERS_COLL_NAME);
    let res = await coll.findOne({username: user.username});
    console.log(res);
    if (!res) {
      await coll.insertOne(user);
      console.log(`Inserted user: ${user.username}`)
    }
  }
}

module.exports = getDbClient;