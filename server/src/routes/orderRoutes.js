const { Router, response } = require("express");
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
    `SELECT screeningTime, screeningID FROM SCREENING S NATURAL JOIN BRANCH WHERE S.movieID = '${movieID}' AND S.screeningDate = '${date}' AND location LIKE '%${branch}%'`,
    (err, result) => {
      if (err) res.status(422).send(err);
      else {
        res.send(result);
      }
    }
  );
});

//get the available seats based on the selection of the time
router.get("/getFreeSeats", (req, res) => {
  const screeningID = req.query.screeningID;

  db.query(
    `SELECT seatNumber FROM SEAT WHERE seatID NOT IN (SELECT seatID FROM RESERVES WHERE screeningID = '${screeningID}')`,
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
  db.query("SELECT foodName, price, foodID FROM FOOD", (err, result) => {
    if (err) res.status(422).send(err);
    else {
      res.send(result);
    }
  });
});

router.post("/confirmFood", (req, res) => {
  const { custID, foodID, qty } = req.body;
  db.query("SELECT MAX(orderID) AS max FROM ORDERS", (err1, result) => {
    orderID = "O" + (parseInt(result[0].max.slice(1)) + 1).toString();
    console.log(custID, foodID, qty);
    db.query(
      `INSERT INTO ORDERS VALUES ("${orderID}", CURRENT_TIME(), "${custID}")`,
      (err3, result3) => {
        if (err3) {
          console.log(err3);
          return res.status(422).send(err3);
        } else {
          console.log("ok:");
          db.query(
            `INSERT INTO FOOD_ORDER VALUES (${qty}, "${orderID}", "${foodID}" )`,
            (err3, result3) => {
              console.log("ok2");
              if (err3) console.log(err3);
              return res.send();
            }
          );
        }
      }
    );
  });
});

router.post("/confirmBooking", (req, res) => {
  const { custID, selectedSeat, screeningID, foodOrder } = req.body;
  var id;

  db.query("SELECT MAX(ticketID) AS max FROM TICKET", (err1, result) => {
    id = "T" + (parseInt(result[0].max.slice(1)) + 1).toString();
    db.query(
      `INSERT INTO TICKET VALUES ("${id}", CURRENT_TIME(), 15, "${custID}")`,
      (err, result) => {
        if (err) {
          return res.status(422).send(err);
        } else {
          db.query(
            `INSERT INTO RESERVES VALUES ( (SELECT seatID FROM SEAT WHERE seatNumber = '${selectedSeat}'), '${id}', '${screeningID}'  )`,
            (err2, result2) => {
              if (err2) {
                return res.status(422).send(err);
              } else {
                //console.log(foodOrder);
                return res.send(id);
              }
            }
          );
        }
      }
    );
  });
});

module.exports = router;
