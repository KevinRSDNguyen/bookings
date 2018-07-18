const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");

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
      res
        .status(422)
        .send({
          errors: [{ title: "Rental Error!", detail: "Could not find rental" }]
        });
    });
});

module.exports = router;
