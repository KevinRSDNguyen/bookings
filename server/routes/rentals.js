const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");
const User = require("../models/user");
const { normalizeErrors } = require("../helpers/mongoose");

const UserCtrl = require("../controllers/user");

//ROUTE: /api/v1/rentals/secret
router.get("/secret", UserCtrl.authMiddleware, function(req, res) {
  res.json({ secret: true });
});

//ROUTE: /api/v1/rentals
router.get("/", (req, res) => {
  Rental.find({})
    .then(foundRentals => {
      res.json(foundRentals);
    })
    .catch(err => {
      res.status(422).json(err);
    });
});

//ROUTE: /api/v1/rentals/:id
router.get("/:id", (req, res) => {
  Rental.findById(req.params.id)
    .then(foundRental => {
      res.json(foundRental);
    })
    .catch(err => {
      res.status(422).send({
        errors: [{ title: "Rental Error!", detail: "Could not find rental" }]
      });
    });
});

module.exports = router;
