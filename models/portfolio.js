const mongoose = require("mongoose");

const portfolioSchema = mongoose.Schema({
  details: { type: [], ref: "Food", required: true },
});

module.exports = mongoose.model("Porfolio", portfolioSchema);
