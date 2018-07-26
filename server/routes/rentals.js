const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");
const User = require("../models/user");
const { normalizeErrors } = require("../helpers/mongoose");

const UserCtrl = require("../controllers/user");

//ROUTE: /api/v1/rentals/manage
// Fetch rental owned by user
router.get("/manage", UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;

  Rental.find({ user })
    .populate("bookings")
    .exec()
    .then(foundRentals => {
      return res.json(foundRentals);
    })
    .catch(err => {
      return res.status(422).send({ errors: normalizeErrors(err) });
    });
});

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
        errors: [{ detail: "Could not find rental" }]
      });
    });
});

//ROUTE: /api/v1/rentals/:id
// Delete rental by id
router.delete("/:id", UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;

  Rental.findById(req.params.id)
    .populate("user", "_id") //Just want the _id of user
    .populate({
      //Populate only with bookings after todays date
      path: "bookings",
      select: "startAt",
      match: { startAt: { $gt: new Date() } }
    })
    .exec()
    .then(foundRental => {
      if (user.id !== foundRental.user.id) {
        return res.status(422).send({
          errors: [{ detail: "Invalid User! You are not rental owner!" }]
        });
      }

      if (foundRental.bookings.length > 0) {
        return res.status(422).send({
          errors: [
            {
              detail: "Cannot delete rental with active bookings!"
            }
          ]
        });
      }

      return foundRental.remove();
    })
    .then(() => {
      return res.json({ status: "deleted" });
    })
    .catch(err => {
      return res.status(422).json({ errors: normalizeErrors(err) });
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
      return res.status(422).send({ errors: normalizeErrors(err) });
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
              detail: `There are no rentals for the city of ${city}`
            }
          ]
        });
      }
      res.json(foundRentals);
    })
    .catch(err => {
      return res.status(422).json({ errors: normalizeErrors(err) });
    });
});

module.exports = router;
