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

module.exports = getDbClient;