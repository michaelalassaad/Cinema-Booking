const express = require("express");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
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

router.get("/search", (req, res) => {
  console.log(req);
  const term = req.query.term;
  const filter = req.query.filter;
  var query;
  if (filter == 0) {
    query = `SELECT movieID, rating, poster, title FROM MOVIE WHERE releaseDate >= '2021-07-01' AND title LIKE "%${term}%" ORDER BY title`;
  } else {
    query = `SELECT movieID, rating, poster, title FROM MOVIE WHERE title LIKE "%${term}%" ORDER BY title`;
  }

  db.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
