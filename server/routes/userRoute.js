const express = require('express');
const { createUser } = require('../controllers/userCntrl.js');
const {bookVisit} = require('../controllers/userCntrl.js');
const {allBookings} = require('../controllers/userCntrl.js');
const{cancelBooking}=require('../controllers/userCntrl.js');
const{toFav}=require('../controllers/userCntrl.js');
const{allFav}=require('../controllers/userCntrl.js');

const router = express.Router();




router.post("/register",createUser)
router.post("/bookVisit/:id",bookVisit)
router.get("/allBookings",allBookings)
router.post("/cancelBooking/:id",cancelBooking)
router.post("/toFav/:rid",toFav)
router.get("/allFav",allFav)
module.exports = router;
