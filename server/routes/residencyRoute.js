const express = require('express');
const { createResidency } = require('../controllers/residencyCntrl.js');
const router = express.Router();

router.post("/create",createResidency)

module.exports = router;