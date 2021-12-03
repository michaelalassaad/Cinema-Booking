const express = require("express");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "CINEMABOOKING",
});

const router = express.Router();

router.get("/all", (req, res) => {
  db.query(
    "SELECT movieID, rating, poster, title FROM MOVIE ORDER BY title",
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.get("/now", (req, res) => {
  db.query(
    "SELECT movieID, rating, poster, title FROM MOVIE WHERE releaseDate >= '2021-07-01' ORDER BY title",
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.get("/movie", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM MOVIE WHERE movieID = (?)", id);
});

module.exports = router;
