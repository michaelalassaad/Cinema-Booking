const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const movieRoutes = require("./routes/movieRoutes");

const app = express();

app.use(bodyParser.json());
app.use(movieRoutes);

app.listen(3000);
