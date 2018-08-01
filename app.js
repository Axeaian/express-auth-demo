require("dotenv").config();

const express = require("express");
const { passport } = require("./config/passport");
const morgan = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes/indexRouter");
const secretsRouter = require("./routes/secretsRouter");
const { handle404, handle500 } = require("./middlewares/error_handlers");

var corsOptions = {
  origin: [/http:\/\/localhost:.*/, /http[s]*:\/\/.*\.herokuapp.com/],
  credentials: true
};

const app = express();
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());

app.use("/", indexRouter);
app.use(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  secretsRouter
);

app.use(handle404);
app.use(handle500);

module.exports = app;
