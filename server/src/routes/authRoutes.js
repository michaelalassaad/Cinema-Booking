const express = require("express");
const mysql = require("mysql");

const router = express.Router();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "CINEMABOOKING",
});

router.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.pass;
  if (!email) return res.status(422).send("Please enter an email");
  if (!password) return res.status(422).send("You must enter a password");
  db.query(
    `SELECT customerID, pass FROM CUSTOMER WHERE email = "${email}"`,
    (err, result) => {
      if (err) return res.status(422).send(err);
      else {
        if (result[0]) {
          if (password == result[0].pass) {
            //The result is returned in an array
            return res.send({ custId: result[0].customerID });
          } else return res.status(422).send("Incorrect password");
        } else {
          return res.status(422).send("Email not found");
        }
      }
    }
  );
});

router.post("/signup", async (req, res) => {
  const { fname, lname, phone, email, pass } = req.body;
  if (!fname || !lname || !phone || !email || !pass)
    return res.status(422).send("Please fill all fields");

  var id;
  db.query("SELECT MAX(customerID) AS max FROM CUSTOMER", (err, result) => {
    id = "C" + (parseInt(result[0].max.slice(1)) + 1).toString();

    db.query(
      `INSERT INTO CUSTOMER VALUES ("${id}", "${fname}", "${lname}", ${phone}, "${email}", "${pass}")`,
      (err) => {
        if (err) {
          if (err.errno == 1062)
            return res.status(422).send("Account already exists");
          return res.status(422).send(err);
        } else {
          return res.send({ custId: id });
        }
      }
    );
  });
});

module.exports = router;
