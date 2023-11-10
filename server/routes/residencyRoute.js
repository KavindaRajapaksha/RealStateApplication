const express = require('express');
const { createResidency } = require('../controllers/residencyCntrl.js');
const { getAllResidencies } = require('../controllers/residencyCntrl.js');
const {getResidencyById} = require('../controllers/residencyCntrl.js');
const router = express.Router();

router.post("/create",createResidency)
router.get("/allresd",getAllResidencies)
router.get("/resd/:id",getResidencyById)


module.exports = router;