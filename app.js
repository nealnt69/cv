require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const connectDB = require("./db/connection");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const dashboardRouter = require("./routes/dashboard");

const cvRouter = require("./api/cv");
const themeRouter = require("./api/theme");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [process.env.URL_MAIN_KNV],
  })
);

connectDB();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dashboard", dashboardRouter);

app.use("/api/cv", cvRouter);
app.use("/api/theme", themeRouter);

module.exports = app;
