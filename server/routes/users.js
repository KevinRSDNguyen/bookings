const express = require("express");
// const User = require("../controllers/user");
const router = express.Router();

// ROUTE /api/v1/users/auth
router.post("/auth", (req, res) => {
  res.send("yo");
});

// ROUTE /api/v1/users/register
router.post("/register", (req, res) => {
  res.send("yo");
});

module.exports = router;
