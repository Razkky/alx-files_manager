const dbClient = require('../utils/db')
const sha1 = require('sha1');
import { ObjectId } from 'mongodb';

export const postNew = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).send({ error: "Missing email" });
      return;
    }
    if (!password) {
      res.status(400).send({ error: "Missing password" });
      return;
    }

    let user = await dbClient.findUser({ email });

    if (user) {
      res.status(400).send({ error: "Already exist" });
      return;
    }
    user = await dbClient.createUser(email, sha1(password));
    res.status(200).send(user);;
  } catch (error) {
    res.status(500).json({ error: "Server error "});
  }
};
