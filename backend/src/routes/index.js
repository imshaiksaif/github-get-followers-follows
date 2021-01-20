const express = require('express');
const router = express.Router();
const { getListOfFollowedAndFollows } = require('../controllers/getListOfFollowedAndFollows');

router.post('/github/get-list', getListOfFollowedAndFollows);

module.exports = router;