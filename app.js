const express = require("express");
const app = express();
const errors = require("restify-errors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const passportSetup = require("./auth");
const config = require("./config");
const mongoose = require("mongoose");

//Routes Definition
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/g-auth");
const foodRoutes = require("./routes/food");
//logger
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS Handling

app.use(cors());

//routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/fooditem", foodRoutes);

//MongoDB Connection
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
});

//Default

const database = mongoose.connection;

//Logging Database Connection Errors to the Console
database.on("error", console.error.bind(console, "Database Connection Error"));

//Errors
app.use((req, res, next) => {
  const error = new Error("Resource Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

//Google Auth Connection
module.exports = app;
