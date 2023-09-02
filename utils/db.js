const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.db = null;
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'file_manager';
    const dbUri = `mongodb://${host}:${port}/`;

    // const dbUri = 'mongodb+srv://nodemognodb:aminah.aliyah@cluster0.rg3yamw.mongodb.net/?retryWrites=true&w=majority';
    (async () => {
      try {
        const client = await MongoClient.connect(dbUri, { useUnifiedTopology: true });
        this.db = client.db(database);
        if (!(await this.collectionExists('users'))) {
          await this.db.createCollection('users');
        }
        if (!(await this.collectionExists('files'))) {
          await this.db.createCollection('files');
        }
      } catch (err) {
        console.error('Error connecting to MongoDB:', err);
      }
    })();
  }

  async collectionExists(collectionName) {
    const collections = await this.db.listCollections().toArray();
    return collections.some((collection) => collection.name === collectionName);
  }

  isAlive() {
    return !!this.db;
  }

  // User collection method, count number of document in collection
  async nbUsers() {
    const countUser = await this.db.collection('users').countDocuments();
    return countUser;
  }

  async nbFiles() {
    const countFiles = await this.db.collection('files').countDocuments();
    return countFiles;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
