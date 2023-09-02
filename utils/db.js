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
}

const dbClient = new DBClient();
module.exports = dbClient;
