const express = require("express");
const mongoose = require("mongoose");
const RouterAccount = require("./routers/Account.js");
const RouterTicket = require("./routers/RouterTicket.js");
const RouterDH = require("./routers/RouterDH.js");
const RouterFlight = require("./routers/RouterFlight.js");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(RouterAccount);
app.use(RouterTicket);
app.use(RouterDH);
app.use(RouterFlight);

const start = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connect db Account success");
  } catch (err) {
    console.log(err);
  }
};

app.listen(process.env.PORT, () => {
  console.log("Listening port 4001");
});
start();
