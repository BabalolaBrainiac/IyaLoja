const mongoose = require("mongoose");
const { Schema } = mongoose;

const tokenSchema = new mongoose({
  _id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
});

module.exports = mongoose.model("Token", tokenSchema);
