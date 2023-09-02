const express = require('express');
const getStats = require('../controllers/AppController').getStats;
const getStatus = require('../controllers/AppController').getStatus;


const router = express.Router();

router.get('/status', getStatus);

router.get('/stats', getStats);

module.exports = router;


