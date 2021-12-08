const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const router = express.Router();
const app = express();
app.use(cors());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "4737",
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

router.get("/movie", (req, res) => {

  const id = req.query.movID; 
  db.query(
    "SELECT * FROM movie WHERE movieID ='" + id + "'", (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    }
  );
});

router.get("/act", (req, res) => {

  const id = req.query.movID;
  db.query(
    "SELECT A.firstName,lastName FROM ACTOR A, MOVIE M, ACTS_IN I WHERE A.actorID = I.actorID AND I.movieID = M.movieID AND M.movieID = '" + id + "'", (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.get("/dir", (req, res) => {

  const id = req.query.movID;
  db.query(
    "SELECT D.firstName,lastName FROM DIRECTOR D, MOVIE M, DIRECTS I WHERE D.directorID = I.directorID AND I.movieID = M.movieID AND M.movieID = '" + id + "'", (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.get("/review", (req, res) => {

  const id = req.query.movID; 
  db.query(
    "SELECT R.rating, review FROM MOVIE_REVIEW R, GIVES_MOV_REVIEW G, MOVIE M WHERE R.movRevID = G.movRevID AND G.movieID = M.movieID AND M.movieID ='" + id + "'", (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});



module.exports = router;
