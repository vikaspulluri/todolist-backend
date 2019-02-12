const express = require('express');
const router = express.Router();

const itemHistoryController = require('../controllers/item-history-controller');
const {decodeToken, checkUser} = require('../middleware/check-auth');

router.post('/last-activity', decodeToken, checkUser, itemHistoryController.getLastActivityOnList);

module.exports = router;