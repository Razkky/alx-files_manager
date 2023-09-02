const { express } = require('express');
const { getStatus } = require('../controllers/AppController');
const { getStats } = require('../controllers/AppController');

const router = express.Router();

router.get('/status', getStatus);

router.get('/stats', getStats);
