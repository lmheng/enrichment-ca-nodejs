const mongoose = require("mongoose");

const { Schema } = mongoose;

const articleSchema = new Schema({
  title: { type: String },
  comment: { type: String },
  image: {
    data: Buffer,
    contentType: String,
  },
  date: { type: Date },
  user: { type: String },
});

let articlesModel = mongoose.model("Article", articleSchema, "articles");

module.exports = articlesModel;
