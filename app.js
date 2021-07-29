const express = require("express");
const app = express();
const errors = require("restify-errors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const mongoose = require("mongoose");

//Routes Definition
const userRoutes = require("./routes/user");

//logger
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS Handling

app.use(cors());
//CORS end

//routes
app.use("/users", userRoutes);

//routes  end

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

//MongoDB Connection Ends

//Errors
app.use((req, res, next) => {
  const error = new Error("Not found");
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

module.exports = app;
