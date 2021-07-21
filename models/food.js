import mongoose from "mongoose";
const { Schema } = mongoose;

const foodSchema = new mongoose({
  _id: mongoose.Types.ObjectId,
  quantity: { type: String, required: true },
  price: { type: String, required: true },
  token: { type: String, ref: "Token", required: true },
  totalSupply: { type: Number, default: 500 },
});

module.exports = mongoose.model("Food", foodSchema);
