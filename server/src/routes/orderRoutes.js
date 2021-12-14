const { Router } = require("express");
const express = require("express");
const mysql = require("mysql");

const router = express.Router();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "CINEMABOOKING",
});

//the user chooses branch and date, then the system returns possible timings, then chooses seats, then chooses food

//select timings based on queries
router.get("/getTimings", (req, res) => {
  const movieID = req.query.movieID;
  const date = req.query.date;
  const branch = req.query.branch;
  db.query(
    `SELECT screeningTime, screeningID FROM SCREENING S NATURAL JOIN BRANCH WHERE S.movieID = '${movieID}' AND S.screeningDate = '${date}' AND location = '${branch}`,
    (err, result) => {
      if (err) res.status(422).send(err);
      else {
        res.send({ result });
      }
    }
  );
});

//get the seats based on the selection of the time
router.get("/getBookedSeats", (req, res) => {
  const screeningID = req.query.screeningID;
  db.query(
    `SELECT seatID FROM RESERVES WHERE screeningID = '${screeningID}'`,
    (err, result) => {
      if (err) res.status(422).send(err);
      else {
        res.send(result);
      }
    }
  );
});

//get possible foods
router.get("/food", (req, res) => {
  db.query("SELECT foodName, price FROM FOOD", (err, result) => {
    if (err) res.status(422).send(err);
    else {
      res.send(result);
    }
  });
});

router.post("/confirmOrder", (req, res) => {});

module.exports = router;
