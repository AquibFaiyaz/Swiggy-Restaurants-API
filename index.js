const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const db = require("./queries");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/api/v1.1", (request, response) => {
  response.json({
    info: "This repository is intended for APIs designed to serve Swiggy restaurant data from major Indian metro cities.",
  });
});

app.get("/api/v1.1/cities", db.getAllCities);
app.get("/api/v1.1/restaurants", db.getAllRestaurants);
app.get("/api/v1.1/restaurants/:id", db.getRestaurantById);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
