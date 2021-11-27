const express = require("express");
const mysql = require("mysql");

const router = express.Router();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "productdelivery",
});
