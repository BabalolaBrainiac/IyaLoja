const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
  _id: mongoose.ObjectId,
  name: { type: String, required: true },
});

module.exports = mongoose.model("Token", tokenSchema);
