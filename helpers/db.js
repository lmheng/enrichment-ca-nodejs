const app = require("./app");
const mongoose = require("mongoose");

const password = process.env.PASSWORD;
const cluster = process.env.CLUSTER;
const database = process.env.DATABASE;

const conn_str = `mongodb+srv://sa51:${password}@${cluster}.uhmpu.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose.connect(conn_str, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

db.on("error", () => {
  console.error.bind(console, "Connection Error");
});

db.once("open", () => {
  console.log(mongoose.STATES[mongoose.connection.readyState]);
  console.log("Connection Successful!");
  app.emit("ready");
});
