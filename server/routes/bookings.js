const express = require("express");
const router = express.Router();

const UserCtrl = require("../controllers/user");
const BookingCtrl = require("../controllers/booking");

// ROUTE /api/v1/bookings
router.post("", UserCtrl.authMiddleware, BookingCtrl.createBooking);

// router.get("/manage", UserCtrl.authMiddleware, BookingCtrl.getUserBookings);

module.exports = router;
