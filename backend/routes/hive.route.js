const express = require('express');
const router = express.Router();
const { addHive, getHives } = require('../controllers/hive.controller');

router.post('/', addHive);
router.get('/', getHives);


module.exports = router;
