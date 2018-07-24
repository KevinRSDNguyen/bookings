const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");
const User = require("../models/user");
const { normalizeErrors } = require("../helpers/mongoose");

const UserCtrl = require("../controllers/user");

//ROUTE: /api/v1/rentals/:id
// Fetch rental by id
router.get("/:id", (req, res) => {
  Rental.findById(req.params.id)
    .populate("user", "username -_id") //Just username of user and NO _id
    .populate("bookings", "startAt endAt -_id")
    .exec()
    .then(foundRental => {
      res.json(foundRental);
    })
    .catch(err => {
      res.status(422).send({
        errors: [{ title: "Rental Error!", detail: "Could not find rental" }]
      });
    });
});

//ROUTE: /api/v1/rentals/secret
router.get("/secret", UserCtrl.authMiddleware, function(req, res) {
  res.json({ secret: true });
});

//ROUTE: /api/v1/rentals
// Create Rental
router.post("", UserCtrl.authMiddleware, function(req, res) {
  const {
    title,
    city,
    street,
    category,
    image,
    shared,
    bedrooms,
    description,
    dailyRate
  } = req.body;

  const user = res.locals.user;

  const rental = new Rental({
    title,
    city,
    street,
    category,
    image,
    shared,
    bedrooms,
    description,
    dailyRate
  });
  rental.user = user;

  let newRentalToReturn;

  rental
    .save()
    .then(newRental => {
      newRentalToReturn = newRental;
      return User.update({ _id: user.id }, { $push: { rentals: newRental } });
    })
    .then(() => {
      res.json(newRentalToReturn);
    })
    .catch(err => {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    });
});

//ROUTE: /api/v1/rentals
//Fetch Rentals
router.get("/", (req, res) => {
  const city = req.query.city;
  const query = city ? { city: city.toLowerCase() } : {};

  Rental.find(query)
    .select("-bookings") //Exclude booking info for each document
    .exec()
    .then(foundRentals => {
      if (city && foundRentals.length === 0) {
        return res.status(422).send({
          errors: [
            {
              title: "No Rentals Found!",
              detail: `There are no rentals for the city of ${city}`
            }
          ]
        });
      }
      res.json(foundRentals);
    })
    .catch(err => {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    });
});

module.exports = router;
