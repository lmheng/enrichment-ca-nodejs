const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Article = require("../models/articlesModel");

const jwt_key = process.env.JWT_KEY;
const jwt_exp = process.env.JWT_EXP;

router = express.Router();

router.route("/login").post(async (req, resp) => {
  try {
    const user_login = req.body;

    console.log(jwt_exp);

    const user = await User.findOne(
      { username: user_login.username },
      function (err, user) {
        if (err) throw err;

        user.comparePassword(user_login.password, function (err, isMatch) {
          if (err) throw err;

          if (!isMatch) {
            resp.status(401).send();
            return;
          }
        });

        return user._id;
      }
    );

    const payload = {
      id: user,
      username: user_login.userame,
    };

    const token = jwt.sign(payload, jwt_key, { expiresIn: jwt_exp });

    resp.status(200).json({ token: token, username: user_login.username });
  } catch (error) {
    console.log(`error is ${error}`);
    resp.status(500).send(error);
  }
});

router.route("/articles").get(async (req, resp) => {
  try {
    const articles = await Article.find({});

    resp.status(200).json(articles);
  } catch (error) {
    console.log(`error is ${error}`);
    resp.status(500).send(error);
  }
});

module.exports = router;
