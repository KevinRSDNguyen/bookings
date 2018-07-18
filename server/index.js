const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const FakeDb = require("./fake-db");
const Rental = require("./models/rental");
const path = require("path");

const rentalRoutes = require("./routes/rentals");

mongoose
  .connect(
    config.DB_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
  });

const app = express();

app.use(bodyParser.json());

app.use("/api/v1/rentals", rentalRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log("App is running");
});
