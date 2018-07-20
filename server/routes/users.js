const express = require("express");
const User = require("../controllers/user");
const router = express.Router();

// ROUTE /api/v1/users/auth
router.post("/auth", User.auth);

// ROUTE /api/v1/users/register
router.post("/register", User.register);

module.exports = router;
