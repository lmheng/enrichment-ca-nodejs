const express = require("express");
const Article = require("../models/articlesModel");

router = express.Router();

router.route("/post-article").post(async (req, resp) => {
  try {
    const user = resp.locals.decoded;
    const article = req.body;

    const a = new Article({
      title: article.title,
      comment: article.comment,
      image: article.image,
      date: article.date,
      user: user.id,
    });

    await a.save();

    resp.status(200).send();
  } catch (error) {
    console.log(`error is ${error}`);
    resp.status(500).send(error);
  }
});

module.exports = router;
