const express = require('express');
const router = express.Router();
const { addCrop, getNearbyCrops } = require('../controllers/crop.controller');

router.post('/', addCrop);
router.get('/nearby', getNearbyCrops);

module.exports = router;
