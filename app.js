const express = require("express");
const app = new express();

app.use((req, res, next) => {
  res.status(200).json({
    message: "Testing works",
  });
});

module.exports = app;
