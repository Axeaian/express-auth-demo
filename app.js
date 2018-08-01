require("dotenv").config();

const express = require("express");
const { passport } = require("./config/passport");
const { authenticateUser } = require("./middlewares/auth");
const morgan = require("morgan");
const indexRouter = require("./routes/indexRouter");
const secretsRouter = require("./routes/secretsRouter");
const { handle404, handle500 } = require("./middlewares/error_handlers");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());

app.use("/", indexRouter);
  "/secret",

app.use(handle404);
app.use(handle500);

module.exports = app;
