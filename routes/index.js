const express = require('express');
const { getStats } = require('../controllers/AppController').getStats;
const { getStatus } = require('../controllers/AppController').getStatus;
const { postNew } = require('../controllers/UsersController').postNew

const router = express.Router();

router.get('/status', getStatus);

router.get('/stats', getStats);

router.post('/users', postNew);

module.exports = router;
