const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const router = express.Router();
const app = express();
app.use(cors());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "cinemaBooking",
});

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

router.get("/movie", (req, res) => {
  const id = req.query.movID;
  db.query("SELECT * FROM movie WHERE movieID ='" + id + "'", (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

router.get("/act", (req, res) => {
  const id = req.query.movID;
  db.query(
    "SELECT A.firstName,lastName FROM ACTOR A, MOVIE M, ACTS_IN I WHERE A.actorID = I.actorID AND I.movieID = M.movieID AND M.movieID = '" +
      id +
      "'",
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.get("/dir", (req, res) => {
  const id = req.query.movID;
  db.query(
    "SELECT D.firstName,lastName FROM DIRECTOR D, MOVIE M, DIRECTS I WHERE D.directorID = I.directorID AND I.movieID = M.movieID AND M.movieID = '" +
      id +
      "'",
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.get("/review", (req, res) => {
  const id = req.query.movID;
  db.query(
    "SELECT R.rating, review FROM MOVIE_REVIEW R, GIVES_MOV_REVIEW G, MOVIE M WHERE R.movRevID = G.movRevID AND G.movieID = M.movieID AND M.movieID ='" +
      id +
      "'",
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.post("/add_review", (req, res) => {
  const mID = req.body.mID;
  const cID = req.body.cID;
  const rating = req.body.rating;
  const review = req.body.review + " ";
  var id;
  db.query("SELECT MAX(movRevID) AS max FROM MOVIE_REVIEW", (err1, result) => {
    id = "A" + (parseInt(result[0].max.slice(1)) + 1).toString();

    db.query(
      `INSERT INTO MOVIE_REVIEW VALUES ("${id}", ${rating}, "${review}")`,
      (err2) => {}
    );
    db.query(
      `INSERT INTO GIVES_MOV_REVIEW VALUES ("${cID}", "${mID}", "${id}")`,
      (err3) => {
        if (err3) {
          return res.status(422).send(err3);
        }
      }
    );
  });
});
module.exports = router;
