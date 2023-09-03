const express = require('express');
const { getStats } = require('../controllers/AppController');
const { getStatus } = require('../controllers/AppController');
const { postNew } = require('../controllers/UsersController');

const router = express.Router();

router.get('/status', getStatus);

router.get('/stats', getStats);

router.post('/users', postNew);

module.exports = router;
