const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_URI;
console.log(uri)

const getClient = async () => {
  try {
    console.log('URI:', uri);
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    return client;
  } catch (err) {
    console.log(err);
    throw err;
  }

}

module.exports = getClient;