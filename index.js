const app = require("./helpers/app");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const auth = require("./middlewares/auth");
const open = require("./routes/open");
const authenticated = require("./routes/authenticated");

app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use(express.json({ limit: "500mb", type: "application/json" }));
app.use(
  cors({
    origin: ["http://localhost:4200"],
  })
);

require("./helpers/db");

app.use("/", open);
app.use("/authenticated/", auth, authenticated);

const PORT = process.env.PORT;

app.on("ready", () => {
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}.`);
  });
});
