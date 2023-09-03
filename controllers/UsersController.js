// const dbClient = require('../utils/db')
// const sha1 = require('sha1');
// import { ObjectId } from 'mongodb';

// export const postNew = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email) {
//       res.status(400).send({ error: "Missing email" });
//       return;
//     }
//     if (!password) {
//       res.status(400).send({ error: "Missing password" });
//       return;
//     }

//     let user = await dbClient.findUser({ email });

//     if (user) {
//       res.status(400).send({ error: "Already exist" });
//       return;
//     }
//     user = await dbClient.createUser(email, sha1(password));
//     res.status(200).send(user);;
//   } catch (error) {
//     res.status(500).json({ error: "Server error "});
//   }
// };

import sha1 from 'sha1';
// import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';

export const postNew = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      return;
    }

    let user = await dbClient.findUser({ email });

    if (user) {
      res.status(400).json({ error: 'Already exist' });
      return;
    }

    user = await dbClient.createUser(email, sha1(password));
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// export const getMe = async (req, res) => {
//   try {
//     const user = await dbClient.findUser({ _id: ObjectId(req.user.id) });
//     res.status(200).json({ email: user.email, id: user._id });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };
