const mongoose = require("mongoose");

const trnsSchema = mongoose.Schema({
  _id: mongoose.ObjectId,
  food_item: { type: mongoose.ObjectId, ref: "Food", required: true },
  value: { type: Number, default: 1 },
  cost: { type: Number },
  date: { type: Date },
});

module.exports = mongoose.model("Trns", trnsSchema);
