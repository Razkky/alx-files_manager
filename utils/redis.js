const promisify = require('util').promisify;

const redis = require('redis');

class RedisClient {
  // Initialize redis client
  constructor() {
    this.client = redis.createClient();

    this.clientGet = promisify(this.client.get).bind(this.client);
    this.clinetSet = promisify(this.client.setex).bind(this.client);
    this.clientDel = promisify(this.client.del).bind(this.client);

    this.client.on('error', (error) => {
      console.log(error);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const value = await this.clientGet(key);
    return value;
  }

  async set(key, value, duration) {
    await this.clinetSet(key, duration, value);
  }

  async del(key) {
    await this.clientDel(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
