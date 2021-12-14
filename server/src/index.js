const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(bodyParser.json());
app.use(movieRoutes);
app.use(authRoutes);
app.use(orderRoutes);

app.listen(3000);
