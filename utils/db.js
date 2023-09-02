const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.db = null;
    // Use either env vars or defaults
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // MongoDB client connection

    const url = `mongodb://${host}:${port}/`;

    MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
      if (err) console.log(err);
      this.db = db.db(database);
      this.db.createCollection('users');
      this.db.createCollection('files');
    });
  }

  isAlive() {
    return !!this.db;
  }

  // users collection methods

  async nbUsers() {
    const countUsers = await this.db.collection('users').countDocuments();
    return countUsers;
  }

  async nbFiles() {
    const countFiles = await this.db.collection('files').countDocuments();
    return countFiles;
  }
  // constructor() {
  //   this.db = null;
  //   const host = process.env.DB_HOST || 'localhost';
  //   const port = process.env.DB_PORT || 27017;
  //   const database = process.env.DB_DATABASE || 'file_manager';
  //   // const dbUri = `mongodb://${host}:${port}/`;

  //   const dbUri = 'mongodb+srv://nodemognodb:aminah.aliyah@cluster0.rg3yamw.mongodb.net/?retryWrites=true&w=majority';
  //   (async () => {
  //     try {
  //       const client = await MongoClient.connect(dbUri, { useUnifiedTopology: true });
  //       this.db = client.db(database);
  // 	console.log('logging db', this.db);
  //       if (!(await this.collectionExists('users'))) {
  //         await this.db.createCollection('users');
  //       }
  //       if (!(await this.collectionExists('files'))) {
  //         await this.db.createCollection('files');
  //       }
  //     } catch (err) {
  //       console.error('Error connecting to MongoDB:', err);
  //     }
  //   })();
  // }

  // async collectionExists(collectionName) {
  //   const collections = await this.db.listCollections().toArray();
  //   return collections.some((collection) => collection.name === collectionName);
  // }

  // isAlive() {
  //   return !!this.db;
  // }

  // User collection method, count number of document in collection
  // async nbUsers() {
  //   console.log(this.db)
  //   const countUser = await this.db.collection('users').countDocuments();
  //   return countUser;
  // }

  // async nbFiles() {
  //   const countFiles = await this.db.collection('files').countDocuments();
  //   return countFiles;
  // }
}

const dbClient = new DBClient();
module.exports = dbClient;
