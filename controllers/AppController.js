const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const getStatus = (req, res) => {
  try {
    const redis = redisClient.isAlive();
    const db = dbClient.isAlive();
    res.status(200).send(({ redis, db }));
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Server error' });
  }
};

const getStats = (req, res) => {
  try {
    const users = dbClient.nbUsers();
    const files = dbClient.nbFiles();
    res.status(200).send({ users, files });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Server error' });
  }
};

module.exports = { getStats, getStatus };
