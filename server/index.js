const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const FakeDb = require("./fake-db");
const Rental = require("./models/rental");
const path = require("path");

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

app.get("/rentals", (req, res) => {
  res.json({ success: true });
});

app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log("App is running");
});
