const mongoose = require("mongoose");
const uuid = require("node-uuid");

const { Schema } = mongoose;

const articleSchema = new Schema({
  _id: { type: String, default: (genUUID = () => uuid.v1()) },
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
