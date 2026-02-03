const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRound = 10;

const User = require("../models/user");

const timeLog = (req, res, next) => {
  console.log("Time : ", Date.now());
  next();
};

router.use(timeLog);

router.post("/_fetch_admin", (req, res) => {
  const _token = req.body.headers["Authorization"].split(" ")[1];

  const user = jwt.verify(_token, "_mahtab");
  res.json(user.newUser);
});

router.post("/_sign", async (req, res) => {
  const { name, email, password } = req.body.data;
  const useres = await User.find({});
  console.log("useres ", useres);

  bcrypt
    .hash(password, saltRound)
    .then(async (hash) => {
      console.log(hash);

      const newUser = new User({
        name: name,
        email: email,
        password: hash,
      });

      const token = jwt.sign({ newUser }, "_mahtab");

      await newUser.save();

      console.log("auth route .. .. .. ", newUser);
      res.status(200).json(token);
    })
    .catch((err) => {
      throw new Error(err.message);
    });
});

module.exports = router;
